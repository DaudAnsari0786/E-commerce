import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
  FaShoppingBag,
  FaHeart,
  FaTruck,
  FaCheckCircle,
  FaCamera,
  FaShieldAlt,
  FaBox,
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

/* ---------- Load user from localStorage (set by Login/Signup) ---------- */
const loadUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/* ---------- Demo orders (replace with real API data) ---------- */
const demoOrders = [
  { id: 'SC-2409-1042', date: 'Sep 18, 2026', total: 4820, status: 'Delivered', items: 3 },
  { id: 'SC-2409-0987', date: 'Sep 05, 2026', total: 1899, status: 'Shipped', items: 1 },
  { id: 'SC-2408-0751', date: 'Aug 22, 2026', total: 3450, status: 'Delivered', items: 2 },
];

/* ---------- Component ---------- */
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(loadUser());
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Editable copy while editing
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  // Hydrate form whenever user changes
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        password: '',
      });
    }
  }, [user]);

  /* ---------- Redirect to login if no user ---------- */
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  /* ---------- Handlers ---------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API call — replace with real update endpoint
    setTimeout(() => {
      const updated = {
        ...user,
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        address: form.address,
        ...(form.password ? { password: form.password } : {}),
      };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));

      console.log('✅ Profile updated:', updated);
      setSaving(false);
      setEditing(false);
      setFeedback({ type: 'success', text: 'Profile updated successfully' });
      setTimeout(() => setFeedback(null), 3000);
    }, 800);
  };

  const handleCancel = () => {
    setEditing(false);
    setShowPassword(false);
    setForm({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      password: '',
    });
  };

  const handleLogout = () => {
    console.log('👋 Logging out…');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  /* ---------- Loading guard ---------- */
  if (!user) return null;

  const initials = (user.name || 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-8"
        >
          <motion.div variants={fadeInUp}>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-300 ease-in mb-3"
            >
              ← Back to home
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 flex items-center gap-3"
          >
            <FaUser className="w-6 h-6 text-indigo-600" />
            My Profile
          </motion.h1>
        </motion.div>

        {/* Feedback banner */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            <FaCheckCircle className="w-4 h-4" />
            {feedback.text}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* ---------- Left: Avatar card ---------- */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-4 space-y-5"
          >
            {/* Avatar + name */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="relative inline-block mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: 'easeIn' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-indigo-500/30 cursor-pointer"
                >
                  {initials}
                </motion.div>
                <button
                  type="button"
                  aria-label="Change avatar"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 flex items-center justify-center shadow-sm transition-colors duration-300 ease-in cursor-pointer"
                >
                  <FaCamera className="w-3.5 h-3.5" />
                </button>
              </div>

              <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">@{user.username || 'user'}</p>
              <p className="text-xs text-gray-400 mt-1">{user.email}</p>

              {user.memberSince && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">
                  <FaShieldAlt className="w-3 h-3" />
                  Member since {user.memberSince}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FaShoppingBag, label: 'Orders', value: demoOrders.length },
                { icon: FaHeart, label: 'Wishlist', value: 8 },
                { icon: FaTruck, label: 'In Transit', value: 1 },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3, ease: 'easeIn' }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <Icon className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{value}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {[
                { icon: FaBox, label: 'My Orders', to: '/orders' },
                { icon: FaHeart, label: 'Wishlist', to: '/wishlist' },
                { icon: FaMapMarkerAlt, label: 'Addresses', to: '/addresses' },
                { icon: FaLock, label: 'Change Password', to: '/change-password' },
              ].map(({ icon: Icon, label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 border-b border-gray-50 last:border-b-0 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-300 ease-in"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
                  <span className="flex-1">{label}</span>
                  <span className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-300">
                    →
                  </span>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              onClick={handleLogout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 py-3 text-sm font-semibold transition-colors duration-300 ease-in cursor-pointer"
            >
              <FaSignOutAlt className="w-3.5 h-3.5" />
              Sign out
            </motion.button>
          </motion.aside>

          {/* ---------- Right: Details + Orders ---------- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-8 space-y-6"
          >
            {/* Profile details */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Account details</h2>

                {!editing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, ease: 'easeIn' }}
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ease-in cursor-pointer"
                  >
                    <FaEdit className="w-3 h-3" />
                    Edit
                  </motion.button>
                ) : (
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: 'easeIn' }}
                      onClick={handleCancel}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ease-in cursor-pointer"
                    >
                      <FaTimes className="w-3 h-3" />
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: 'easeIn' }}
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ease-in cursor-pointer disabled:opacity-70"
                    >
                      {saving ? (
                        <>
                          <span className="w-3 h-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Saving…
                        </>
                      ) : (
                        <>
                          <FaSave className="w-3 h-3" />
                          Save
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </div>

              {!editing ? (
                /* ---------- Read-only view ---------- */
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <Field icon={FaUser} label="Full name" value={user.name} />
                  <Field icon={FaUser} label="Username" value={user.username ? `@${user.username}` : '—'} />
                  <Field icon={FaEnvelope} label="Email" value={user.email} />
                  <Field icon={FaPhoneAlt} label="Phone" value={user.phone || '—'} />
                  <Field icon={FaLock} label="Password" value="••••••••" />
                  <div className="sm:col-span-2">
                    <Field
                      icon={FaMapMarkerAlt}
                      label="Address"
                      value={user.address || '—'}
                    />
                  </div>
                </dl>
              ) : (
                /* ---------- Edit form ---------- */
                <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <EditInput
                    icon={FaUser}
                    name="name"
                    label="Full name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                  />
                  <EditInput
                    icon={FaUser}
                    name="username"
                    label="Username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="janedoe"
                  />
                  <EditInput
                    icon={FaEnvelope}
                    name="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  <EditInput
                    icon={FaPhoneAlt}
                    name="phone"
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 90263 50956"
                  />

                  <div className="sm:col-span-2">
                    <EditInput
                      icon={FaMapMarkerAlt}
                      name="address"
                      label="Address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Vill. Rukmalpur Post Meerpur, Atrauliya-Azamgarh, UP 223223"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      New password <span className="text-gray-400">(leave blank to keep current)</span>
                    </label>
                    <div className="relative group">
                      <FaLock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 transition-colors duration-300 ease-in group-focus-within:text-indigo-600" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors duration-300 ease-in cursor-pointer"
                      >
                        {showPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.section>

            {/* Recent orders */}
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaBox className="w-4 h-4 text-indigo-600" />
                  Recent orders
                </h2>
                <Link
                  to="/orders"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300 ease-in"
                >
                  View all →
                </Link>
              </div>

              <ul className="divide-y divide-gray-100">
                {demoOrders.map((order) => (
                  <li key={order.id}>
                    <Link
                      to={`/orders/${order.id}`}
                      className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3.5 hover:bg-gray-50 -mx-3 px-3 rounded-lg transition-colors duration-300 ease-in"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors duration-300">
                          <FaBox className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            #{order.id}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.date} · {order.items} {order.items === 1 ? 'item' : 'items'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            order.status === 'Delivered'
                              ? 'bg-green-50 text-green-700'
                              : order.status === 'Shipped'
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {order.status}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
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

/* ---------- Small helper: read-only field ---------- */
const Field = ({ icon: Icon, label, value }) => (
  <div>
    <dt className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1">
      <Icon className="w-3 h-3 text-gray-400" />
      {label}
    </dt>
    <dd className="text-sm font-medium text-gray-900 break-words">{value}</dd>
  </div>
);

/* ---------- Small helper: edit input ---------- */
const EditInput = ({ icon: Icon, name, label, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-xs font-medium text-gray-700 mb-1.5">
      {label}
    </label>
    <div className="relative group">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 transition-colors duration-300 ease-in group-focus-within:text-indigo-600" />
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  </div>
);

export default Profile;