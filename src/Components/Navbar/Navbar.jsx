import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Menu as MenuIcon,
  X,
  Home,
  Info,
  Star,
  ShoppingBag,
  BookOpen,
  Mail,
  Shirt,
  Sparkles,
  Tag,
  Baby,
  Gem,
  LayoutDashboard,
  BarChart3,
  Settings,
  Search,
  ShoppingCart,
  Heart,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animation Variants ---
const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const logoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
};

const dropdownVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, delay: i * 0.03, ease: 'easeOut' },
  }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
};

// --- Data (Clothing Shop) ---
const features = [
  { title: 'New Arrivals', description: 'Fresh drops every week', href: '/shop/Arrivals', icon: Sparkles },
  { title: 'Men', description: 'Shirts, tees & more', href: '/shop/mens', icon: Shirt },
  { title: 'Women', description: 'Dresses, tops & more', href: '/shop/womens', icon: Gem },
  { title: 'Kids', description: 'Playful styles for little ones', href: '/shop/kids', icon: Baby },
  { title: 'Girls', description: 'Cute looks for girls', href: '/shop/girls', icon: Sparkles },
  { title: 'Sale', description: 'Up to 50% off select items', href: '/shop/sale', icon: Tag },
];

// Home, About — before Shop
const desktopLinksBefore = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
];

// Products, Resources, Contact — after Shop
const desktopLinksAfter = [
  { label: 'Products', href: '/shop', icon: ShoppingBag },
  { label: 'Resources', href: '/resources', icon: BookOpen },
  { label: 'Contact', href: '/contact', icon: Mail },
];

// Mobile-only extra links
const mobileLinks = [
  { label: 'Templates', href: '/templates', icon: LayoutDashboard },
  { label: 'Blog', href: '/blog', icon: BarChart3 },
  { label: 'Pricing', href: '/pricing', icon: Settings },
];

// Combined for mobile footer counter
const allMobileLinks = [...desktopLinksBefore, ...desktopLinksAfter, ...mobileLinks];

const Navbar = ({ className = '' }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Desktop search state + ref
  const [desktopSearch, setDesktopSearch] = useState('');
  const desktopSearchRef = useRef(null);

  // Mobile search state + ref
  const [mobileSearch, setMobileSearch] = useState('');
  const mobileSearchRef = useRef(null);

  // Ref for the Shop dropdown wrapper (to detect outside clicks)
  const featuresRef = useRef(null);

  const toggleFeatures = () => setIsFeaturesOpen((prev) => !prev);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setIsMobileFeaturesOpen(false);
  };

  const clearDesktopSearch = () => {
    setDesktopSearch('');
    desktopSearchRef.current?.focus();
  };

  const clearMobileSearch = () => {
    setMobileSearch('');
    mobileSearchRef.current?.focus();
  };

  // Close the Shop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target)) {
        setIsFeaturesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper for active link styling
  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-gray-100 text-blue-700' : 'hover:bg-gray-50'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-3 font-medium transition-colors ${
      isActive ? 'bg-gray-100 text-blue-700' : 'hover:bg-gray-50'
    }`;

  return (
    <motion.header
      className={`relative bg-black/20 w-full py-4 z-50 ${className}`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div variants={logoVariants} initial="hidden" animate="visible">
            <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <span className="px-3 py-1 bg-blue-700 text-white text-2xl font-bold rounded">
                A
              </span>
              <span className="text-lg font-semibold tracking-tighter">StyleCraft</span>
            </Link>
          </motion.div>

          {/* ==================== DESKTOP NAV ==================== */}
          <div className="hidden items-center gap-1 lg:flex">
            {/* Home, About */}
            {desktopLinksBefore.map((item, i) => (
              <motion.div
                key={item.label}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink to={item.href} end={item.href === '/'} className={linkClass}>
                  {item.label}
                </NavLink>
              </motion.div>
            ))}

            {/* Shop Dropdown */}
            <div className="relative" ref={featuresRef}>
              <motion.button
                type="button"
                onClick={toggleFeatures}
                className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={isFeaturesOpen}
                aria-haspopup="true"
              >
                {/* Star hidden on lg and up (laptop/desktop) */}
                <Star className="h-4 w-4 text-gray-500 lg:hidden" />
                Shop
                <motion.svg
                  className="h-3 w-3"
                  animate={{ rotate: isFeaturesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {isFeaturesOpen && (
                  <motion.div
                    className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="grid w-[600px] grid-cols-2 gap-1 rounded-lg border bg-white p-3 shadow-lg">
                      {features.map((feature, index) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <motion.div
                            key={feature.title}
                            variants={featureItemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                            whileHover={{ x: 4, backgroundColor: 'rgba(0,0,0,0.04)' }}
                          >
                            <Link
                              to={feature.href}
                              className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-gray-50"
                              onClick={() => setIsFeaturesOpen(false)}
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                <FeatureIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="mb-1 font-semibold text-gray-900">{feature.title}</p>
                                <p className="text-sm text-gray-500">{feature.description}</p>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products, Resources, Contact */}
            {desktopLinksAfter.map((item, i) => (
              <motion.div
                key={item.label}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                custom={i + 3}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink to={item.href} className={linkClass}>
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* ==================== DESKTOP SEARCH ==================== */}
          <motion.div
            className="hidden lg:flex items-center"
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                ref={desktopSearchRef}
                type="text"
                value={desktopSearch}
                onChange={(e) => setDesktopSearch(e.target.value)}
                placeholder="Search clothes..."
                className="w-56 xl:w-64 bg-gray-100 pl-9 pr-9 py-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
              <AnimatePresence>
                {desktopSearch.length > 0 && (
                  <motion.button
                    type="button"
                    onClick={clearDesktopSearch}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-5 w-5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ==================== DESKTOP WISHLIST + CART + AUTH ==================== */}
          <motion.div
            className="hidden items-center gap-3 lg:flex"
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            custom={6}
          >
            {/* Wishlist */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/wishlist"
                className="relative inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-700 transition-colors hover:bg-gray-50"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>
            </motion.div>

            {/* Sign in */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                Sign in
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
              >
                <ShoppingCart className="h-4 w-4" />
                Cart
                <span className="bg-white text-blue-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ==================== MOBILE ACTIONS ==================== */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Search Toggle */}
            <motion.button
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Search"
            >
              {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </motion.button>

            {/* Mobile Wishlist */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/wishlist"
                className="relative inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Link>
            </motion.div>

            {/* Mobile Cart */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2"
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileOpen ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* ==================== MOBILE SEARCH BAR ==================== */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  ref={mobileSearchRef}
                  type="text"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="Search clothes..."
                  className="w-full bg-gray-100 pl-9 pr-9 py-2.5 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  autoFocus
                />
                <AnimatePresence>
                  {mobileSearch.length > 0 && (
                    <motion.button
                      type="button"
                      onClick={clearMobileSearch}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-5 w-5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================== MOBILE MENU ==================== */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mt-4 flex flex-col gap-1 border-t pt-4">
                {/* Home, About */}
                {desktopLinksBefore.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      whileHover={{ x: 4 }}
                    >
                      <NavLink
                        to={item.href}
                        end={item.href === '/'}
                        className={mobileLinkClass}
                        onClick={closeMobileMenu}
                      >
                        <Icon className="h-4 w-4 text-gray-500" />
                        {item.label}
                      </NavLink>
                    </motion.div>
                  );
                })}

                {/* Shop Accordion */}
                <div>
                  <motion.button
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-gray-50"
                    onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={desktopLinksBefore.length}
                  >
                    <span className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-gray-500" />
                      Shop
                    </span>
                    <motion.svg
                      className="h-4 w-4"
                      animate={{ rotate: isMobileFeaturesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isMobileFeaturesOpen && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="grid gap-1 p-2">
                          {features.map((feature, index) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <motion.div
                                key={feature.title}
                                variants={featureItemVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                                whileHover={{ x: 4 }}
                              >
                                <Link
                                  to={feature.href}
                                  className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-gray-50"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                    <FeatureIcon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="mb-1 font-semibold text-gray-900">
                                      {feature.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {feature.description}
                                    </p>
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Products, Resources, Contact, Templates, Blog, Pricing */}
                {[...desktopLinksAfter, ...mobileLinks].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={desktopLinksBefore.length + 1 + i}
                      whileHover={{ x: 4 }}
                    >
                      <NavLink
                        to={item.href}
                        className={mobileLinkClass}
                        onClick={closeMobileMenu}
                      >
                        <Icon className="h-4 w-4 text-gray-500" />
                        {item.label}
                      </NavLink>
                    </motion.div>
                  );
                })}

                {/* Mobile Auth Buttons */}
                <motion.div
                  className="mt-3 flex flex-col gap-3 border-t pt-4"
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={allMobileLinks.length + 2}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/signin"
                      className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      onClick={closeMobileMenu}
                    >
                      Sign in
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/signup"
                      className="flex w-full items-center justify-center rounded-md bg-blue-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800"
                      onClick={closeMobileMenu}
                    >
                      Start for free
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;