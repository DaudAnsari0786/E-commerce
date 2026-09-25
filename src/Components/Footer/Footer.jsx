import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn,
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane,
  FaCreditCard, FaTruck, FaUndoAlt, FaShieldAlt, FaChevronRight,
} from 'react-icons/fa';
import {
  SiVisa, SiMastercard, SiAmericanexpress,
  SiPaypal, SiApplepay, SiGooglepay,
} from 'react-icons/si';
import { motion } from 'framer-motion';

/* ---------- Data ---------- */
const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/products/arrivals' },
      { label: 'Men', to: '/products/mens' },
      { label: 'Women', to: '/products/womens' },
      { label: 'Kids', to: '/products/kids' },
      { label: 'Girls', to: '/products/girls' },
      { label: 'Sale', to: '/products/sale' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Sustainability', to: '/sustainability' },
      { label: 'Blog', to: '/blog' },
      { label: 'Affiliates', to: '/affiliates' },
      { label: 'Store Locator', to: '/stores' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Shipping Info', to: '/shipping' },
      { label: 'Returns', to: '/returns' },
      { label: 'Size Guide', to: '/size-guide' },
      { label: 'Track Order', to: '/track-order' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
      { label: 'My Account', to: '/account' },
    ],
  },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
  { label: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
];

const trustBadges = [
  { icon: FaTruck, title: 'Free Shipping', subtitle: 'On orders over ₹ 749' },
  { icon: FaUndoAlt, title: '30-Day Returns', subtitle: 'Hassle-free refunds' },
  { icon: FaShieldAlt, title: 'Secure Payment', subtitle: '256-bit SSL encryption' },
  { icon: FaCreditCard, title: 'Easy Checkout', subtitle: 'All major cards accepted' },
];

const paymentMethods = [
  { label: 'Visa', icon: SiVisa, color: 'text-[#1A1F71]' },
  { label: 'Mastercard', icon: SiMastercard, color: 'text-[#EB001B]' },
  { label: 'Amex', icon: SiAmericanexpress, color: 'text-[#2E77BC]' },
  { label: 'PayPal', icon: SiPaypal, color: 'text-[#00457C]' },
  { label: 'Apple Pay', icon: SiApplepay, color: 'text-black' },
  { label: 'Google Pay', icon: SiGooglepay, color: 'text-[#4285F4]' },
];

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    label: 'Vill. Rukmalpur Post Meerpur, Atrauliya-Azamgarh, UP 223223',
    href: 'https://maps.google.com/?q=Vill.+Rukmalpur+Post+Meerpur,+Atrauliya-Azamgarh,+UP+223223',
  },
  {
    icon: FaPhoneAlt,
    label: '+91 (902) 635-0956',
    href: 'tel:+919026350956',
  },
  {
    icon: FaEnvelope,
    label: 'daudansari6472@gmail.com',
    href: 'mailto:daudansari6472@gmail.com',
  },
];

/* ---------- Shared animation config ---------- */
const hoverTransition = { duration: 0.3, ease: 'easeIn' };

/* ---------- Component ---------- */
const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="mt-auto w-full bg-gray-900 text-gray-300">
      {/* Trust badges */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="container mx-auto grid grid-cols-2 gap-3 px-3 py-4 sm:px-6 lg:grid-cols-4">
          {trustBadges.map(({ icon: Icon, title, subtitle }) => (
            <motion.div
              key={title}
              whileHover={{ y: -3 }}
              transition={hoverTransition}
              className="flex cursor-pointer items-center gap-2"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-900/40 text-blue-400">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{title}</p>
                <p className="truncate text-xs text-gray-400">{subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-3 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Brand + newsletter + contact */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="mb-3 flex cursor-pointer items-center gap-2 transition-opacity duration-300 ease-in hover:opacity-80"
            >
              <span className="rounded bg-blue-600 px-3 py-1 text-xl font-bold text-white">
                A
              </span>
              <span className="text-lg font-semibold tracking-tighter">
                <span className="font-bold text-blue-400">Style</span>
                <span className="text-white">Craft</span>
              </span>
            </Link>

            <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-400">
              Timeless fashion, thoughtfully crafted. Discover pieces that move with you,
              made from sustainable materials and designed to last.
            </p>

            {/* Newsletter */}
            <div className="mb-5">
              <p className="mb-1.5 text-sm font-semibold text-white">Join our newsletter</p>
              <p className="mb-2 text-xs text-gray-400">
                Get 10% off your first order plus early access to new drops.
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md items-stretch gap-2">
                <div className="relative flex-1">
                  <FaEnvelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full cursor-text rounded-md border border-gray-700 bg-gray-800 py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 transition duration-300 ease-in focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={hoverTransition}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-300 ease-in hover:bg-blue-500"
                >
                  <FaPaperPlane className="h-4 w-4" />
                  Subscribe
                </motion.button>
              </form>

              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={hoverTransition}
                  className="mt-1.5 text-xs font-medium text-green-400"
                >
                  ✓ Thanks for subscribing! Check your inbox.
                </motion.p>
              )}
            </div>

            {/* Contact info — driven by contactInfo array */}
            <ul className="space-y-1.5 text-sm text-gray-400">
              {contactInfo.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex cursor-pointer items-center gap-2 rounded transition-colors duration-300 ease-in hover:text-blue-400"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-300 ease-in group-hover:text-blue-400" />
                    <span className="transition-transform duration-300 ease-in group-hover:translate-x-1">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-3 px-3 text-sm font-semibold uppercase tracking-wider text-white">
                  {col.title}
                </h4>
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="group inline-flex cursor-pointer items-center gap-1 text-sm text-gray-400 transition-colors duration-300 ease-in hover:text-blue-400"
                      >
                        <FaChevronRight className="h-3 w-3 -ml-1 opacity-0 transition-all duration-300 ease-in group-hover:ml-0 group-hover:opacity-100" />
                        <span className="transition-transform duration-300 ease-in group-hover:translate-x-0.5">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social + payment */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-gray-800 pt-6 lg:flex-row">
          {/* Social */}
          <div className="flex items-center gap-2">
            <span className="mr-1 text-sm font-medium text-gray-400">Follow us:</span>
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={hoverTransition}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-gray-400 transition-colors duration-300 ease-in hover:border-blue-500 hover:bg-blue-900/40 hover:text-blue-400"
              >
                <Icon className="h-3.5 w-3.5" />
              </motion.a>
            ))}
          </div>

          {/* Payment method — label + icons in one clean row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-medium text-gray-400">Payment Method:</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {paymentMethods.map(({ label, icon: Icon, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  transition={hoverTransition}
                  title={label}
                  aria-label={label}
                  className="inline-flex h-7 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in hover:border-blue-500 hover:shadow-md"
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 bg-gray-950 px-7">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-3 py-6 text-xs text-gray-500 sm:flex-row sm:px-6">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-gray-300">StyleCraft</span>. All rights
            reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/privacy"
              className="cursor-pointer transition-colors duration-300 ease-in hover:text-blue-400"
            >
              Privacy
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              to="/terms"
              className="cursor-pointer transition-colors duration-300 ease-in hover:text-blue-400"
            >
              Terms
            </Link>
            <span className="text-gray-700">•</span>
            <Link
              to="/cookies"
              className="cursor-pointer transition-colors duration-300 ease-in hover:text-blue-400"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;