import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaCommentDots,
  FaPaperPlane,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaChevronDown,
  FaInfoCircle,
  FaWhatsapp,
  FaHeadset,
  FaHandshake,
  FaLightbulb,
} from 'react-icons/fa';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/* ---------- Data ---------- */
const contactCards = [
  {
    icon: FaPhoneAlt,
    label: 'Call us',
    value: '+91 (902) 635-0956',
    sub: 'Mon–Sat, 9am – 8pm IST',
    href: 'tel:+919026350956',
    theme: 'indigo',
  },
  {
    icon: FaEnvelope,
    label: 'Email us',
    value: 'hello@stylecraft.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:hello@stylecraft.com',
    theme: 'emerald',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+91 90263 50956',
    sub: 'Quick answers, faster',
    href: 'https://wa.me/919026350956',
    theme: 'green',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Visit us',
    value: 'Vill. Rukmalpur Post Meerpur',
    sub: 'Atrauliya-Azamgarh, UP 223223',
    href: 'https://maps.google.com/?q=Vill.+Rukmalpur+Post+Meerpur,+Atrauliya-Azamgarh,+UP+223223',
    theme: 'rose',
  },
];

const themeStyles = {
  indigo: { tile: 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600', tileHover: 'group-hover:from-indigo-500 group-hover:to-indigo-600 group-hover:text-white', text: 'group-hover:text-indigo-700', chevron: 'group-hover:text-indigo-600' },
  emerald: { tile: 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600', tileHover: 'group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:text-white', text: 'group-hover:text-emerald-700', chevron: 'group-hover:text-emerald-600' },
  green: { tile: 'bg-gradient-to-br from-green-50 to-green-100 text-green-600', tileHover: 'group-hover:from-green-500 group-hover:to-green-600 group-hover:text-white', text: 'group-hover:text-green-700', chevron: 'group-hover:text-green-600' },
  rose: { tile: 'bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600', tileHover: 'group-hover:from-rose-500 group-hover:to-rose-600 group-hover:text-white', text: 'group-hover:text-rose-700', chevron: 'group-hover:text-rose-600' },
};

const enquiryTypes = [
  { value: 'order', label: 'Order-related' },
  { value: 'product', label: 'Product enquiry' },
  { value: 'return', label: 'Return / Refund' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Something else' },
];

const socialLinks = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com' },
];

const helpTopics = [
  { icon: FaHeadset, label: 'Customer support', desc: 'Questions about an order', href: '/faq' },
  { icon: FaHandshake, label: 'Partnerships', desc: 'Work with StyleCraft', href: '/affiliates' },
  { icon: FaLightbulb, label: 'Feedback', desc: 'Share an idea with us', href: '/contact' },
];

/* ============================== Component ============================== */
const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'order',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.message.trim()) next.message = 'Please write a message';
    else if (form.message.trim().length < 10) next.message = 'Message is too short';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      console.log('✉️ Contact form submitted:', form);
      setSubmitting(false);
      setForm({ name: '', email: '', subject: 'order', message: '' });
      setFeedback('Thanks! We received your message and will reply within 24 hours.');
      setTimeout(() => setFeedback(null), 4000);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40">
      {/* ---------- Hero header ---------- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              <FaCommentDots className="w-3 h-3" />
              We're here to help
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Get in touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed"
          >
            Questions about an order, product advice, or just want to say hi?
            We love hearing from you and typically reply within 24 hours.
          </motion.p>
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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-4 sm:-mt-6">
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

        {/* Contact quick cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {contactCards.map(({ icon: Icon, label, value, sub, href, theme }) => {
            const t = themeStyles[theme] || themeStyles.indigo;
            return (
              <motion.a
                key={label}
                variants={fadeInUp}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-100 p-5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.tile} ${t.tileHover} transition-all duration-200 group-hover:scale-105 group-hover:shadow-md`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className={`text-[11px] font-bold uppercase tracking-wider text-gray-400 ${t.text} transition-colors`}>
                    {label}
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900 mb-1">{value}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Form + Side panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Contact form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-8"
          >
            <motion.section
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FaPaperPlane className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Send us a message</h2>
                  <p className="text-xs text-gray-500">Fill in the form and we'll get back to you</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    icon={FaUser}
                    name="name"
                    label="Your name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    error={errors.name}
                    required
                  />
                  <FormField
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
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    What is this about?
                  </label>
                  <div className="relative group">
                    <FaCommentDots className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-indigo-600" />
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-10 text-sm text-gray-900 transition-all duration-200 hover:border-indigo-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 cursor-pointer"
                    >
                      {enquiryTypes.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative group">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help…"
                      className={`w-full rounded-lg border bg-white py-2.5 px-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 resize-none focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                          : 'border-gray-300 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-200'
                      }`}
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    {errors.message ? (
                      <p className="text-xs font-medium text-rose-500">{errors.message}</p>
                    ) : (
                      <p className="text-xs text-gray-400">
                        The more details, the better we can help.
                      </p>
                    )}
                    <p className="text-xs text-gray-400">{form.message.length}/500</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{
                      scale: 1.02,
                      y: -1,
                      boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 ease-in cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <span className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        Send message
                      </>
                    )}
                  </motion.button>

                  <p className="sm:ml-auto sm:self-center text-xs text-gray-400 flex items-center gap-1.5">
                    <FaInfoCircle className="w-3 h-3" />
                    We never share your details
                  </p>
                </div>
              </form>
            </motion.section>

            {/* Map placeholder */}
            <motion.section
              variants={fadeInUp}
              className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-white">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Find us</h2>
                  <p className="text-xs text-gray-500">Our workshop & studio</p>
                </div>
              </div>

              <div className="relative h-64 bg-gradient-to-br from-indigo-100 via-purple-50 to-rose-100">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                    className="relative"
                  >
                    <span className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/40">
                      <FaMapMarkerAlt className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs rounded-xl bg-white/95 backdrop-blur border border-gray-100 shadow-lg p-3.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    StyleCraft Studio
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    Vill. Rukmalpur Post Meerpur
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Atrauliya-Azamgarh, UP 223223
                  </p>
                </div>
              </div>
            </motion.section>
          </motion.div>

          {/* Right: Side panel */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-4 space-y-5"
          >
            {/* Support hours */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <FaClock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Support hours</h3>
                  <p className="text-xs text-gray-500">We're online when you need us</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { day: 'Mon – Fri', hours: '9:00 AM – 8:00 PM' },
                  { day: 'Saturday', hours: '10:00 AM – 6:00 PM' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map(({ day, hours }) => (
                  <li key={day} className="flex items-center justify-between">
                    <span className="text-gray-600">{day}</span>
                    <span
                      className={`font-semibold ${
                        hours === 'Closed' ? 'text-rose-500' : 'text-gray-900'
                      }`}
                    >
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Help topics */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="px-5 pt-5 pb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  How can we help?
                </h3>
              </div>
              <div className="px-2 pb-2">
                {helpTopics.map(({ icon: Icon, label, desc, href }) => (
                  <Link
                    key={label}
                    to={href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-indigo-50 hover:translate-x-0.5 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:scale-105">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {label}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <h3 className="text-sm font-bold text-gray-900 mb-1">Follow StyleCraft</h3>
              <p className="text-xs text-gray-500 mb-4">Get style tips & new drops first</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

/* ---------- Form field with icon ---------- */
const FormField = ({
  icon: Icon,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required,
}) => (
  <div>
    <label htmlFor={name} className="block text-xs font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative group">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-indigo-600" />
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-gray-300 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-200'
        }`}
      />
    </div>
    {error && <p className="mt-1.5 text-xs font-medium text-rose-500">{error}</p>}
  </div>
);

export default Contact;