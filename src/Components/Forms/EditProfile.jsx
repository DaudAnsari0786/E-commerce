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
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaArrowLeft,
  FaShieldAlt,
  FaCamera,
  FaInfoCircle,
} from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

/* ============================== Component ============================== */
const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

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

  if (!user) return null;

  /* ---------- Validation ---------- */
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    else if (form.name.trim().length < 2) next.name = 'Name is too short';

    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';

    if (form.phone && !/^[+\d][\d\s()-]{6,}$/.test(form.phone))
      next.phone = 'Enter a valid phone number';

    if (form.password && form.password.length < 6)
      next.password = 'Password must be at least 6 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /* ---------- Handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setTimeout(() => {
      updateUser({
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        address: form.address,
      });

      // Clear the password field after saving for security
      setForm((f) => ({ ...f, password: '' }));

      setSaving(false);
      setFeedback({ type: 'success', text: 'Profile updated successfully' });

      console.log('💾 Profile updated:', {
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        address: form.address,
      });

      // Auto-navigate back to profile after a short delay
      setTimeout(() => {
        setFeedback(null);
        navigate('/profile');
      }, 1500);
    }, 600);
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  /* ---------- Initials ---------- */
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              to="/profile"
              className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-200 ease-in"
            >
              <FaArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to profile
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mt-6 flex flex-col sm:flex-row items-center sm:items-end gap-5 text-white"
          >
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/15 backdrop-blur border-2 border-white/30 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-2xl shadow-indigo-900/30">
                {initials}
              </div>
              <button
                type="button"
                aria-label="Change avatar"
                className="absolute -bottom-1 -right-1 z-100 w-8 h-8 rounded-lg bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center shadow-lg transition-all duration-200 ease-in cursor-pointer hover:scale-110 active:scale-95"
              >
                <FaCamera className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left pb-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Edit Profile
              </h1>
              <p className="text-sm text-white/80 mt-1">
                Update your personal information
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
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-4 sm:-mt-6">
        {/* Feedback */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm"
          >
            <FaCheckCircle className="w-4 h-4" />
            {feedback.text}
          </motion.div>
        )}

        {/* Info callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
              <FaInfoCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                Changes apply instantly
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Your updated name and email will be reflected across the app immediately.
                Leave the password field blank if you don't want to change it.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ---------- Edit form ---------- */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FaShieldAlt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Personal information</h2>
                <p className="text-xs text-gray-500">Update the fields you want to change</p>
              </div>
            </div>

            {/* Fields */}
            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditField
                  icon={FaUser}
                  name="name"
                  label="Full name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  error={errors.name}
                  required
                />
                <EditField
                  icon={FaUser}
                  name="username"
                  label="Username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="janedoe"
                />
                <EditField
                  icon={FaEnvelope}
                  name="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  error={errors.email}
                  required
                />
                <EditField
                  icon={FaPhoneAlt}
                  name="phone"
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 90263 50956"
                  error={errors.phone}
                />
              </div>

              {/* Address full-width */}
              <EditField
                icon={FaMapMarkerAlt}
                name="address"
                label="Address"
                value={form.address}
                onChange={handleChange}
                placeholder="House no., street, city, state, pincode"
              />

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  New password{' '}
                  <span className="font-normal text-gray-400">(leave blank to keep current)</span>
                </label>
                <div className="relative group">
                  <FaLock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 transition-colors duration-200 ease-in group-focus-within:text-indigo-600" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in focus:outline-none focus:ring-2 ${
                      errors.password
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-gray-300 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 hover:scale-110 transition-all duration-200 ease-in cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-3.5 h-3.5" />
                    ) : (
                      <FaEye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-rose-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 px-5 sm:px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
              <motion.button
                type="submit"
                disabled={saving}
                whileHover={{
                  scale: 1.02,
                  y: -1,
                  boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeIn' }}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-semibold shadow-sm transition-colors duration-200 ease-in cursor-pointer disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <span className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Saving…
                  </>
                ) : (
                  <>
                    <FaSave className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                    Save changes
                  </>
                )}
              </motion.button>
              <motion.button
                type="button"
                onClick={handleCancel}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeIn' }}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400 px-5 py-3 text-sm font-semibold transition-all duration-200 ease-in cursor-pointer"
              >
                <FaTimes className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90" />
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

/* ---------- Edit field with icon + error ---------- */
const EditField = ({
  icon: Icon,
  name,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required,
}) => (
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
        className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 ease-in focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-gray-300 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-200'
        }`}
      />
    </div>
    {error && <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p>}
  </div>
);

export default EditProfile;