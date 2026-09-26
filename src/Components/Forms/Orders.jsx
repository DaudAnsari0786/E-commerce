import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaSearch,
  FaChevronDown,
  FaChevronRight,
  FaMapMarkerAlt,
  FaCreditCard,
  FaDownload,
  FaRedo,
  FaStar,
  FaUser,
  FaHeart,
  FaGlobe,
  FaSignOutAlt,
  FaInfoCircle,
  FaShoppingBag,
} from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

/* ---------- Status meta ---------- */
const statusMeta = {
  Delivered: {
    label: 'Delivered',
    icon: FaCheckCircle,
    tile: 'bg-emerald-50 text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    dot: 'bg-emerald-500',
  },
  Shipped: {
    label: 'Shipped',
    icon: FaTruck,
    tile: 'bg-indigo-50 text-indigo-600',
    badge: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    dot: 'bg-indigo-500',
  },
  Processing: {
    label: 'Processing',
    icon: FaClock,
    tile: 'bg-amber-50 text-amber-600',
    badge: 'bg-amber-50 text-amber-700 ring-amber-200',
    dot: 'bg-amber-500',
  },
  Cancelled: {
    label: 'Cancelled',
    icon: FaTimes,
    tile: 'bg-rose-50 text-rose-600',
    badge: 'bg-rose-50 text-rose-700 ring-rose-200',
    dot: 'bg-rose-500',
  },
};

/* ---------- Demo orders ---------- */
const demoOrders = [
  {
    id: 'SC-2409-1042',
    date: 'Sep 18, 2026',
    deliveredOn: 'Sep 22, 2026',
    total: 4820,
    status: 'Delivered',
    items: [
      { name: 'Classic Denim Jacket', qty: 1, price: 2499, category: 'Men' },
      { name: 'Kids Cotton T-Shirt', qty: 3, price: 599, category: 'Kids' },
      { name: 'Floral Summer Dress', qty: 1, price: 1123, category: 'Women' },
    ],
    address: 'Vill. Rukmalpur Post Meerpur, Atrauliya — 223223',
    payment: 'UPI • ****4821',
  },
  {
    id: 'SC-2409-0987',
    date: 'Sep 05, 2026',
    deliveredOn: null,
    total: 1899,
    status: 'Shipped',
    items: [
      { name: 'Floral Summer Dress', qty: 1, price: 1899, category: 'Women' },
    ],
    address: '123 Fashion Ave, Sector 15, Noida — 201301',
    payment: 'Visa • ****6472',
  },
  {
    id: 'SC-2408-0751',
    date: 'Aug 22, 2026',
    deliveredOn: 'Aug 26, 2026',
    total: 3450,
    status: 'Delivered',
    items: [
      { name: 'Classic Denim Jacket', qty: 1, price: 2850, category: 'Men' },
      { name: 'Girls Party Frock', qty: 1, price: 600, category: 'Girls' },
    ],
    address: 'Vill. Rukmalpur Post Meerpur, Atrauliya — 223223',
    payment: 'Cash on delivery',
  },
  {
    id: 'SC-2408-0612',
    date: 'Aug 10, 2026',
    deliveredOn: null,
    total: 950,
    status: 'Processing',
    items: [
      { name: 'Kids Cotton T-Shirt', qty: 1, price: 599, category: 'Kids' },
      { name: 'Boys Cargo Shorts', qty: 1, price: 351, category: 'Kids' },
    ],
    address: '123 Fashion Ave, Sector 15, Noida — 201301',
    payment: 'UPI • ****4821',
  },
  {
    id: 'SC-2407-0321',
    date: 'Jul 28, 2026',
    deliveredOn: null,
    total: 1240,
    status: 'Cancelled',
    items: [
      { name: 'Girls Party Frock', qty: 2, price: 620, category: 'Girls' },
    ],
    address: 'Vill. Rukmalpur Post Meerpur, Atrauliya — 223223',
    payment: 'Refunded to source',
  },
];

/* ---------- Filter tabs ---------- */
const filterTabs = [
  { key: 'all', label: 'All orders' },
  { key: 'Processing', label: 'Processing' },
  { key: 'Shipped', label: 'Shipped' },
  { key: 'Delivered', label: 'Delivered' },
  { key: 'Cancelled', label: 'Cancelled' },
];

/* ============================== Component ============================== */
const Orders = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  if (!user) return null;

  /* ---------- Derived counts + filtered list ---------- */
  const counts = useMemo(() => {
    return {
      all: demoOrders.length,
      Processing: demoOrders.filter((o) => o.status === 'Processing').length,
      Shipped: demoOrders.filter((o) => o.status === 'Shipped').length,
      Delivered: demoOrders.filter((o) => o.status === 'Delivered').length,
      Cancelled: demoOrders.filter((o) => o.status === 'Cancelled').length,
    };
  }, []);

  const filteredOrders = useMemo(() => {
    const byStatus =
      activeFilter === 'all' ? demoOrders : demoOrders.filter((o) => o.status === activeFilter);

    const q = search.trim().toLowerCase();
    if (!q) return byStatus;

    return byStatus.filter((o) => {
      if (o.id.toLowerCase().includes(q)) return true;
      return o.items.some((it) => it.name.toLowerCase().includes(q));
    });
  }, [activeFilter, search]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showFeedback = (text) => {
    setFeedback(text);
    setTimeout(() => setFeedback(null), 2500);
  };

  const handleDownloadInvoice = (order) => {
    console.log('📄 Download invoice for:', order.id);
    showFeedback(`Invoice for ${order.id} — download started`);
  };

  const handleReorder = (order) => {
    console.log('🔁 Reorder:', order.id);
    showFeedback(`Items from ${order.id} added to cart`);
  };

  const toggleExpand = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  const initials = (user.name || 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40">
      {/* ---------- Hero header ---------- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-200 ease-in"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Back to home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 text-white"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur border-2 border-white/30 flex items-center justify-center text-white text-lg font-bold shadow-xl">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  My Orders
                </h1>
                <p className="text-sm text-white/80 mt-1">
                  Track, review, and manage your purchases
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/25 px-4 py-2.5 text-sm font-semibold">
              <FaShoppingBag className="w-3.5 h-3.5" />
              {counts.all} total orders
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-4 sm:-mt-6">
        {/* Feedback banner */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm"
            >
              <FaCheckCircle className="w-4 h-4" />
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ---------- Left sidebar ---------- */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-4 space-y-5"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FaTruck, label: 'Active', value: counts.Shipped + counts.Processing, color: 'indigo' },
                { icon: FaCheckCircle, label: 'Delivered', value: counts.Delivered, color: 'emerald' },
                { icon: FaTimes, label: 'Cancelled', value: counts.Cancelled, color: 'rose' },
              ].map(({ icon: Icon, label, value, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 0.2, ease: 'easeIn' }}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-100 p-4 text-center cursor-pointer transition-all duration-200"
                >
                  <div
                    className={`w-9 h-9 mx-auto mb-2 rounded-xl flex items-center justify-center ${
                      color === 'indigo'
                        ? 'bg-indigo-50 text-indigo-600'
                        : color === 'emerald'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-600'
                    } transition-transform duration-200 group-hover:scale-110`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{value}</p>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Info callout */}
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <FaInfoCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900">Need help with an order?</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Our support team is available 24/7 for delivery or refund queries.
                  </p>
                  <Link
                    to="/contact"
                    className="group mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:gap-2 transition-all duration-200 ease-in"
                  >
                    Contact support
                    <FaChevronRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Quick links
                </h3>
              </div>
              <div className="px-2 pb-2">
                {[
                  { icon: FaUser, label: 'My Profile', to: '/profile', desc: 'Edit your details' },
                  { icon: FaHeart, label: 'Wishlist', to: '/wishlist', desc: 'Saved items' },
                  { icon: FaMapMarkerAlt, label: 'Addresses', to: '/addresses', desc: 'Delivery info' },
                  { icon: FaGlobe, label: 'Settings', to: '/settings', desc: 'Preferences' },
                ].map(({ icon: Icon, label, to, desc }) => (
                  <Link
                    key={label}
                    to={to}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-indigo-50 hover:translate-x-1 transition-all duration-200 ease-in"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:scale-110">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
                        {label}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{desc}</p>
                    </div>
                    <FaChevronRight className="w-3 h-3 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Sign out (mobile) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeIn' }}
              onClick={handleLogout}
              className="sm:hidden w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 py-3.5 text-sm font-semibold transition-colors duration-200 ease-in cursor-pointer"
            >
              <FaSignOutAlt className="w-3.5 h-3.5" />
              Sign out
            </motion.button>
          </motion.aside>

          {/* ---------- Right column ---------- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-8 space-y-5"
          >
            {/* Filters + search */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4"
            >
              {/* Search */}
              <div className="relative group">
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-indigo-600" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by order ID or product name…"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-5 w-5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <FaTimes className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2">
                {filterTabs.map((tab) => {
                  const active = activeFilter === tab.key;
                  const count = counts[tab.key] ?? 0;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveFilter(tab.key)}
                      className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-in cursor-pointer ${
                        active
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                      <span
                        className={`inline-flex items-center justify-center min-w-[18px] h-4.5 px-1 rounded-full text-[10px] font-bold ${
                          active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Orders list */}
            <motion.div variants={fadeInUp}>
              {filteredOrders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FaBox className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">No orders found</h3>
                  <p className="text-sm text-gray-500 mb-5">
                    {search
                      ? `Nothing matched "${search}". Try a different search.`
                      : 'Try a different filter or start shopping to see orders here.'}
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 ease-in"
                  >
                    <FaShoppingBag className="w-3.5 h-3.5" />
                    Start shopping
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((order) => {
                    const meta = statusMeta[order.status];
                    const StatusIcon = meta.icon;
                    const isExpanded = expandedId === order.id;
                    return (
                      <motion.div
                        key={order.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className={`group bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isExpanded
                            ? 'border-indigo-300 shadow-lg shadow-indigo-500/10'
                            : 'border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-200 hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Order header (clickable) */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(order.id)}
                          className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-5 text-left cursor-pointer"
                        >
                          {/* Icon */}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${meta.tile}`}>
                            <StatusIcon className="w-5 h-5" />
                          </div>

                          {/* Order info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-bold text-gray-900 truncate group-hover:text-indigo-700 transition-colors">
                                #{order.id}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ${meta.badge}`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} ${order.status === 'Shipped' || order.status === 'Processing' ? 'animate-pulse' : ''}`} />
                                {meta.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Placed on {order.date}
                              {order.deliveredOn && ` · Delivered ${order.deliveredOn}`}
                            </p>
                          </div>

                          {/* Total */}
                          <div className="text-left sm:text-right shrink-0">
                            <p className="text-base font-bold text-gray-900">
                              ₹{order.total.toLocaleString('en-IN')}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </p>
                          </div>

                          {/* Chevron */}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0 text-gray-400 group-hover:text-indigo-600"
                          >
                            <FaChevronDown className="w-3.5 h-3.5" />
                          </motion.div>
                        </button>

                        {/* Expandable details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden border-t border-gray-100"
                            >
                              <div className="p-5 space-y-5 bg-gradient-to-b from-gray-50/50 to-white">
                                {/* Items */}
                                <div>
                                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-3">
                                    Items in this order
                                  </p>
                                  <ul className="space-y-2">
                                    {order.items.map((item, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-center gap-3 rounded-xl bg-white border border-gray-100 p-3"
                                      >
                                        <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                                          <FaBox className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-semibold text-gray-900 truncate">
                                            {item.name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {item.category} · Qty {item.qty}
                                          </p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 shrink-0">
                                          ₹{(item.price * item.qty).toLocaleString('en-IN')}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Meta grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <MetaCard
                                    icon={FaMapMarkerAlt}
                                    label="Delivery address"
                                    value={order.address}
                                  />
                                  <MetaCard
                                    icon={FaCreditCard}
                                    label="Payment method"
                                    value={order.payment}
                                  />
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {order.status === 'Delivered' && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownloadInvoice(order);
                                      }}
                                      className="group/btn inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 text-gray-700 px-3.5 py-2 text-xs font-semibold transition-all duration-200 ease-in cursor-pointer"
                                    >
                                      <FaDownload className="w-3 h-3 transition-transform group-hover/btn:translate-y-0.5" />
                                      Download invoice
                                    </button>
                                  )}
                                  {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleReorder(order);
                                      }}
                                      className="group/btn inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
                                    >
                                      <FaRedo className="w-3 h-3 transition-transform group-hover/btn:rotate-180" />
                                      Buy again
                                    </button>
                                  )}
                                  {(order.status === 'Shipped' || order.status === 'Processing') && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        console.log('🚚 Track:', order.id);
                                        showFeedback(`Tracking ${order.id}…`);
                                      }}
                                      className="group/btn inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
                                    >
                                      <FaTruck className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                                      Track order
                                    </button>
                                  )}
                                  <Link
                                    to={`/orders/${order.id}`}
                                    className="group/btn ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:gap-2 transition-all duration-200 ease-in"
                                  >
                                    View full details
                                    <FaChevronRight className="w-2.5 h-2.5 transition-transform group-hover/btn:translate-x-0.5" />
                                  </Link>
                                </div>

                                {/* Delivered banner */}
                                {order.status === 'Delivered' && (
                                  <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3.5 py-2.5 text-xs text-emerald-700">
                                    <FaStar className="w-3 h-3" />
                                    <span className="font-medium">
                                      Delivered on {order.deliveredOn}. Enjoy your purchase!
                                    </span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Reusable meta card ---------- */
const MetaCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-3.5">
    <div className="w-8 h-8 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
      <Icon className="w-3.5 h-3.5" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-0.5">
        {label}
      </p>
      <p className="text-xs font-medium text-gray-800 break-words leading-relaxed">
        {value}
      </p>
    </div>
  </div>
);

export default Orders;