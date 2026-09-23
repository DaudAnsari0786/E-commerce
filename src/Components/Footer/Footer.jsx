import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaCcAmazonPay,
} from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone, MdArrowUpward } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    setTimeout(scrollToTop, 50);
  };

  // ✅ Log subscribed email here
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      console.warn('⚠️ Subscribe attempted with empty email');
      return;
    }

    console.log('📧 Subscribed Email:', email);

    setSubscribed(true);
    setEmail('');

    setTimeout(() => setSubscribed(false), 3000);
  };

  // --- Social ---
  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF />, url: 'https://facebook.com' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com' },
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://x.com' },
    { name: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com' },
    { name: 'TikTok', icon: <FaTiktok />, url: 'https://tiktok.com' },
  ];

  // --- Contact ---
  const contactInfo = [
    {
      icon: <MdEmail />,
      label: 'onlinestore@stylecraft.com',
      href: 'mailto:onlinestore@stylecraft.com',
    },
    { icon: <MdPhone />, label: '+91 (902) 635-0956', href: 'tel:+919026350956' },
    {
      icon: <MdLocationOn />,
      label: 'Vill. Rukmalpur Post Meerpur, Atrauliya Azamgarh, UP 223223',
      href: null,
    },
  ];

  // --- Link columns ---
  const shopLinks = [
    { label: 'Mens', href: '/shop/mens' },
    { label: 'Womens', href: '/shop/womens' },
    { label: 'Girls', href: '/shop/girls' },
    { label: 'Kids', href: '/shop/kids' },
    { label: 'New Arrivals', href: '/shop/arrivals' },
    { label: 'Sale', href: '/shop/sale' },
  ];

  const helpLinks = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Track Order', href: '/track-order' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Store Locator', href: '/stores' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Affiliates', href: '/affiliates' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  const trustBadges = [
    { icon: '🚚', title: 'Free Shipping', desc: 'Orders over ₹999' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day policy' },
    { icon: '🔒', title: 'Secure Payment', desc: '100% protected' },
    { icon: '💬', title: '24/7 Support', desc: 'Always here' },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: <FaCcVisa /> },
    { name: 'Mastercard', icon: <FaCcMastercard /> },
    { name: 'PayPal', icon: <FaCcPaypal /> },
    { name: 'Apple Pay', icon: <FaCcApplePay /> },
    { name: 'Amazon Pay', icon: <FaCcAmazonPay /> },
  ];

  const isActive = (path) => location.pathname === path;

  // Reusable link column
  const LinkColumn = ({ title, links }) => (
    <div>
      <h4 className="relative inline-block text-white font-semibold text-sm uppercase tracking-wider mb-3">
        {title}
        <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-purple-500 rounded-full" />
      </h4>
      <ul className="space-y-1.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              to={href}
              onClick={handleLinkClick}
              className={`inline-flex items-center gap-2 group text-sm transition-colors duration-300 ${
                isActive(href)
                  ? 'text-purple-400 font-medium'
                  : 'text-gray-400 hover:text-purple-400'
              }`}
            >
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="relative bg-gray-950 text-gray-300">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* ===== NEWSLETTER ===== */}
      <div className="relative border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5">
                Join the <span className="text-purple-400">StyleCraft</span> Club
              </h3>
              <p className="text-xs text-gray-400">
                Get 10% off your first order + early access to new drops & sales.
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-2 text-sm bg-gray-800 border border-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 transition"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-full transition shadow-lg shadow-purple-500/30 whitespace-nowrap"
              >
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* ===== MAIN ===== */}
      <div className="relative max-w-7xl mx-auto pt-8 pb-4 px-4 md:px-8 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2 mb-3 w-fit"
            >
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <span className="text-purple-400 font-bold text-lg">A</span>
              </div>
              <h3 className="font-bold text-xl tracking-tight">
                <span className="text-purple-400">Style</span>
                <span className="text-white">Craft</span>
              </h3>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-3 max-w-md pr-20">
              StyleCraft — Your destination for the latest fashion trends,
              delivering quality clothing for the whole family with a modern,
              seamless shopping experience.
            </p>

            {/* Contact Info */}
            <ul className="space-y-1.5 text-sm mb-3">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="text-purple-400 text-base shrink-0">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors break-all"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-gray-400 leading-relaxed">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 bg-gray-800/50"
                  aria-label={item.name}
                >
                  <span className="text-xs">{item.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <LinkColumn title="Shop" links={shopLinks} />
          <LinkColumn title="Customer Service" links={helpLinks} />
          <LinkColumn title="Company" links={companyLinks} />
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-gray-800">
          {trustBadges.map((item) => (
            <div key={item.title} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-base shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p className="text-center lg:text-left">
            © {currentYear}{' '}
            <span className="text-purple-400 font-medium">StyleCraft</span>. All
            rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={handleLinkClick}
                className={`transition-colors ${
                  isActive(link.href)
                    ? 'text-purple-400 font-medium'
                    : 'hover:text-purple-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {paymentMethods.map((pm) => (
              <div
                key={pm.name}
                title={pm.name}
                className="w-8 h-6 flex items-center justify-center rounded bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition text-base text-gray-400 hover:text-white"
              >
                {pm.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="fixed cursor-pointer bottom-5 right-5 z-50 w-10 h-10 bg-purple-500 text-white rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center transition-all duration-300 hover:shadow-purple-500/50 hover:bg-purple-400 group"
        aria-label="Back to top"
      >
        <MdArrowUpward className="text-lg group-hover:-translate-y-0.5 transition-transform duration-300" />
      </motion.button>
    </footer>
  );
};

export default Footer;