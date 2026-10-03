import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
  FaCheckCircle,
  FaCreditCard,
  FaMoneyBillWave,
  FaMobileAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCity,
  FaBoxOpen,
  FaSpinner,
  FaLock,
  FaEdit,
} from 'react-icons/fa';

import { useCartAutoReload } from '../../hooks/useCartAutoReload';
import { clearCart } from '../../utils/cartStore';
import { addOrder } from '../../utils/orderStore';
import { useUser } from '../../context/UserContext';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

/* ---------- Helpers ---------- */
const inr = (n) =>
  `₹${Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

/** Reads the shipping address saved by Address.jsx */
const readSavedShipping = () => {
  try {
    return JSON.parse(localStorage.getItem('stylecraft:shipping') || 'null');
  } catch {
    return null;
  }
};

const PAYMENT_METHODS = [
  { id: 'cod',  label: 'Cash on Delivery',      icon: FaMoneyBillWave, hint: 'Pay when it arrives' },
  { id: 'card', label: 'Credit / Debit Card',   icon: FaCreditCard,     hint: 'Visa, Mastercard, RuPay' },
  { id: 'upi',  label: 'UPI',                   icon: FaMobileAlt,      hint: 'GPay, PhonePe, Paytm' },
];

/* ================================================================
   OrderNow / Checkout
   ================================================================ */
const OrderNow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: cartItems } = useCartAutoReload();
  const { user } = useUser();

  /* ---------- Resolve order items: Buy Now OR full cart ---------- */
  const orderItems = useMemo(() => {
    const buyNow = location.state?.buyNowProduct;
    if (buyNow) {
      return [{ ...buyNow, qty: buyNow.qty ?? buyNow.quantity ?? 1 }];
    }
    return cartItems.map((i) => ({ ...i, qty: i.qty ?? 1 }));
  }, [location.state, cartItems]);

  const isBuyNow = Boolean(location.state?.buyNowProduct);

  /* ---------- Prefill form from saved shipping + user ---------- */
  const [form, setForm] = useState(() => {
    const saved = readSavedShipping();
    return {
      name: saved?.name || '',
      email: user?.email || '',
      phone: saved?.phone || '',
      address: saved?.line1 || '',
      city: saved?.city || '',
      pincode: saved?.pincode || '',
      notes: '',
      card: '',
      upi: '',
    };
  });

  /* ✅ Live sync: re-read shipping address whenever we return from /addresses */
  useEffect(() => {
    const saved = readSavedShipping();
    if (!saved) return;
    setForm((f) => ({
      ...f,
      name: f.name || saved.name || '',
      phone: f.phone || saved.phone || '',
      address: saved.line1 || f.address || '',
      city: saved.city || f.city || '',
      pincode: saved.pincode || f.pincode || '',
    }));
  }, [location.key]);

  /* ✅ Merge user info only for fields still empty */
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      name: f.name || user.name || '',
      email: f.email || user.email || '',
      phone: f.phone || user.phone || '',
    }));
  }, [user]);

  /* ✅ If NO shipping address saved → redirect to /addresses?next=checkout */
  useEffect(() => {
    if (!user) return;
    if (orderItems.length === 0) return;
    const saved = readSavedShipping();
    if (saved) return;

    const t = setTimeout(() => {
      navigate('/addresses?next=checkout', { replace: true });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, orderItems.length]);

  const [payment, setPayment] = useState('cod');
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(null);

  /* ---------- Totals ---------- */
  const { subtotal, savings } = useMemo(() => {
    let sub = 0;
    let sav = 0;
    for (const i of orderItems) {
      sub += Number(i.price || 0) * i.qty;
      if (i.oldPrice) sav += (Number(i.oldPrice) - Number(i.price)) * i.qty;
    }
    return { subtotal: sub, savings: sav };
  }, [orderItems]);

  const shipping = subtotal >= 1500 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  /* ---------- Validation ---------- */
  const validate = useCallback(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, '')))
      e.phone = '10-digit phone required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = '6-digit PIN required';
    if (payment === 'card' && !/^\d{12,19}$/.test(form.card.replace(/\s/g, ''))) {
      e.card = 'Valid card number required';
    }
    if (payment === 'upi' && !/^[\w.\-]{2,}@[\w]{2,}$/.test(form.upi)) {
      e.upi = 'Valid UPI ID required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form, payment]);

  /* ---------- Handlers ---------- */
  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  /* ✅ Place the order — saves to store so Orders.jsx auto-reloads */
  const handlePlaceOrder = async (ev) => {
    ev.preventDefault();
    if (!orderItems.length) return;
    if (!validate()) {
      document
        .querySelector('[data-error="true"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setPlacing(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));

      const saved = addOrder({
        items: orderItems.map((i) => ({
          id: i.id,
          name: i.name,
          qty: i.qty,
          price: i.price,
          category: i.category,
          image: i.image,
          size: i.size,
          color: i.color,
        })),
        total,
        address: `${form.address}, ${form.city} — ${form.pincode}`,
        payment:
          payment === 'cod'
            ? 'Cash on delivery'
            : payment === 'upi'
            ? `UPI • ${form.upi}`
            : `Card • ****${form.card.replace(/\s/g, '').slice(-4)}`,
        userEmail: user?.email || form.email || 'guest',
        userName: user?.name || form.name,
        notes: form.notes,
      });

      if (!isBuyNow) clearCart();

      // ✅ Optional: force re-selection next time.
      //    Remove this line if you want the address to stay sticky.
      localStorage.removeItem('stylecraft:shipping');

      setPlaced({
        orderId: saved.id,
        total: saved.total,
        eta: new Date(
          Date.now() + 4 * 24 * 60 * 60 * 1000
        ).toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }),
      });
    } catch (err) {
      console.error('Order failed:', err);
    } finally {
      setPlacing(false);
    }
  };

  /* ----------------------------------------------------------------
     Empty state
  ---------------------------------------------------------------- */
  if (!orderItems.length && !placed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-md w-full text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-rose-100 flex items-center justify-center shadow-md">
            <FaBoxOpen className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Nothing to checkout</h2>
          <p className="text-sm text-gray-500 mb-6">
            Add a product to your cart or use Buy Now to place an order.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            Browse products
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ----------------------------------------------------------------
     Success screen
  ---------------------------------------------------------------- */
  if (placed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-lg w-full bg-white rounded-3xl border border-gray-100 shadow-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
            className="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center"
          >
            <FaCheckCircle className="w-11 h-11 text-emerald-600" />
          </motion.div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-sm text-gray-500 mb-6">
            Thank you, {form.name.split(' ')[0] || 'friend'}. We've emailed your receipt to{' '}
            <span className="font-medium text-gray-700">{form.email}</span>.
          </p>

          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-left space-y-2 text-sm mb-6">
            <Row label="Order ID" value={placed.orderId} mono />
            <Row label="Total paid" value={inr(placed.total)} highlight />
            <Row
              label="Payment"
              value={PAYMENT_METHODS.find((p) => p.id === payment)?.label}
            />
            <Row label="Estimated delivery" value={placed.eta} />
            <Row
              label="Shipping to"
              value={`${form.address}, ${form.city} - ${form.pincode}`}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/orders"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              View my orders
            </Link>
            <Link
              to="/products"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 py-3 text-sm font-semibold transition-all"
            >
              Continue shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ----------------------------------------------------------------
     Main checkout layout
  ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-8">
          <motion.div variants={fadeInUp}>
            <Link
              to={isBuyNow ? -1 : '/cart'}
              className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-3"
            >
              <FaArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              {isBuyNow ? 'Back' : 'Back to cart'}
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3"
          >
            <FaLock className="w-6 h-6 text-indigo-600" />
            Secure Checkout
            {isBuyNow && (
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                Buy Now
              </span>
            )}
          </motion.h1>
        </motion.div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {/* ---------- LEFT: Form ---------- */}
          <div className="lg:col-span-7 space-y-6">
            {/* Shipping */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
            >
              {/* ✅ Header with Change button */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-base font-bold text-gray-900">
                    Shipping Information
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/addresses?next=checkout')}
                  className="group inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 hover:border-indigo-400 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer"
                >
                  <FaEdit className="w-2.5 h-2.5 transition-transform group-hover:rotate-12" />
                  Change
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Full name"
                  icon={FaUser}
                  value={form.name}
                  onChange={handleChange('name')}
                  error={errors.name}
                  placeholder="Aarav Sharma"
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  icon={FaEnvelope}
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                <Field
                  label="Phone"
                  icon={FaPhone}
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  error={errors.phone}
                  placeholder="9876543210"
                  autoComplete="tel"
                />
                <Field
                  label="PIN code"
                  icon={FaMapMarkerAlt}
                  value={form.pincode}
                  onChange={handleChange('pincode')}
                  error={errors.pincode}
                  placeholder="560001"
                  autoComplete="postal-code"
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Address"
                    icon={FaMapMarkerAlt}
                    value={form.address}
                    onChange={handleChange('address')}
                    error={errors.address}
                    placeholder="Flat / House no., Street, Landmark"
                    autoComplete="street-address"
                  />
                </div>
                <Field
                  label="City"
                  icon={FaCity}
                  value={form.city}
                  onChange={handleChange('city')}
                  error={errors.city}
                  placeholder="Bengaluru"
                  autoComplete="address-level2"
                />
                <Field
                  label="Delivery notes (optional)"
                  value={form.notes}
                  onChange={handleChange('notes')}
                  placeholder="Leave at door, call on arrival…"
                />
              </div>
            </motion.section>

            {/* Payment */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <FaCreditCard className="w-4 h-4 text-indigo-600" />
                <h2 className="text-base font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PAYMENT_METHODS.map(({ id, label, icon: Icon, hint }) => {
                  const active = payment === id;
                  return (
                    <button
                      type="button"
                      key={id}
                      onClick={() => setPayment(id)}
                      aria-pressed={active}
                      className={`text-left rounded-xl border-2 p-3.5 transition-all cursor-pointer ${
                        active
                          ? 'border-indigo-600 bg-indigo-50/60 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon
                          className={`w-4 h-4 ${
                            active ? 'text-indigo-600' : 'text-gray-500'
                          }`}
                        />
                        <span
                          className={`text-sm font-semibold ${
                            active ? 'text-indigo-700' : 'text-gray-800'
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-snug">{hint}</p>
                    </button>
                  );
                })}
              </div>

              {payment === 'card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-hidden"
                >
                  <Field
                    label="Card number"
                    value={form.card}
                    onChange={handleChange('card')}
                    error={errors.card}
                    placeholder="4242 4242 4242 4242"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="MM / YY" placeholder="12 / 28" />
                    <Field label="CVV" placeholder="123" />
                  </div>
                </motion.div>
              )}

              {payment === 'upi' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 overflow-hidden"
                >
                  <Field
                    label="UPI ID"
                    value={form.upi}
                    onChange={handleChange('upi')}
                    error={errors.upi}
                    placeholder="yourname@upi"
                  />
                </motion.div>
              )}
            </motion.section>
          </div>

          {/* ---------- RIGHT: Order Summary ---------- */}
          <div className="lg:col-span-5">
            <motion.aside
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:sticky lg:top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <ul className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-5">
                {orderItems.map((item, idx) => (
                  <li
                    key={`${item.id}-${item.size || ''}-${item.color || ''}-${idx}`}
                    className="flex gap-3"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <FaBoxOpen className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                        {item.size && `Size ${item.size}`}
                        {item.size && item.color && ' · '}
                        {item.color}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Qty {item.qty} × {inr(item.price)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 shrink-0">
                      {inr(Number(item.price) * item.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-2.5 text-sm border-t border-gray-100 pt-4">
                <Row label="Subtotal" value={inr(subtotal)} />
                {savings > 0 && (
                  <Row label="You save" value={`−${inr(savings)}`} highlight />
                )}
                <Row
                  label="Shipping"
                  value={shipping === 0 ? 'Free' : inr(shipping)}
                  highlight={shipping === 0}
                />
                <Row label="Tax (5%)" value={inr(tax)} />
                <div className="flex justify-between border-t border-gray-100 pt-3 mt-3">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {inr(total)}
                  </dd>
                </div>
              </dl>

              <motion.button
                type="submit"
                disabled={placing}
                whileHover={!placing ? { scale: 1.02 } : {}}
                whileTap={!placing ? { scale: 0.98 } : {}}
                className={`group/btn relative mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all duration-500 overflow-hidden ${
                  placing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-rose-500 shadow-md hover:shadow-lg hover:shadow-indigo-500/40 cursor-pointer'
                }`}
              >
                {!placing && (
                  <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                )}
                <span className="relative inline-flex items-center gap-2">
                  {placing ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      Placing your order…
                    </>
                  ) : (
                    <>
                      <FaLock className="w-3.5 h-3.5" />
                      Place Order · {inr(total)}
                    </>
                  )}
                </span>
              </motion.button>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { icon: FaTruck, label: 'Fast delivery' },
                  { icon: FaShieldAlt, label: 'Secure' },
                  { icon: FaCheckCircle, label: 'Easy returns' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 rounded-lg border border-gray-100 bg-gray-50/60 px-2 py-2 text-[10px] font-medium text-gray-600"
                  >
                    <Icon className="w-3.5 h-3.5 text-indigo-600" />
                    {label}
                  </div>
                ))}
              </div>

              <p className="mt-3 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <FaLock className="w-3 h-3" />
                256-bit SSL encrypted · Your data is safe
              </p>
            </motion.aside>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------- Small helpers ---------- */
const Row = ({ label, value, highlight, mono }) => (
  <div className="flex justify-between gap-3">
    <dt className="text-gray-500">{label}</dt>
    <dd
      className={`font-medium text-right ${
        highlight ? 'text-emerald-600' : 'text-gray-900'
      } ${mono ? 'font-mono text-xs tracking-wide' : ''}`}
    >
      {value}
    </dd>
  </div>
);

const Field = ({ label, icon: Icon, error, ...rest }) => (
  <label data-error={error ? 'true' : 'false'} className="block">
    <span className="block text-xs font-semibold text-gray-700 mb-1.5">
      {label}
    </span>
    <span className="relative block">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
      )}
      <input
        {...rest}
        className={`w-full rounded-lg border bg-white py-2.5 ${
          Icon ? 'pl-9' : 'pl-3'
        } pr-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
        }`}
      />
    </span>
    <AnimatePresence>
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="block mt-1 text-[11px] font-medium text-rose-500"
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
  </label>
);

export default OrderNow;