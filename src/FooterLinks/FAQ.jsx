import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaInfoCircle,
  FaEnvelope,
  FaWhatsapp,
  FaHeadset,
  FaShoppingBag,
  FaTruck,
  FaUndoAlt,
  FaUser,
  FaCreditCard,
  FaStar,
  FaArrowRight,
} from 'react-icons/fa';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

/* ---------- FAQ categories ---------- */
const categories = [
  { key: 'all', label: 'All', icon: FaStar },
  { key: 'orders', label: 'Orders', icon: FaShoppingBag },
  { key: 'shipping', label: 'Shipping', icon: FaTruck },
  { key: 'returns', label: 'Returns', icon: FaUndoAlt },
  { key: 'account', label: 'Account', icon: FaUser },
  { key: 'payment', label: 'Payment', icon: FaCreditCard },
];

/* ---------- FAQ data ---------- */
const faqs = [
  // Orders
  {
    category: 'orders',
    q: 'How do I place an order?',
    a: 'Browse our products, add items to your cart, and click Proceed to Checkout. You can pay with any major card, UPI, or choose Cash on Delivery.',
  },
  {
    category: 'orders',
    q: 'Can I modify or cancel my order after placing it?',
    a: 'Yes — you can modify or cancel an order within 30 minutes of placing it, before it enters the shipping stage. Visit My Orders to make changes.',
  },
  {
    category: 'orders',
    q: 'How can I track my order?',
    a: 'Go to My Orders in your account and click on any order to see its live status. You can also use the Track Order page with your order ID.',
  },

  // Shipping
  {
    category: 'shipping',
    q: 'How long does shipping take?',
    a: 'Standard delivery is 3–5 business days across India. Express delivery is available for select pincodes and arrives in 1–2 days.',
  },
  {
    category: 'shipping',
    q: 'Do you offer free shipping?',
    a: 'Yes! All orders above ₹1500 ship free anywhere in India. For orders below that, a flat ₹99 shipping fee applies.',
  },
  {
    category: 'shipping',
    q: 'Do you ship internationally?',
    a: 'Not yet — currently we only ship within India. Global shipping is on our roadmap for next year.',
  },
  {
    category: 'shipping',
    q: 'What if my order is delayed?',
    a: 'Occasional delays can happen due to weather or logistics. You can see the latest status in My Orders. If it\'s more than 3 days late, contact us and we\'ll make it right.',
  },

  // Returns
  {
    category: 'returns',
    q: 'What is your return policy?',
    a: 'We offer a 30-day hassle-free return policy on all unworn items with original tags attached. Returns are free — we\'ll send you a prepaid label.',
  },
  {
    category: 'returns',
    q: 'How do I return an item?',
    a: 'Go to My Orders, select the item, and click Request Return. Choose a reason and we\'ll schedule a free pickup within 48 hours.',
  },
  {
    category: 'returns',
    q: 'When will I get my refund?',
    a: 'Refunds are processed within 3–5 business days after we receive the returned item. UPI and card refunds usually appear within 24 hours of processing.',
  },
  {
    category: 'returns',
    q: 'Can I exchange instead of returning?',
    a: 'Absolutely. During the return flow, choose Exchange instead of Refund, pick a new size or color, and we\'ll ship it once the original is picked up.',
  },

  // Account
  {
    category: 'account',
    q: 'How do I create an account?',
    a: 'Click Account in the navigation bar and select Sign up. Enter your name, email, and password — you\'ll be signed in immediately.',
  },
  {
    category: 'account',
    q: 'How do I reset my password?',
    a: 'Go to your Profile page and click Edit Profile. In the edit form you can set a new password — leave it blank to keep your current one.',
  },
  {
    category: 'account',
    q: 'How do I update my personal details?',
    a: 'Navigate to Edit Profile from the Account dropdown. You can update your name, username, email, phone, and address there.',
  },
  {
    category: 'account',
    q: 'Is my personal data safe?',
    a: 'Yes. All data is encrypted in transit and at rest. We never sell your information to third parties. See our Privacy Policy for details.',
  },

  // Payment
  {
    category: 'payment',
    q: 'What payment methods do you accept?',
    a: 'We accept Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, UPI, and Cash on Delivery for orders under ₹5000.',
  },
  {
    category: 'payment',
    q: 'Is it safe to pay with a card?',
    a: 'Absolutely. All payments are processed through 256-bit SSL encryption and PCI-DSS compliant gateways. We never store your full card details.',
  },
  {
    category: 'payment',
    q: 'Do you offer EMI options?',
    a: 'Yes, on select credit cards for orders above ₹3000. EMI options appear automatically at checkout if your card is eligible.',
  },
  {
    category: 'payment',
    q: 'Can I use multiple payment methods for one order?',
    a: 'Currently no — one payment method per order. For split payments, please place two separate orders.',
  },
];

/* ============================== Component ============================== */
const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(0);

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? faqs : faqs.filter((f) => f.category === activeCategory);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const counts = useMemo(() => {
    const out = { all: faqs.length };
    categories.forEach(({ key }) => {
      if (key !== 'all') out[key] = faqs.filter((f) => f.category === key).length;
    });
    return out;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40">
      {/* ---------- Hero header ---------- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              <FaInfoCircle className="w-3 h-3" />
              Help center
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Frequently asked questions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed"
          >
            Find quick answers to the most common questions about orders,
            shipping, returns, and your account.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-7 max-w-xl mx-auto"
          >
            <div className="relative group">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-indigo-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions…"
                className="w-full rounded-2xl border border-transparent bg-white/95 backdrop-blur py-3.5 pl-11 pr-11 text-sm text-gray-900 placeholder-gray-400 shadow-lg shadow-indigo-900/10 transition-all duration-200 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <svg
            className="block w-full h-8 sm:h-12 text-slate-50"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,32 C240,60 480,0 720,20 C960,40 1200,60 1440,32 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      {/* ---------- Main content ---------- */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-4 sm:-mt-6">
        {/* Category tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-6 -mx-1 overflow-x-auto pb-1"
        >
          <div className="flex gap-2 min-w-max px-1">
            {categories.map(({ key, label, icon: Icon }) => {
              const active = activeCategory === key;
              return (
                <motion.button
                  key={key}
                  variants={fadeInUp}
                  type="button"
                  onClick={() => {
                    setActiveCategory(key);
                    setOpenId(0);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                  <span
                    className={`inline-flex items-center justify-center min-w-[18px] h-4 px-1 rounded-full text-[10px] font-bold ${
                      active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {counts[key] ?? 0}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Results count */}
        <p className="mb-4 text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'question' : 'questions'}
          {search && (
            <>
              {' '}
              for "<span className="font-semibold text-gray-700">{search}</span>"
            </>
          )}
        </p>

        {/* FAQ list */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FaSearch className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              No questions matched
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Try a different search term or pick another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer"
            >
              Reset filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-3"
          >
            {filtered.map((faq, i) => {
              const isOpen = openId === i;
              return (
                <motion.div
                  key={faq.q}
                  variants={fadeInUp}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-indigo-300 shadow-lg shadow-indigo-500/10'
                      : 'border-gray-100 shadow-sm hover:border-indigo-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        isOpen ? 'text-indigo-700' : 'text-gray-900'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                        isOpen ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <FaChevronDown className="w-2.5 h-2.5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ---------- Still need help? ---------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-12"
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 p-8 sm:p-10 text-center text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center">
                <FaHeadset className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Still need help?
              </h2>
              <p className="text-sm sm:text-base text-white/85 max-w-lg mx-auto mb-6">
                Can't find the answer you're looking for? Our team is here to help
                — reach out and we'll reply within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white text-indigo-700 px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <FaEnvelope className="w-3.5 h-3.5" />
                  Contact us
                  <FaArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="https://wa.me/919026350956"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/25 px-5 py-3 text-sm font-semibold hover:bg-white/25 transition-all duration-200"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  WhatsApp us
                </a>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default FAQ;