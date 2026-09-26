import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaBell,
  FaMoon,
  FaSun,
  FaGlobe,
  FaShieldAlt,
  FaTrashAlt,
  FaUserCircle,
  FaChevronRight,
  FaCheckCircle,
  FaInfoCircle,
  FaEnvelope,
  FaMobileAlt,
  FaCommentDots,
  FaSignOutAlt,
  FaDownload,
  FaKey,
} from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

/* ---------- Reusable toggle ---------- */
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in ${
      checked ? 'bg-indigo-600' : 'bg-gray-300'
    }`}
  >
    <motion.span
      layout
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

/* ============================== Component ============================== */
const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [feedback, setFeedback] = useState(null);

  // Demo preference toggles
  const [prefs, setPrefs] = useState({
    emailNotif: true,
    pushNotif: false,
    smsNotif: true,
    productUpdates: true,
    orderUpdates: true,
    darkMode: false,
    language: 'en',
  });

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  if (!user) return null;

  const showFeedback = (text) => {
    setFeedback({ text });
    setTimeout(() => setFeedback(null), 2500);
  };

  const togglePref = (key) => (value) => {
    setPrefs((p) => ({ ...p, [key]: value }));
    showFeedback('Preference saved');
  };

  const initials = (user.name || 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            className="mt-6 flex items-center gap-4 text-white"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur border-2 border-white/30 flex items-center justify-center text-white text-lg font-bold shadow-xl">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Settings
              </h1>
              <p className="text-sm text-white/80 mt-1">
                Manage your preferences and account options
              </p>
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
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm"
          >
            <FaCheckCircle className="w-4 h-4" />
            {feedback.text}
          </motion.div>
        )}

        {/* Info callout — directs to Profile for personal info edits */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 sm:p-5"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
              <FaInfoCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900">
                Looking to edit your personal details?
              </p>
              <p className="text-sm text-gray-600 mt-0.5">
                Name, email, phone, address, and password are managed on your Profile page.
              </p>
            </div>
            <Link
              to="/profile"
              className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 ease-in whitespace-nowrap"
            >
              <FaUserCircle className="w-4 h-4" />
              Go to Profile
              <FaChevronRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-6"
        >
          {/* ---------- Notifications ---------- */}
          <motion.section
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FaBell className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Notifications</h2>
                <p className="text-xs text-gray-500">Choose how we reach you</p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {[
                { key: 'emailNotif', icon: FaEnvelope, label: 'Email notifications', desc: 'Order updates, receipts, and account alerts' },
                { key: 'pushNotif', icon: FaMobileAlt, label: 'Push notifications', desc: 'Browser and mobile push alerts' },
                { key: 'smsNotif', icon: FaCommentDots, label: 'SMS notifications', desc: 'Delivery updates via text message' },
                { key: 'productUpdates', icon: FaBell, label: 'Product updates', desc: 'New arrivals and seasonal drops' },
                { key: 'orderUpdates', icon: FaBell, label: 'Order status', desc: 'Real-time status of your orders' },
              ].map(({ key, icon: Icon, label, desc }) => (
                <div
                  key={key}
                  className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 truncate">{desc}</p>
                  </div>
                  <Toggle
                    checked={prefs[key]}
                    onChange={togglePref(key)}
                  />
                </div>
              ))}
            </div>
          </motion.section>

          {/* ---------- Appearance ---------- */}
          <motion.section
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                {prefs.darkMode ? <FaMoon className="w-4 h-4" /> : <FaSun className="w-4 h-4" />}
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Appearance</h2>
                <p className="text-xs text-gray-500">Customize how StyleCraft looks</p>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
                <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                  <FaMoon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Dark mode</p>
                  <p className="text-xs text-gray-500">Switch to a darker palette for low-light viewing</p>
                </div>
                <Toggle
                  checked={prefs.darkMode}
                  onChange={togglePref('darkMode')}
                />
              </div>

              <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
                <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                  <FaGlobe className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">Language</p>
                  <p className="text-xs text-gray-500">Choose your preferred language</p>
                </div>
                <select
                  value={prefs.language}
                  onChange={(e) => {
                    setPrefs((p) => ({ ...p, language: e.target.value }));
                    showFeedback('Language updated');
                  }}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-200 cursor-pointer"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="ur">Urdu</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>
          </motion.section>

          {/* ---------- Privacy & Security ---------- */}
          <motion.section
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FaShieldAlt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Privacy & Security</h2>
                <p className="text-xs text-gray-500">Keep your account safe</p>
              </div>
            </div>

            <div className="px-2 py-2">
              {[
                { icon: FaKey, label: 'Change password', desc: 'Update your account password', to: '/profile' },
                { icon: FaShieldAlt, label: 'Two-factor authentication', desc: 'Add an extra layer of security' },
                { icon: FaDownload, label: 'Download your data', desc: 'Get a copy of your account data' },
                { icon: FaTrashAlt, label: 'Delete account', desc: 'Permanently remove your account', danger: true },
              ].map(({ icon: Icon, label, desc, to, danger }) => (
                <Link
                  key={label}
                  to={to || '#'}
                  onClick={(e) => {
                    if (!to) {
                      e.preventDefault();
                      showFeedback(`${label} — coming soon`);
                    }
                  }}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:translate-x-0.5 ${
                    danger ? 'hover:bg-rose-50' : 'hover:bg-emerald-50/70'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:scale-105 ${
                      danger
                        ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white'
                        : 'bg-gray-50 text-gray-500 group-hover:bg-emerald-600 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold transition-colors duration-200 ${
                        danger ? 'text-rose-600' : 'text-gray-900 group-hover:text-emerald-700'
                      }`}
                    >
                      {label}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{desc}</p>
                  </div>
                  <FaChevronRight
                    className={`w-3 h-3 transition-all duration-200 group-hover:translate-x-1 ${
                      danger
                        ? 'text-gray-300 group-hover:text-rose-500'
                        : 'text-gray-300 group-hover:text-emerald-500'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </motion.section>

          {/* ---------- Sign out ---------- */}
          <motion.div variants={fadeInUp}>
            <button
              type="button"
              onClick={handleLogout}
              className="group w-full flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 py-3.5 text-sm font-semibold transition-colors duration-200 ease-in cursor-pointer"
            >
              <FaSignOutAlt className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              Sign out of your account
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;