import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLock, FaEye,
  FaEyeSlash, FaSave, FaTimes, FaCheckCircle, FaArrowLeft,
  FaShieldAlt, FaCamera, FaInfoCircle, FaTrash, FaKey,
} from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

const MAX_AVATAR_MB = 10;
const MAX_AVATAR_BYTES = MAX_AVATAR_MB * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const fileInputRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarError, setAvatarError] = useState('');

  const [form, setForm] = useState({
    name: '', username: '', email: '', phone: '', address: '',
    newPassword: '', confirmPassword: '',
  });

  // ✅ Read the stored password from the user context
  const [currentStoredPassword, setCurrentStoredPassword] = useState('');

  useEffect(() => { if (!user) navigate('/login'); }, [user, navigate]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        newPassword: '',
        confirmPassword: '',
      });
      setCurrentStoredPassword(user.password || '');
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  if (!user) return null;

  const handleAvatarClick = () => { setAvatarError(''); fileInputRef.current?.click(); };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setAvatarError('Please upload a JPG, PNG, WEBP, or GIF image.');
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setAvatarError(`Image is too large (${sizeMB} MB). Max ${MAX_AVATAR_MB} MB.`);
      return;
    }

    setAvatarError('');
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.onerror = () => setAvatarError('Failed to read the image. Please try again.');
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setAvatarError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required';
    else if (form.name.trim().length < 2) next.name = 'Name is too short';

    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';

    if (form.phone && !/^[+\d][\d\s()-]{6,}$/.test(form.phone))
      next.phone = 'Enter a valid phone number';

    // Password validation (only if user is trying to change password)
    const wantsPasswordChange = form.newPassword || form.confirmPassword;

    if (wantsPasswordChange) {
      if (!form.newPassword) next.newPassword = 'New password is required';
      else if (form.newPassword.length < 6) next.newPassword = 'New password must be at least 6 characters';
      if (!form.confirmPassword) next.confirmPassword = 'Please confirm your new password';
      else if (form.confirmPassword !== form.newPassword) next.confirmPassword = 'Passwords do not match';
      if (form.newPassword && form.newPassword === currentStoredPassword)
        next.newPassword = 'New password must be different from current password';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

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
      const updates = {
        name: form.name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        address: form.address,
        avatar: avatarPreview,
      };

      // ✅ If new password provided, update it
      if (form.newPassword) {
        updates.password = form.newPassword;
        setCurrentStoredPassword(form.newPassword);
      }

      updateUser(updates);
      setForm((f) => ({ ...f, newPassword: '', confirmPassword: '' }));
      setSaving(false);
      setFeedback({ type: 'success', text: 'Profile updated successfully' });
      setTimeout(() => { setFeedback(null); navigate('/profile'); }, 1500);
    }, 600);
  };

  const handleCancel = () => navigate('/profile');
  const initials = (user.name || 'U').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <Link to="/profile" className="group inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors duration-200 ease-in">
              <FaArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to profile
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mt-6 flex flex-col sm:flex-row items-center sm:items-end gap-5 text-white"
          >
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/15 backdrop-blur border-2 border-white/30 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-2xl shadow-indigo-900/30 overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : initials}
              </div>

              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleAvatarChange} className="hidden" aria-label="Upload avatar image" />

              <button type="button" onClick={handleAvatarClick} aria-label="Change avatar"
                className="absolute -bottom-1 -right-1 z-100 w-8 h-8 rounded-lg bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center shadow-lg transition-all duration-200 ease-in cursor-pointer hover:scale-110 active:scale-95">
                <FaCamera className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left pb-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Edit Profile</h1>
              <p className="text-sm text-white/80 mt-1">Update your personal information</p>
              <p className="text-xs text-white/60 mt-1">Max image size: {MAX_AVATAR_MB} MB · JPG, PNG, WEBP, GIF</p>
            </div>
          </motion.div>

          {(avatarError || avatarPreview) && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {avatarError && (
                <p className="text-xs font-medium text-rose-100 bg-rose-500/30 border border-rose-300/40 rounded-lg px-3 py-1.5">
                  {avatarError}
                </p>
              )}
              {avatarPreview && (
                <button type="button" onClick={handleRemoveAvatar}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-1.5 transition-colors duration-200">
                  <FaTrash className="w-3 h-3" />
                  Remove photo
                </button>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <svg className="block w-full h-8 sm:h-12 text-slate-50 dark:text-slate-950 transition-colors duration-300"
            viewBox="0 0 1440 60" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,32 C240,60 480,0 720,20 C960,40 1200,60 1440,32 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-4 sm:-mt-6">
        {feedback && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
            className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300 shadow-sm">
            <FaCheckCircle className="w-4 h-4" />
            {feedback.text}
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="mb-6 rounded-2xl border border-indigo-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 p-4 transition-colors duration-300">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
              <FaInfoCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-slate-100">Changes apply instantly</p>
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                Your updated name, email, and photo will be reflected across the app immediately.
                Leave the password fields blank if you don't want to change it.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <form onSubmit={handleSave}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
            <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-gray-50/50 to-white dark:from-slate-800 dark:to-slate-800">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                <FaShieldAlt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-slate-100">Personal information</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400">Update the fields you want to change</p>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditField icon={FaUser} name="name" label="Full name" value={form.name} onChange={handleChange}
                  placeholder="Jane Doe" error={errors.name} required />
                <EditField icon={FaUser} name="username" label="Username" value={form.username}
                  onChange={handleChange} placeholder="janedoe" />
                <EditField icon={FaEnvelope} name="email" label="Email" type="email" value={form.email}
                  onChange={handleChange} placeholder="you@example.com" error={errors.email} required />
                <EditField icon={FaPhoneAlt} name="phone" label="Phone" type="tel" value={form.phone}
                  onChange={handleChange} placeholder="+91 90263 50956" error={errors.phone} />
              </div>

              <EditField icon={FaMapMarkerAlt} name="address" label="Address" value={form.address}
                onChange={handleChange} placeholder="House no., street, city, state, pincode" />
            </div>

            {/* ==================== PASSWORD & SECURITY SECTION ==================== */}
            <div className="border-t border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-3 px-5 sm:px-6 py-4 bg-gradient-to-r from-gray-50/50 to-white dark:from-slate-800 dark:to-slate-800">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 flex items-center justify-center">
                  <FaKey className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-slate-100">Password & Security</h2>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Update your password to keep your account secure</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-5">
                <div className="rounded-xl border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/20 px-4 py-3">
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    <strong>Note:</strong> Leave the new password fields blank if you don't want to change your password.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Current Password (Read-Only) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
                      Current Password (Read-only)
                    </label>
                    <div className="relative group">
                      <FaLock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentStoredPassword || '••••••••'}
                        readOnly
                        disabled
                        className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 py-2.5 pl-9 pr-11 text-sm text-gray-500 dark:text-slate-400 cursor-not-allowed"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((s) => !s)}
                        aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 ease-in cursor-pointer"
                      >
                        {showCurrentPassword ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="mt-1.5 text-[10px] text-gray-400 dark:text-slate-500">
                      This is the password you created during signup/login.
                    </p>
                  </div>

                  {/* New Password */}
                  <PasswordField
                    icon={FaKey}
                    name="newPassword"
                    label="New Password"
                    value={form.newPassword}
                    onChange={handleChange}
                    show={showNewPassword}
                    onToggleShow={() => setShowNewPassword((s) => !s)}
                    placeholder="Enter your new password"
                    error={errors.newPassword}
                  />

                  {/* Confirm New Password */}
                  <PasswordField
                    icon={FaShieldAlt}
                    name="confirmPassword"
                    label="Confirm New Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    show={showConfirmPassword}
                    onToggleShow={() => setShowConfirmPassword((s) => !s)}
                    placeholder="Re-enter your new password"
                    error={errors.confirmPassword}
                  />
                </div>
              </div>
            </div>
            {/* ==================== END PASSWORD & SECURITY SECTION ==================== */}

            <div className="flex flex-col sm:flex-row gap-3 px-5 sm:px-6 py-4 border-t border-gray-100 dark:border-slate-700 bg-gradient-to-r from-gray-50/50 to-white dark:from-slate-800 dark:to-slate-800">
              <motion.button type="submit" disabled={saving}
                whileHover={{ scale: 1.02, y: -1, boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}
                whileTap={{ scale: 0.98 }} transition={{ duration: 0.2, ease: 'easeIn' }}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-semibold shadow-sm transition-colors duration-200 ease-in cursor-pointer disabled:opacity-70">
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
              <motion.button type="button" onClick={handleCancel}
                whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeIn' }}
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-800 dark:hover:text-slate-100 hover:border-gray-400 dark:hover:border-slate-500 px-5 py-3 text-sm font-semibold transition-all duration-200 ease-in cursor-pointer">
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

const EditField = ({ icon: Icon, name, label, value, onChange, type = 'text', placeholder, error, required }) => (
  <div>
    <label htmlFor={name} className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative group">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-slate-500 transition-colors duration-200 ease-in group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full rounded-lg border bg-white dark:bg-slate-900 py-2.5 pl-9 pr-3 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200 ease-in focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200 dark:focus:ring-rose-500/40'
            : 'border-gray-300 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-slate-500 focus:border-indigo-500 focus:ring-indigo-200 dark:focus:ring-indigo-500/40'
        }`} />
    </div>
    {error && <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p>}
  </div>
);

const PasswordField = ({
  icon: Icon, name, label, value, onChange,
  show, onToggleShow, placeholder, error,
}) => (
  <div>
    <label htmlFor={name} className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
      {label}
    </label>
    <div className="relative group">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 dark:text-slate-500 transition-colors duration-200 ease-in group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
      <input
        id={name}
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="new-password"
        className={`w-full rounded-lg border bg-white dark:bg-slate-900 py-2.5 pl-9 pr-11 text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200 ease-in focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200 dark:focus:ring-rose-500/40'
            : 'border-gray-300 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-slate-500 focus:border-indigo-500 focus:ring-indigo-200 dark:focus:ring-indigo-500/40'
        }`}
      />
      <button
        type="button"
        onClick={onToggleShow}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 transition-all duration-200 ease-in cursor-pointer"
      >
        {show ? <FaEyeSlash className="w-3.5 h-3.5" /> : <FaEye className="w-3.5 h-3.5" />}
      </button>
    </div>
    {error && <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p>}
  </div>
);

export default EditProfile;