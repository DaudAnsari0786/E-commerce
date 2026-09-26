import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLock,
  FaEdit,
  FaSignOutAlt,
  FaShoppingBag,
  FaHeart,
  FaTruck,
  FaCheckCircle,
  FaCamera,
  FaBox,
  FaChevronRight,
  FaCrown,
  FaCalendarAlt,
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

/* ---------- Demo orders ---------- */
const demoOrders = [
  { id: 'SC-2409-1042', date: 'Sep 18, 2026', total: 4820, status: 'Delivered', items: 3 },
  { id: 'SC-2409-0987', date: 'Sep 05, 2026', total: 1899, status: 'Shipped', items: 1 },
  { id: 'SC-2408-0751', date: 'Aug 22, 2026', total: 3450, status: 'Delivered', items: 2 },
];

const statusStyles = {
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Shipped: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  Processing: 'bg-amber-50 text-amber-700 ring-amber-200',
};

/* ============================== Component ============================== */
const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = (user.name || 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

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
            className="mt-6 flex flex-col sm:flex-row items-center sm:items-end gap-5 text-white"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2, ease: 'easeIn' }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/15 backdrop-blur border-2 border-white/30 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-2xl shadow-indigo-900/30"
              >
                {initials}
              </motion.div>
              <button
                type="button"
                aria-label="Change avatar"
                className="absolute -bottom-1 -right-1 z-100 w-9 h-9 rounded-xl bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center shadow-lg transition-all duration-200 ease-in cursor-pointer hover:scale-110 active:scale-95"
              >
                <FaCamera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left pb-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  {user.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  <FaCrown className="w-2.5 h-2.5" />
                  Member
                </span>
              </div>
              <p className="text-sm text-white/80">@{user.username || 'user'}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium">
                  <FaEnvelope className="w-3 h-3 opacity-80" />
                  {user.email}
                </span>
                {user.memberSince && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium">
                    <FaCalendarAlt className="w-3 h-3 opacity-80" />
                    Since {user.memberSince}
                  </span>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.28)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeIn' }}
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/25 text-white px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ease-in cursor-pointer"
            >
              <FaSignOutAlt className="w-3.5 h-3.5" />
              Sign out
            </motion.button>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ---------- Left column ---------- */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-4 space-y-5"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FaShoppingBag, label: 'Orders', value: demoOrders.length, color: 'indigo' },
                { icon: FaHeart, label: 'Wishlist', value: 8, color: 'rose' },
                { icon: FaTruck, label: 'In Transit', value: 1, color: 'amber' },
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
                        : color === 'rose'
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-amber-50 text-amber-600'
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

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Quick links
                </h3>
              </div>
              <div className="px-2 pb-2">
                {[
                  { icon: FaBox, label: 'My Orders', to: '/orders', desc: 'Track purchases' },
                  { icon: FaHeart, label: 'Wishlist', to: '/wishlist', desc: 'Saved items' },
                  { icon: FaMapMarkerAlt, label: 'Addresses', to: '/addresses', desc: 'Delivery info' },
                  { icon: FaLock, label: 'Settings', to: '/settings', desc: 'Preferences & security' },
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
              whileHover={{ scale: 1.02, backgroundColor: '#ffe4e6' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeIn' }}
              onClick={handleLogout}
              className="sm:hidden w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 hover:text-rose-700 py-3.5 text-sm font-semibold transition-colors duration-200 ease-in cursor-pointer"
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
            className="lg:col-span-8 space-y-6"
          >
            {/* ---------- Account details (read-only) ---------- */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FaUser className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Account details</h2>
                    <p className="text-xs text-gray-500">Your personal information</p>
                  </div>
                </div>

                {/* ✅ Single Edit button → navigates to /edit-profile */}
                <motion.div
                  whileHover={{
                    scale: 1.06,
                    y: -2,
                    boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeIn' }}
                >
                  <Link
                    to="/edit-profile"
                    className="group relative inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors duration-200 ease-in cursor-pointer"
                  >
                    <FaEdit className="w-3 h-3 transition-transform duration-200 group-hover:rotate-12" />
                    Edit profile
                    <span className="absolute inset-0 rounded-lg ring-2 ring-indigo-300/0 group-hover:ring-indigo-300/50 transition-all duration-200" />
                  </Link>
                </motion.div>
              </div>

              <div className="p-5 sm:p-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <Field icon={FaUser} label="Full name" value={user.name} />
                  <Field icon={FaUser} label="Username" value={user.username ? `@${user.username}` : '—'} />
                  <Field icon={FaEnvelope} label="Email" value={user.email} />
                  <Field icon={FaPhoneAlt} label="Phone" value={user.phone || '—'} />
                  <Field icon={FaLock} label="Password" value="••••••••" />
                  <div className="sm:col-span-2">
                    <Field icon={FaMapMarkerAlt} label="Address" value={user.address || '—'} />
                  </div>
                </dl>
              </div>
            </motion.section>

            {/* ---------- Recent orders ---------- */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FaBox className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Recent orders</h2>
                    <p className="text-xs text-gray-500">Your latest purchases</p>
                  </div>
                </div>
                <Link
                  to="/orders"
                  className="group inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:gap-2 transition-all duration-200 ease-in"
                >
                  View all
                  <FaChevronRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              <ul className="divide-y divide-gray-100">
                {demoOrders.map((order) => (
                  <li key={order.id}>
                    <Link
                      to={`/orders/${order.id}`}
                      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-6 py-4 hover:bg-gradient-to-r hover:from-indigo-50/70 hover:to-transparent transition-all duration-200 ease-in"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-200">
                          <FaBox className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate group-hover:text-indigo-700 transition-colors duration-200">
                            #{order.id}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.date} · {order.items} {order.items === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ring-1 group-hover:ring-2 transition-all duration-200 ${
                            statusStyles[order.status] || statusStyles.Processing
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {order.status}
                        </span>
                        <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                        <FaChevronRight className="w-3 h-3 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Read-only field ---------- */
const Field = ({ icon: Icon, label, value }) => (
  <div className="group/field">
    <dt className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
      <Icon className="w-3 h-3 text-gray-400 transition-colors duration-200 group-hover/field:text-indigo-600" />
      {label}
    </dt>
    <dd className="text-sm font-medium text-gray-900 break-words leading-relaxed">
      {value}
    </dd>
  </div>
);

export default Profile;