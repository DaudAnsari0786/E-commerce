import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
  FaTag,
  FaCheckCircle,
} from 'react-icons/fa';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: 40, height: 0, marginBottom: 0, transition: { duration: 0.3 } },
};

/* ---------- Demo cart data (replace with your state/store) ---------- */
const initialCart = [
  {
    id: 1,
    name: 'Classic Denim Jacket',
    category: 'Men',
    slug: 'mens',
    price: 2499,
    oldPrice: 3499,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&q=80',
    size: 'M',
    color: 'Indigo',
    qty: 1,
    stock: 12,
  },
  {
    id: 2,
    name: 'Floral Summer Dress',
    category: 'Women',
    slug: 'womens',
    price: 1799,
    oldPrice: 2299,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80',
    size: 'S',
    color: 'Rose',
    qty: 2,
    stock: 5,
  },
  {
    id: 3,
    name: 'Kids Cotton T-Shirt',
    category: 'Kids',
    slug: 'kids',
    price: 599,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80',
    size: '4Y',
    color: 'White',
    qty: 3,
    stock: 20,
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialCart);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  /* ---------- Derived values ---------- */
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const savings = items.reduce(
    (sum, i) => sum + (i.oldPrice ? (i.oldPrice - i.price) * i.qty : 0),
    0
  );

  const COUPONS = { SAVE10: 10, WELCOME15: 15, FLAT200: 'flat200' };
  const discount = appliedCoupon
    ? appliedCoupon === 'FLAT200'
      ? 200
      : Math.round((subtotal * COUPONS[appliedCoupon]) / 100)
    : 0;

  const shipping = subtotal - discount >= 1500 ? 0 : 99;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + shipping + tax;

  /* ---------- Handlers ---------- */
  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, qty: Math.max(1, Math.min(i.stock, i.qty + delta)) }
          : i
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code] !== undefined) {
      setAppliedCoupon(code);
      setCouponError('');
      setCoupon('');
      console.log('✅ Coupon applied:', code);
    } else {
      setAppliedCoupon(null);
      setCouponError('Invalid coupon code');
      console.log('❌ Invalid coupon:', code);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const handleCheckout = () => {
    console.log('🛒 Checkout initiated:');
    console.log('  Items:', items);
    console.log('  Subtotal:', subtotal);
    console.log('  Discount:', discount);
    console.log('  Shipping:', shipping);
    console.log('  Tax:', tax);
    console.log('  Total:', total);
    navigate('/checkout');
  };

  /* ---------- Empty state ---------- */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-md w-full text-center"
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-rose-100 flex items-center justify-center shadow-md"
          >
            <FaShoppingBag className="w-10 h-10 text-indigo-600" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Your cart is empty
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm text-gray-500 mb-6">
            Looks like you haven't added anything yet. Start shopping to fill it up!
          </motion.p>

          <motion.div variants={fadeInUp} whileTap={{ scale: 0.96 }}>
            <Link
              to="/products"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-rose-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 ease-in shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-purple-500/40 overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <span className="relative">Start Shopping</span>
              <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ---------- Main cart ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-300 ease-in mb-3"
            >
              <FaArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Continue shopping
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3"
          >
            <FaShoppingBag className="w-6 h-6 text-indigo-600" />
            Shopping Cart
            <span className="text-sm font-medium text-gray-500">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ---------- Left: Cart items ---------- */}
          <div className="lg:col-span-8">
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-4"
            >
              <AnimatePresence>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 ease-in overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Image → product category page */}
                      <Link
                        to={`/products/${item.slug}`}
                        className="shrink-0 w-full sm:w-28 h-40 sm:h-28 rounded-xl overflow-hidden bg-gray-100"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link
                              to={`/products/${item.slug}`}
                              className="block text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300 ease-in truncate"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.category} · Size {item.size} · {item.color}
                            </p>
                          </div>

                          {/* Remove */}
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3, ease: 'easeIn' }}
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="shrink-0 w-8 h-8 rounded-full bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-500 flex items-center justify-center transition-colors duration-300 ease-in cursor-pointer"
                          >
                            <FaTrashAlt className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>

                        {/* Price + qty row */}
                        <div className="mt-3 sm:mt-auto flex flex-wrap items-center justify-between gap-3">
                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                            {item.oldPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{item.oldPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>

                          {/* Qty stepper */}
                          <div className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQty(item.id, -1)}
                              disabled={item.qty <= 1}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 ease-in cursor-pointer"
                            >
                              <FaMinus className="w-3 h-3" />
                            </motion.button>
                            <span className="w-10 text-center text-sm font-semibold text-gray-900">
                              {item.qty}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQty(item.id, 1)}
                              disabled={item.qty >= item.stock}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 ease-in cursor-pointer"
                            >
                              <FaPlus className="w-3 h-3" />
                            </motion.button>
                          </div>

                          {/* Line total */}
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">
                              ₹{(item.price * item.qty).toLocaleString('en-IN')}
                            </p>
                            {item.qty >= item.stock && (
                              <p className="text-[11px] text-amber-600 mt-0.5">
                                Max stock reached
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>

            {/* Trust badges row — each clickable */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {[
                { icon: FaTruck, label: 'Free shipping over ₹1500', to: '/shipping' },
                { icon: FaUndoAlt, label: '30-day easy returns', to: '/returns' },
                { icon: FaShieldAlt, label: 'Secure checkout', to: '/privacy' },
              ].map(({ icon: Icon, label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="group flex items-center gap-2.5 rounded-xl bg-white border border-gray-100 px-4 py-3 text-xs font-medium text-gray-600 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-sm transition-all duration-300 ease-in cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-indigo-600 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  {label}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* ---------- Right: Order summary ---------- */}
          <div className="lg:col-span-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="lg:sticky lg:top-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="mb-5">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2.5">
                    <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                      <FaCheckCircle className="w-4 h-4" />
                      {appliedCoupon} applied
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-green-700 hover:text-green-900 underline underline-offset-2 cursor-pointer transition-colors duration-300 ease-in"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={applyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <FaTag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          if (couponError) setCouponError('');
                        }}
                        placeholder="Coupon code"
                        className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 uppercase transition-all duration-300 ease-in focus:outline-none focus:ring-2 ${
                          couponError
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                        }`}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.3, ease: 'easeIn' }}
                      type="submit"
                      className="rounded-lg bg-gray-900 hover:bg-indigo-700 text-white px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ease-in cursor-pointer"
                    >
                      Apply
                    </motion.button>
                  </form>
                )}
                {couponError && (
                  <p className="mt-1.5 text-[11px] font-medium text-red-500">
                    {couponError}
                  </p>
                )}
                {!appliedCoupon && !couponError && (
                  <p className="mt-1.5 text-[11px] text-gray-400">
                    Try <span className="font-semibold text-gray-500">SAVE10</span>,{' '}
                    <span className="font-semibold text-gray-500">WELCOME15</span>, or{' '}
                    <span className="font-semibold text-gray-500">FLAT200</span>
                  </p>
                )}
              </div>

              {/* Totals */}
              <dl className="space-y-2.5 text-sm border-t border-gray-100 pt-5">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-gray-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </dd>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <dt>You save</dt>
                    <dd className="font-medium">
                      −₹{savings.toLocaleString('en-IN')}
                    </dd>
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <dt>Coupon discount</dt>
                    <dd className="font-medium">
                      −₹{discount.toLocaleString('en-IN')}
                    </dd>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <dt>Shipping</dt>
                  <dd className="font-medium text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </dd>
                </div>

                <div className="flex justify-between text-gray-600">
                  <dt>Tax (5%)</dt>
                  <dd className="font-medium text-gray-900">
                    ₹{tax.toLocaleString('en-IN')}
                  </dd>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-3 mt-3">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{total.toLocaleString('en-IN')}
                  </dd>
                </div>
              </dl>

              {/* Free shipping progress */}
              {shipping > 0 && (
                <div className="mt-4 rounded-lg bg-indigo-50 px-3 py-2.5 text-xs text-indigo-700">
                  Add{' '}
                  <span className="font-bold">
                    ₹{(1500 - (subtotal - discount)).toLocaleString('en-IN')}
                  </span>{' '}
                  more for free shipping
                </div>
              )}

              {/* Checkout */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeIn' }}
                onClick={handleCheckout}
                className="group/btn relative mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-rose-500 transition-all duration-500 ease-in shadow-md hover:shadow-lg hover:shadow-indigo-500/40 cursor-pointer overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">Proceed to Checkout</span>
                <FaArrowRight className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </motion.button>

              {/* Secure note */}
              <p className="mt-3 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                <FaShieldAlt className="w-3 h-3" />
                Secure 256-bit SSL encrypted checkout
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;