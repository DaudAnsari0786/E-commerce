import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaApple,
  FaArrowRight,
  FaCheckCircle,
} from 'react-icons/fa';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 6) next.password = 'At least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call — replace with your real auth endpoint
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 ">
      {/* ---------- Left: Brand / illustration panel ---------- */}
      <div className="hidden  lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500">
        {/* Decorative blurred blobs */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="rounded bg-white/20 backdrop-blur px-3 py-1 text-xl font-bold">
              A
            </span>
            <span className="text-lg font-semibold tracking-tighter">
              <span className="font-bold text-white">Style</span>
              <span className="text-white/90">Craft</span>
            </span>
          </Link>

          {/* Headline */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-md"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl xl:text-5xl font-bold leading-tight mb-4"
            >
              Welcome back to timeless fashion.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-base text-white/80 leading-relaxed"
            >
              Sign in to access your wishlist, track orders, and unlock member-only
              drops before anyone else.
            </motion.p>

            <motion.ul variants={stagger} className="mt-8 space-y-3">
              {[
                'Early access to new collections',
                'Free shipping on every order',
                'Exclusive member discounts',
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-sm text-white/90"
                >
                  <FaCheckCircle className="h-4 w-4 text-white/80 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Bottom testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4 text-sm"
          >
            <p className="italic text-white/90 leading-relaxed">
              "StyleCraft is my go-to. Fast checkout, great quality, and the rewards are
              actually worth it."
            </p>
            <p className="mt-2 text-xs font-semibold text-white/80">— Sarah M., Member since 2023</p>
          </motion.div>
        </div>
      </div>

      {/* ---------- Right: Login form ---------- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden mb-8 flex items-center gap-2">
            <span className="rounded bg-indigo-600 px-3 py-1 text-xl font-bold text-white">
              A
            </span>
            <span className="text-lg font-semibold tracking-tighter">
              <span className="font-bold text-indigo-600">Style</span>
              <span className="text-gray-900">Craft</span>
            </span>
          </Link>

          {/* Heading */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 transition-colors duration-300 ease-in hover:text-indigo-800"
              >
                Create one
              </Link>
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <motion.div variants={fadeInUp}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email address
              </label>
              <div className="relative group">
                <FaEnvelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-300 ease-in group-focus-within:text-indigo-600" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.email}</p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-indigo-600 transition-colors duration-300 ease-in hover:text-indigo-800"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <FaLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-300 ease-in group-focus-within:text-indigo-600" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-white py-3 pl-10 pr-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 ease-in hover:text-indigo-600 cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.password}</p>
              )}
            </motion.div>

            {/* Remember me */}
            <motion.div variants={fadeInUp} className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={fadeInUp}
              type="submit"
              disabled={loading || success}
              whileHover={{ scale: loading || success ? 1 : 1.02 }}
              whileTap={{ scale: loading || success ? 1 : 0.98 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              className={`group w-full inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-all duration-300 ease-in ${
                success
                  ? 'bg-green-600'
                  : loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-md hover:shadow-lg'
              }`}
            >
              {success ? (
                <>
                  <FaCheckCircle className="h-4 w-4" />
                  Signed in! Redirecting…
                </>
              ) : loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-in group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            variants={fadeInUp}
            className="my-6 flex items-center gap-3 text-xs text-gray-400"
          >
            <span className="h-px flex-1 bg-gray-200" />
            OR CONTINUE WITH
            <span className="h-px flex-1 bg-gray-200" />
          </motion.div>

          {/* Social buttons */}
          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3">
            {[
              { icon: FaGoogle, label: 'Google', hover: 'hover:border-red-300 hover:text-red-500' },
              { icon: FaFacebookF, label: 'Facebook', hover: 'hover:border-blue-300 hover:text-blue-600' },
              { icon: FaApple, label: 'Apple', hover: 'hover:border-gray-400 hover:text-gray-900' },
            ].map(({ icon: Icon, label, hover }) => (
              <motion.button
                key={label}
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: 'easeIn' }}
                aria-label={`Continue with ${label}`}
                className={`flex items-center justify-center rounded-lg border border-gray-300 bg-white py-3 text-gray-600 transition-colors duration-300 ease-in cursor-pointer ${hover}`}
              >
                <Icon className="h-4 w-4" />
              </motion.button>
            ))}
          </motion.div>

          {/* Terms */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-center text-xs text-gray-400 leading-relaxed"
          >
            By signing in, you agree to our{' '}
            <Link
              to="/terms"
              className="font-medium text-gray-500 underline underline-offset-2 transition-colors duration-300 ease-in hover:text-indigo-600"
            >
              Terms
            </Link>{' '}
            and{' '}
            <Link
              to="/privacy"
              className="font-medium text-gray-500 underline underline-offset-2 transition-colors duration-300 ease-in hover:text-indigo-600"
            >
              Privacy Policy
            </Link>
            .
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;