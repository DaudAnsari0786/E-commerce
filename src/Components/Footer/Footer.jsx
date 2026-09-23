import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  console.log('🔄 Footer rendered | subscribed:', subscribed, '| email:', email);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const socialHover = {
    scale: 1.12,
    y: -2,
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  };

  const socialTap = { scale: 0.9 };

  // Data
  const shopLinks = [
    { name: 'Mens', href: '/categories/mens' },
    { name: 'Womens', href: '/categories/womens' },
    { name: 'Girls', href: '/categories/girls' },
    { name: 'Kids', href: '/categories/kids' },
    { name: 'New Arrivals', href: '/shop' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Store Locator', href: '/stores' },
  ];

  const helpLinks = [
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track' },
  ];

  const socials = [
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'PayPal', icon: '💰' },
    { name: 'Apple Pay', icon: '' },
    { name: 'Google Pay', icon: '🅶' },
  ];

  // ---------- Handlers with console logs ----------
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    console.log('📧 Email input changed:', value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('🖱️ Subscribe button clicked');
    console.log('📧 Email submitted:', email);

    if (email) {
      setSubscribed(true);
      console.log('✅ Subscription successful for:', email);

      setEmail('');
      console.log('🧹 Email field cleared');

      setTimeout(() => {
        setSubscribed(false);
        console.log('⏰ Subscription state reset to false (after 3s)');
      }, 3000);
    } else {
      console.warn('⚠️ Subscribe attempted with empty email');
    }
  };

  const handleSocialClick = (name, href) => {
    console.log(`🔗 Social link clicked: ${name} → ${href}`);
  };

  const handleLinkClick = (section, name, href) => {
    console.log(`🧭 [${section}] Link clicked: ${name} → ${href}`);
  };

  return (
    <footer className="bg-gray-950 text-gray-400 relative overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      {/* Newsletter strip */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative border-b border-gray-800/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                Join the StyleCraft Club
              </h3>
              <p className="text-sm sm:text-xs text-gray-400">
                Get 10% off your first order + early access to sales.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full lg:w-auto flex-col sm:flex-row gap-2 max-w-md lg:max-w-none"
            >
              <input
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-2.5 sm:py-2 text-base sm:text-sm bg-gray-900 border border-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 transition"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-sm font-semibold rounded-full transition shadow-lg shadow-indigo-600/30 whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Main footer content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link
              to="/"
              onClick={() => console.log('🏠 Logo clicked → home')}
              className="inline-block text-2xl sm:text-2xl font-bold text-white mb-2"
            >
              Style<span className="text-indigo-500">Craft</span>
            </Link>
            <p className="text-base sm:text-sm text-gray-400 mb-4 max-w-sm leading-relaxed">
              Your destination for the latest fashion trends. Quality clothing for men, women, girls, and kids — designed to make you feel confident every day.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(social.name, social.href)}
                  whileHover={socialHover}
                  whileTap={socialTap}
                  className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-900 text-gray-400 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <span className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Shop links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-base sm:text-sm font-bold mb-3">Shop</h4>
            <ul className="space-y-2 sm:space-y-1.5">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick('Shop', link.name, link.href)}
                    className="text-base sm:text-sm text-gray-400 hover:text-indigo-400 hover:pl-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-base sm:text-sm font-bold mb-3">Company</h4>
            <ul className="space-y-2 sm:space-y-1.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick('Company', link.name, link.href)}
                    className="text-base sm:text-sm text-gray-400 hover:text-indigo-400 hover:pl-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Help links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white text-base sm:text-sm font-bold mb-3">Help</h4>
            <ul className="space-y-2 sm:space-y-1.5">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick('Help', link.name, link.href)}
                    className="text-base sm:text-sm text-gray-400 hover:text-indigo-400 hover:pl-1 transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact info strip */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 sm:mt-8 pt-6 border-t border-gray-800/60"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-900 text-indigo-400 text-base sm:text-sm shrink-0">
              📍
            </div>
            <div>
              <div className="text-xs sm:text-[10px] text-gray-500 uppercase tracking-wide">Visit us</div>
              <div className="text-base sm:text-xs text-gray-300">123 Fashion Ave, NYC</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-900 text-indigo-400 text-base sm:text-sm shrink-0">
              📞
            </div>
            <div>
              <div className="text-xs sm:text-[10px] text-gray-500 uppercase tracking-wide">Call us</div>
              <div className="text-base sm:text-xs text-gray-300">+1 (555) 123-4567</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-900 text-indigo-400 text-base sm:text-sm shrink-0">
              ✉️
            </div>
            <div>
              <div className="text-xs sm:text-[10px] text-gray-500 uppercase tracking-wide">Email us</div>
              <div className="text-base sm:text-xs text-gray-300">hello@stylecraft.com</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative border-t border-gray-800/60 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Copyright */}
            <p className="text-sm sm:text-[11px] text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()} StyleCraft. All rights reserved.
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:text-[11px]">
              <Link
                to="/privacy"
                onClick={() => console.log('📜 Legal link clicked: Privacy Policy')}
                className="text-gray-500 hover:text-indigo-400 transition"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-700">•</span>
              <Link
                to="/terms"
                onClick={() => console.log('📜 Legal link clicked: Terms of Service')}
                className="text-gray-500 hover:text-indigo-400 transition"
              >
                Terms of Service
              </Link>
              <span className="text-gray-700">•</span>
              <Link
                to="/cookies"
                onClick={() => console.log('📜 Legal link clicked: Cookies')}
                className="text-gray-500 hover:text-indigo-400 transition"
              >
                Cookies
              </Link>
            </div>

            {/* Payment icons */}
            <div className="flex items-center gap-1.5">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.name}
                  title={pm.name}
                  className="w-9 h-7 sm:w-7 sm:h-5 flex items-center justify-center rounded bg-gray-900 text-sm sm:text-[10px] border border-gray-800 hover:border-indigo-500/50 transition"
                >
                  {pm.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;