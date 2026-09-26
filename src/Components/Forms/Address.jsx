import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaStar,
  FaPhoneAlt,
  FaUser,
  FaCity,
  FaGlobe,
  FaChevronRight,
  FaSignOutAlt,
  FaInfoCircle,
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

/* ---------- Address type meta ---------- */
const addressTypeMeta = {
  Home:  { icon: FaHome,     theme: 'indigo',  tile: 'bg-indigo-50 text-indigo-600',  ring: 'ring-indigo-200',  badge: 'bg-indigo-100 text-indigo-700' },
  Work:  { icon: FaBuilding, theme: 'emerald', tile: 'bg-emerald-50 text-emerald-600', ring: 'ring-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
  Other: { icon: FaMapMarkerAlt, theme: 'amber', tile: 'bg-amber-50 text-amber-600',   ring: 'ring-amber-200',   badge: 'bg-amber-100 text-amber-700' },
};

/* ---------- Empty form template ---------- */
const emptyForm = {
  id: null,
  type: 'Home',
  name: '',
  phone: '',
  line1: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  isDefault: false,
};

/* ============================== Component ============================== */
const Address = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  // Seed with a demo address so the page isn't empty on first load
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Abu Bakar Ansari',
      phone: '+91 90263 50956',
      line1: 'Vill. Rukmalpur Post Meerpur',
      city: 'Atrauliya',
      state: 'Uttar Pradesh',
      pincode: '223223',
      country: 'India',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      name: 'Daud Ansari',
      phone: '+91 90263 50956',
      line1: 'chotpur colony, Sector 63',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      country: 'India',
      isDefault: false,
    },
  ]);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  if (!user) return null;

  const showFeedback = (text, tone = 'success') => {
    setFeedback({ text, tone });
    setTimeout(() => setFeedback(null), 2500);
  };

  /* ---------- Handlers ---------- */
  const startAdd = () => {
    setForm({ ...emptyForm, name: user.name || '' });
    setEditing(true);
  };

  const startEdit = (addr) => {
    setForm({ ...addr });
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      setAddresses((prev) => {
        let next;

        if (form.id) {
          // Update existing
          next = prev.map((a) => (a.id === form.id ? { ...form } : a));
        } else {
          // Add new
          const newAddr = { ...form, id: Date.now() };
          next = [...prev, newAddr];
        }

        // If this is now the default, remove default flag from others
        if (form.isDefault) {
          next = next.map((a) =>
            a.id === (form.id || next[next.length - 1].id)
              ? { ...a, isDefault: true }
              : { ...a, isDefault: false }
          );
        }

        return next;
      });

      setSaving(false);
      setEditing(false);
      setForm(emptyForm);
      showFeedback(form.id ? 'Address updated' : 'Address added');
      console.log('📍 Address saved:', form);
    }, 400);
  };

  const setDefault = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    showFeedback('Default address updated');
    console.log('📍 Default address set:', id);
  };

  const confirmDelete = () => {
    setAddresses((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    showFeedback('Address deleted');
    console.log('📍 Address deleted:', deleteTarget);
    setDeleteTarget(null);
  };

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
                  My Addresses
                </h1>
                <p className="text-sm text-white/80 mt-1">
                  Manage where your orders are delivered
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={startAdd}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeIn' }}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-indigo-700 px-4 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-in cursor-pointer"
            >
              <FaPlus className="w-3.5 h-3.5" />
              Add new address
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
        {/* Feedback banner */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`mb-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-sm ${
                feedback.tone === 'error'
                  ? 'border-rose-200 bg-rose-50 text-rose-700'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}
            >
              <FaCheckCircle className="w-4 h-4" />
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ---------- Left column ---------- */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-4 space-y-5"
          >
            {/* Address count card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
                  <FaMapMarkerAlt className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{addresses.length}</p>
                  <p className="text-xs text-gray-500">
                    {addresses.length === 1 ? 'Saved address' : 'Saved addresses'}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                <FaInfoCircle className="w-3.5 h-3.5 text-indigo-500" />
                Your default address is used first at checkout
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
                  { icon: FaStar, label: 'My Orders', to: '/orders', desc: 'Track purchases' },
                  { icon: FaHome, label: 'Wishlist', to: '/wishlist', desc: 'Saved items' },
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
            className="lg:col-span-8 space-y-6"
          >
            {/* ---------- Edit / Add form ---------- */}
            <AnimatePresence>
              {editing && (
                <motion.section
                  initial={{ opacity: 0, y: -12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -12, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="bg-white rounded-2xl border border-indigo-200 shadow-lg shadow-indigo-500/10 overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                        {form.id ? <FaEdit className="w-4 h-4" /> : <FaPlus className="w-4 h-4" />}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-gray-900">
                          {form.id ? 'Edit address' : 'Add new address'}
                        </h2>
                        <p className="text-xs text-gray-500">
                          {form.id ? 'Update your delivery details' : 'Fill in the delivery details'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-500 hover:bg-white hover:text-rose-600 transition-colors duration-200 cursor-pointer"
                      aria-label="Cancel"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-5">
                    {/* Address type chips */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Address type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Home', 'Work', 'Other'].map((t) => {
                          const meta = addressTypeMeta[t];
                          const Icon = meta.icon;
                          const active = form.type === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setForm((f) => ({ ...f, type: t }))}
                              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all duration-200 ease-in ${
                                active
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 1: name + phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        icon={FaUser}
                        name="name"
                        label="Full name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        required
                      />
                      <InputField
                        icon={FaPhoneAlt}
                        name="phone"
                        label="Phone number"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 90263 50956"
                        required
                      />
                    </div>

                    {/* Line 1 */}
                    <InputField
                      icon={FaMapMarkerAlt}
                      name="line1"
                      label="Address line"
                      value={form.line1}
                      onChange={handleChange}
                      placeholder="House no., street, area"
                      required
                    />

                    {/* Row 3: city + state + pincode */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <InputField
                        icon={FaCity}
                        name="city"
                        label="City"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Noida"
                        required
                      />
                      <InputField
                        icon={FaGlobe}
                        name="state"
                        label="State"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="Uttar Pradesh"
                        required
                      />
                      <InputField
                        icon={FaMapMarkerAlt}
                        name="pincode"
                        label="Pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="201301"
                        required
                      />
                    </div>

                    {/* Country + Default */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        icon={FaGlobe}
                        name="country"
                        label="Country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="India"
                        required
                      />
                      <label className="flex items-center gap-3 mt-6 sm:mt-7 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={form.isDefault}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700">
                          Set as default address
                        </span>
                      </label>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <motion.button
                        type="submit"
                        disabled={saving}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeIn' }}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 ease-in cursor-pointer disabled:opacity-70"
                      >
                        {saving ? (
                          <>
                            <span className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                            Saving…
                          </>
                        ) : (
                          <>
                            <FaSave className="w-3.5 h-3.5" />
                            {form.id ? 'Update address' : 'Save address'}
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={cancelEdit}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeIn' }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 px-4 py-3 text-sm font-semibold transition-all duration-200 ease-in cursor-pointer"
                      >
                        <FaTimes className="w-3.5 h-3.5" />
                        Cancel
                      </motion.button>
                    </div>
                  </form>
                </motion.section>
              )}
            </AnimatePresence>

            {/* ---------- Address list ---------- */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Saved addresses
                </h2>
                {!editing && (
                  <button
                    type="button"
                    onClick={startAdd}
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:gap-2 transition-all duration-200 ease-in cursor-pointer"
                  >
                    <FaPlus className="w-2.5 h-2.5" />
                    Add new
                  </button>
                )}
              </div>

              {addresses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    No addresses yet
                  </h3>
                  <p className="text-sm text-gray-500 mb-5">
                    Add your first delivery address to speed up checkout.
                  </p>
                  <motion.button
                    type="button"
                    onClick={startAdd}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
                  >
                    <FaPlus className="w-3.5 h-3.5" />
                    Add new address
                  </motion.button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => {
                    const meta = addressTypeMeta[addr.type] || addressTypeMeta.Other;
                    const TypeIcon = meta.icon;
                    return (
                      <motion.div
                        key={addr.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        whileHover={{ y: -4 }}
                        className={`group relative bg-white rounded-2xl border p-5 transition-all duration-200 ${
                          addr.isDefault
                            ? 'border-indigo-300 shadow-md shadow-indigo-500/10'
                            : 'border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-200'
                        }`}
                      >
                        {/* Default badge */}
                        {addr.isDefault && (
                          <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm">
                            <FaStar className="w-2.5 h-2.5" />
                            Default
                          </span>
                        )}

                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.tile}`}>
                              <TypeIcon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate">
                                {addr.name}
                              </p>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mt-0.5 ${meta.badge}`}
                              >
                                {addr.type}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Address lines */}
                        <div className="text-sm text-gray-600 leading-relaxed space-y-0.5">
                          <p className="truncate">{addr.line1}</p>
                          <p>
                            {addr.city}, {addr.state} — {addr.pincode}
                          </p>
                          <p className="text-gray-500 text-xs">{addr.country}</p>
                        </div>

                        {/* Phone */}
                        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                          <FaPhoneAlt className="w-3 h-3 text-gray-400" />
                          <span>{addr.phone}</span>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex items-center gap-2">
                          {!addr.isDefault && (
                            <button
                              type="button"
                              onClick={() => setDefault(addr.id)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 text-gray-600 px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-in cursor-pointer"
                            >
                              <FaStar className="w-2.5 h-2.5" />
                              Set default
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => startEdit(addr)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 text-gray-600 px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-in cursor-pointer"
                          >
                            <FaEdit className="w-2.5 h-2.5" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(addr)}
                            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-in cursor-pointer"
                          >
                            <FaTrashAlt className="w-2.5 h-2.5" />
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.section>
          </motion.div>
        </div>
      </div>

      {/* ---------- Delete confirmation modal ---------- */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <FaTrashAlt className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Delete this address?</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {deleteTarget.line1}
                </p>
                <p className="text-xs text-gray-400">
                  {deleteTarget.city}, {deleteTarget.state} — {deleteTarget.pincode}
                </p>
              </div>
              <div className="px-6 pb-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ease-in cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 ease-in cursor-pointer"
                >
                  <FaTrashAlt className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- Reusable input with icon ---------- */
const InputField = ({ icon: Icon, name, label, value, onChange, type = 'text', placeholder, required }) => (
  <div>
    <label htmlFor={name} className="block text-xs font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative group">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 transition-colors duration-200 ease-in group-focus-within:text-indigo-600" />
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  </div>
);

export default Address;