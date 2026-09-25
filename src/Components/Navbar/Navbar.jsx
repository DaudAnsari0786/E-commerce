import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu as MenuIcon,
  X,
  Home,
  Info,
  Star,
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
  UserCircle,
  LogIn,
  UserPlus,
  Package,
  MapPin,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ============================== Animation Variants ============================== */
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
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:    { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.15, ease: 'easeIn' } },
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
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
  exit:    { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeInOut' } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.05, ease: 'easeOut' },
  }),
};

/* ============================== Data ============================== */
const PRODUCTS_BASE = '/products';

const productCategories = [
  { title: 'Men',   description: 'Shirts, tees & more',            href: `${PRODUCTS_BASE}/mens`,   icon: Shirt    },
  { title: 'Women', description: 'Dresses, tops & more',           href: `${PRODUCTS_BASE}/womens`, icon: Gem      },
  { title: 'Kids',  description: 'Playful styles for little ones', href: `${PRODUCTS_BASE}/kids`,   icon: Baby     },
  { title: 'Girls', description: 'Cute looks for girls',           href: `${PRODUCTS_BASE}/girls`,  icon: Sparkles },
];

const productHighlights = [
  { title: 'New Arrivals', description: 'Fresh drops every week',     href: `${PRODUCTS_BASE}/arrivals`, icon: Sparkles },
  { title: 'Sale',         description: 'Up to 50% off select items', href: `${PRODUCTS_BASE}/sale`,     icon: Tag      },
];

const desktopLinksBefore = [
  { label: 'Home',  href: '/',      icon: Home },
  { label: 'About', href: '/about', icon: Info },
];

const desktopLinksAfter = [
  { label: 'Resources', href: '/resources', icon: BookOpen },
  { label: 'Contact',   href: '/contact',   icon: Mail     },
];

const mobileLinks = [
  { label: 'Templates', href: '/templates', icon: LayoutDashboard },
  { label: 'Blog',      href: '/blog',      icon: BarChart3       },
  { label: 'Pricing',   href: '/pricing',   icon: Settings        },
];

const allMobileLinks = [...desktopLinksBefore, ...desktopLinksAfter, ...mobileLinks];

// NEW: Profile-specific quick links shown when logged in
const profileMenuLinks = [
  { label: 'My Profile', description: 'View & edit your details', href: '/profile',   icon: UserCircle },
  { label: 'My Orders',  description: 'Track your purchases',     href: '/orders',    icon: Package    },
  { label: 'Addresses',  description: 'Manage delivery addresses', href: '/addresses', icon: MapPin     },
  { label: 'Settings',   description: 'Preferences & security',   href: '/settings',  icon: Settings   },
];

// Account routes — used for active-state sync
const accountRoutes = [
  { key: 'profile',   path: '/profile'   },
  { key: 'orders',    path: '/orders'    },
  { key: 'addresses', path: '/addresses' },
  { key: 'settings',  path: '/settings'  },
  { key: 'login',     path: '/signin'    },
  { key: 'signup',    path: '/signup'    },
  { key: 'wishlist',  path: '/wishlist'  },
  { key: 'cart',      path: '/cart'      },
];

/* ============================== Component ============================== */
const Navbar = ({ className = '', cartCount = 2, wishlistCount = 3 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [activeAccountRow, setActiveAccountRow] = useState(null);

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [desktopSearch, setDesktopSearch] = useState('');
  const desktopSearchRef = useRef(null);

  const [mobileSearch, setMobileSearch] = useState('');
  const mobileSearchRef = useRef(null);

  const shopRef = useRef(null);
  const accountRef = useRef(null);

  const toggleShop = () => setIsShopOpen((prev) => !prev);
  const toggleAccount = () => setIsAccountOpen((prev) => !prev);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    setIsMobileShopOpen(false);
    setIsMobileAccountOpen(false);
  };

  const clearDesktopSearch = () => {
    setDesktopSearch('');
    desktopSearchRef.current?.focus();
  };

  const clearMobileSearch = () => {
    setMobileSearch('');
    mobileSearchRef.current?.focus();
  };

  const handleSearch = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const term = e.target.value.trim();
    if (!term) return;
    navigate(`${PRODUCTS_BASE}?q=${encodeURIComponent(term)}`);
    setDesktopSearch('');
    setMobileSearch('');
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsAccountOpen(false);
    closeMobileMenu();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setIsShopOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    closeMobileMenu();
    setIsShopOpen(false);
    setIsAccountOpen(false);
    setIsSearchOpen(false);

    const match = accountRoutes.find((r) => location.pathname.startsWith(r.path));
    setActiveAccountRow(match ? match.key : null);

    try {
      const raw = localStorage.getItem('user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, [location.pathname]);

  const isProductsSection = location.pathname.startsWith(PRODUCTS_BASE);
  const isAccountSection = activeAccountRow !== null;

  const displayName = user?.name || user?.email?.split('@')[0] || 'Guest';
  const initials = (user?.name || user?.email || 'G')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-3 font-medium transition-colors ${
      isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
    }`;

  const accountRowClass = (key, activeClass, hoverClass = 'hover:bg-gray-50') =>
    `flex items-center gap-3 rounded-md p-3 transition-colors ${
      activeAccountRow === key ? activeClass : hoverClass
    }`;

  const handleAccountClick = (key) => {
    setActiveAccountRow(key);
    setIsAccountOpen(false);
  };

  const handleMobileAccountClick = (key) => {
    setActiveAccountRow(key);
    closeMobileMenu();
  };

  /* ---------- Shared: Profile block (desktop + mobile) ---------- */

  // Profile header (if logged in)
  const profileHeader = user && (
    <>
      <Link
        to="/profile"
        className={accountRowClass('profile', 'bg-indigo-50', 'hover:bg-indigo-50')}
        onClick={() => handleAccountClick('profile')}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-bold">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{displayName}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
      </Link>

      <div className="my-2 border-t border-gray-100" />

      {/* Profile quick links */}
      {profileMenuLinks.map(({ label, description, href, icon: Icon }, i) => (
        <Link
          key={label}
          to={href}
          className={`group flex items-center gap-3 rounded-md p-3 transition-colors ${
            activeAccountRow === label.toLowerCase().replace(/\s+/g, '-')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-blue-50'
          }`}
          onClick={() => handleAccountClick(label.toLowerCase().replace(/\s+/g, '-'))}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 text-gray-600 transition-colors duration-300 group-hover:bg-blue-100 group-hover:text-blue-700">
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{label}</p>
            <p className="text-xs text-gray-500 truncate">{description}</p>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-gray-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-blue-600" />
        </Link>
      ))}

      <div className="my-2 border-t border-gray-100" />
    </>
  );

  // Login + Signup rows (if not logged in)
  const loginRows = !user && (
    <>
      <Link
        to="/signin"
        className={accountRowClass('login', 'bg-blue-50', 'hover:bg-blue-50')}
        onClick={() => handleAccountClick('login')}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-700">
          <LogIn className="h-4 w-4" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">Login</p>
          <p className="text-xs text-gray-500">Sign in to your account</p>
        </div>
      </Link>

      <Link
        to="/signup"
        className={`mt-1 ${accountRowClass('signup', 'bg-indigo-50', 'hover:bg-indigo-50')}`}
        onClick={() => handleAccountClick('signup')}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-50 text-indigo-700">
          <UserPlus className="h-4 w-4" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">Sign up</p>
          <p className="text-xs text-gray-500">Create a new account</p>
        </div>
      </Link>

      <div className="my-2 border-t border-gray-100" />
    </>
  );

  // Sign-out button (if logged in)
  const signOutRow = user && (
    <button
      type="button"
      onClick={handleLogout}
      className="group mt-1 flex w-full items-center gap-3 rounded-md p-3 text-left transition-colors hover:bg-rose-50"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-rose-50 text-rose-600 transition-colors group-hover:bg-rose-100">
        <LogOut className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-rose-600">Sign out</p>
        <p className="text-xs text-gray-500">Log out of your account</p>
      </div>
    </button>
  );

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200 ${className}`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-3 sm:px-6">
        <nav className="flex items-center justify-between gap-3 py-2 sm:py-3">
          {/* Logo */}
          <motion.div variants={logoVariants} initial="hidden" animate="visible">
            <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <span className="px-3 py-1 bg-blue-700 text-white text-xl sm:text-2xl font-bold rounded">
                A
              </span>
              <span className="text-base sm:text-lg font-semibold tracking-tighter">
                <span className="font-bold text-blue-800">Style</span>
                <span className="text-gray-900">Craft</span>
              </span>
            </Link>
          </motion.div>

          {/* ==================== DESKTOP NAV ==================== */}
          <div className="hidden items-center gap-1 lg:flex">
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

            {/* Products Dropdown */}
            <div className="relative" ref={shopRef}>
              <motion.button
                type="button"
                onClick={toggleShop}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isShopOpen || isProductsSection
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={isShopOpen}
                aria-haspopup="true"
              >
                Products
                <motion.svg
                  className="h-3 w-3"
                  animate={{ rotate: isShopOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {isShopOpen && (
                  <motion.div
                    className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2"
                    variants={dropdownVariants}
                    initial="hidden" animate="visible" exit="exit"
                  >
                    <div className="w-[560px] rounded-lg border border-gray-200 bg-white p-3 shadow-xl">
                      <div className="grid grid-cols-2 gap-1">
                        {productCategories.map((cat, index) => {
                          const Icon = cat.icon;
                          return (
                            <motion.div
                              key={cat.title}
                              variants={featureItemVariants}
                              initial="hidden" animate="visible"
                              custom={index}
                              whileHover={{ x: 4, backgroundColor: 'rgba(59,130,246,0.06)' }}
                            >
                              <Link
                                to={cat.href}
                                className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-blue-50"
                                onClick={() => setIsShopOpen(false)}
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="mb-1 font-semibold text-gray-900">{cat.title}</p>
                                  <p className="text-sm text-gray-500">{cat.description}</p>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="my-2 border-t border-gray-100" />

                      <div className="grid grid-cols-2 gap-1">
                        {productHighlights.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.title}
                              variants={featureItemVariants}
                              initial="hidden" animate="visible"
                              custom={index}
                              whileHover={{ x: 4, backgroundColor: 'rgba(59,130,246,0.06)' }}
                            >
                              <Link
                                to={item.href}
                                className="flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-blue-50"
                                onClick={() => setIsShopOpen(false)}
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-700">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{item.title}</p>
                                  <p className="text-xs text-gray-500">{item.description}</p>
                                </div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>

                      <Link
                        to={PRODUCTS_BASE}
                        className="mt-2 flex items-center justify-center rounded-md bg-gray-50 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                        onClick={() => setIsShopOpen(false)}
                      >
                        View all products →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

          {/* ==================== DESKTOP SEARCH + ACCOUNT ==================== */}
          <motion.div
            className="hidden lg:flex items-center gap-3"
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                ref={desktopSearchRef}
                type="text"
                value={desktopSearch}
                onChange={(e) => setDesktopSearch(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search clothes..."
                className="w-48 xl:w-64 bg-gray-100 pl-9 pr-9 py-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
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

            {/* Account Dropdown */}
            <div className="relative" ref={accountRef}>
              <motion.button
                type="button"
                onClick={toggleAccount}
                className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  isAccountOpen || isAccountSection
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={isAccountOpen}
                aria-haspopup="true"
              >
                {user ? (
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {initials}
                  </span>
                ) : (
                  <User className="h-4 w-4" />
                )}
                {user ? displayName.split(' ')[0] : 'Account'}
                <motion.svg
                  className="h-3 w-3"
                  animate={{ rotate: isAccountOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {isAccountOpen && (
                  <motion.div
                    className="absolute right-0 top-full z-50 mt-2"
                    variants={dropdownVariants}
                    initial="hidden" animate="visible" exit="exit"
                  >
                    <div className="w-72 rounded-lg border border-gray-200 bg-white p-3 shadow-xl">
                      {/* Profile block (if logged in) OR Login/Signup (if not) */}
                      {profileHeader}
                      {loginRows}

                      {/* Wishlist */}
                      <Link
                        to="/wishlist"
                        className={accountRowClass('wishlist', 'bg-red-50', 'hover:bg-red-50')}
                        onClick={() => handleAccountClick('wishlist')}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-50 text-red-600">
                          <Heart className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Wishlist</p>
                          <p className="text-xs text-gray-500">Your saved items</p>
                        </div>
                        {wishlistCount > 0 && (
                          <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>

                      {/* Cart */}
                      <Link
                        to="/cart"
                        className={`mt-1 ${accountRowClass('cart', 'bg-blue-50', 'hover:bg-blue-50')}`}
                        onClick={() => handleAccountClick('cart')}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                          <ShoppingCart className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">Cart</p>
                          <p className="text-xs text-gray-500">Review & checkout</p>
                        </div>
                        {cartCount > 0 && (
                          <span className="bg-blue-700 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </Link>

                      {/* Sign out (if logged in) */}
                      {signOutRow}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ==================== MOBILE ACTIONS ==================== */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <motion.button
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Search"
            >
              {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </motion.button>

            <motion.button
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
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

        {/* ==================== MOBILE SEARCH ==================== */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="relative py-5 mx-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  ref={mobileSearchRef}
                  type="text"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  onKeyDown={handleSearch}
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
              initial="hidden" animate="visible" exit="exit"
            >
              <div className="flex flex-col gap-1 border-t border-gray-200 py-3">
                {desktopLinksBefore.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={mobileItemVariants}
                      initial="hidden" animate="visible"
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

                {/* Products Accordion */}
                <div>
                  <motion.button
                    className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
                      isMobileShopOpen || isProductsSection
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                    variants={mobileItemVariants}
                    initial="hidden" animate="visible"
                    custom={desktopLinksBefore.length}
                    aria-expanded={isMobileShopOpen}
                  >
                    <span className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-gray-500" />
                      Products
                    </span>
                    <motion.svg
                      className="h-4 w-4"
                      animate={{ rotate: isMobileShopOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isMobileShopOpen && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="grid gap-1 p-2">
                          <motion.div
                            variants={featureItemVariants}
                            initial="hidden" animate="visible"
                            custom={0}
                            whileHover={{ x: 4 }}
                          >
                            <Link
                              to={PRODUCTS_BASE}
                              className="flex items-center gap-3 rounded-md p-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                              onClick={closeMobileMenu}
                            >
                              View all products →
                            </Link>
                          </motion.div>

                          {[...productCategories, ...productHighlights].map((cat, index) => {
                            const Icon = cat.icon;
                            return (
                              <motion.div
                                key={cat.title}
                                variants={featureItemVariants}
                                initial="hidden" animate="visible"
                                custom={index + 1}
                                whileHover={{ x: 4 }}
                              >
                                <Link
                                  to={cat.href}
                                  className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-blue-50"
                                  onClick={closeMobileMenu}
                                >
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="mb-1 font-semibold text-gray-900">{cat.title}</p>
                                    <p className="text-sm text-gray-500">{cat.description}</p>
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

                {/* Account Accordion */}
                <div>
                  <motion.button
                    className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium transition-colors ${
                      isMobileAccountOpen || isAccountSection
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileAccountOpen(!isMobileAccountOpen)}
                    variants={mobileItemVariants}
                    initial="hidden" animate="visible"
                    custom={desktopLinksBefore.length + 1}
                    aria-expanded={isMobileAccountOpen}
                  >
                    <span className="flex items-center gap-3">
                      <User className="h-4 w-4 text-gray-500" />
                      Account
                    </span>
                    <motion.svg
                      className="h-4 w-4"
                      animate={{ rotate: isMobileAccountOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isMobileAccountOpen && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="grid gap-1 p-2">
                          {/* Profile header (if logged in) */}
                          {user && (
                            <motion.div
                              variants={featureItemVariants}
                              initial="hidden" animate="visible"
                              custom={0}
                              whileHover={{ x: 4 }}
                            >
                              <Link
                                to="/profile"
                                className={`flex items-center gap-3 rounded-md p-3 transition-colors ${
                                  activeAccountRow === 'profile' ? 'bg-indigo-50' : 'hover:bg-indigo-50'
                                }`}
                                onClick={() => handleMobileAccountClick('profile')}
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-[10px] font-bold">
                                  {initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-900 truncate">
                                    {displayName}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                              </Link>
                            </motion.div>
                          )}

                          {/* Profile quick links (if logged in) */}
                          {user &&
                            profileMenuLinks.map(({ label, description, href, icon: Icon }, i) => (
                              <motion.div
                                key={label}
                                variants={featureItemVariants}
                                initial="hidden" animate="visible"
                                custom={i + 1}
                                whileHover={{ x: 4 }}
                              >
                                <Link
                                  to={href}
                                  className="group flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-blue-50"
                                  onClick={() =>
                                    handleMobileAccountClick(label.toLowerCase().replace(/\s+/g, '-'))
                                  }
                                >
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gray-50 text-gray-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                                    <p className="text-xs text-gray-500 truncate">{description}</p>
                                  </div>
                                  <ChevronRight className="h-3.5 w-3.5 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600" />
                                </Link>
                              </motion.div>
                            ))}

                          {/* Login (if not logged in) */}
                          {!user && (
                            <motion.div
                              variants={featureItemVariants}
                              initial="hidden" animate="visible"
                              custom={0}
                              whileHover={{ x: 4 }}
                            >
                              <Link
                                to="/signin"
                                className={`flex items-start gap-3 rounded-md p-3 transition-colors ${
                                  activeAccountRow === 'login' ? 'bg-blue-50' : 'hover:bg-blue-50'
                                }`}
                                onClick={() => handleMobileAccountClick('login')}
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                  <LogIn className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="mb-1 font-semibold text-gray-900">Login</p>
                                  <p className="text-sm text-gray-500">Sign in to your account</p>
                                </div>
                              </Link>
                            </motion.div>
                          )}

                          {/* Sign up (if not logged in) */}
                          {!user && (
                            <motion.div
                              variants={featureItemVariants}
                              initial="hidden" animate="visible"
                              custom={1}
                              whileHover={{ x: 4 }}
                            >
                              <Link
                                to="/signup"
                                className={`flex items-start gap-3 rounded-md p-3 transition-colors ${
                                  activeAccountRow === 'signup' ? 'bg-indigo-50' : 'hover:bg-indigo-50'
                                }`}
                                onClick={() => handleMobileAccountClick('signup')}
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-700">
                                  <UserPlus className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="mb-1 font-semibold text-gray-900">Sign up</p>
                                  <p className="text-sm text-gray-500">Create a new account</p>
                                </div>
                              </Link>
                            </motion.div>
                          )}

                          {/* Divider between profile links and wishlist/cart */}
                          {user && <div className="my-1 border-t border-gray-100" />}

                          {/* Wishlist */}
                          <motion.div
                            variants={featureItemVariants}
                            initial="hidden" animate="visible"
                            custom={2}
                            whileHover={{ x: 4 }}
                          >
                            <Link
                              to="/wishlist"
                              className={`flex items-center gap-3 rounded-md p-3 transition-colors ${
                                activeAccountRow === 'wishlist' ? 'bg-red-50' : 'hover:bg-red-50'
                              }`}
                              onClick={() => handleMobileAccountClick('wishlist')}
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-600">
                                <Heart className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">Wishlist</p>
                                <p className="text-xs text-gray-500">Your saved items</p>
                              </div>
                              {wishlistCount > 0 && (
                                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                  {wishlistCount}
                                </span>
                              )}
                            </Link>
                          </motion.div>

                          {/* Cart */}
                          <motion.div
                            variants={featureItemVariants}
                            initial="hidden" animate="visible"
                            custom={3}
                            whileHover={{ x: 4 }}
                          >
                            <Link
                              to="/cart"
                              className={`flex items-center gap-3 rounded-md p-3 transition-colors ${
                                activeAccountRow === 'cart' ? 'bg-blue-50' : 'hover:bg-blue-50'
                              }`}
                              onClick={() => handleMobileAccountClick('cart')}
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                                <ShoppingCart className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">Cart</p>
                                <p className="text-xs text-gray-500">Review & checkout</p>
                              </div>
                              {cartCount > 0 && (
                                <span className="bg-blue-700 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                  {cartCount}
                                </span>
                              )}
                            </Link>
                          </motion.div>

                          {/* Sign out (if logged in) */}
                          {user && (
                            <motion.div
                              variants={featureItemVariants}
                              initial="hidden" animate="visible"
                              custom={4}
                              whileHover={{ x: 4 }}
                            >
                              <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-md p-3 text-left transition-colors hover:bg-rose-50"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-600">
                                  <LogOut className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-rose-600">Sign out</p>
                                  <p className="text-xs text-gray-500">Log out of your account</p>
                                </div>
                              </button>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {[...desktopLinksAfter, ...mobileLinks].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={mobileItemVariants}
                      initial="hidden" animate="visible"
                      custom={desktopLinksBefore.length + 2 + i}
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

                {/* Bottom CTA */}
                <motion.div
                  className="mt-3 flex flex-col gap-3 border-t border-gray-200 pt-4"
                  variants={mobileItemVariants}
                  initial="hidden" animate="visible"
                  custom={allMobileLinks.length + 3}
                >
                  {user ? (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/profile"
                        className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800"
                        onClick={() => handleMobileAccountClick('profile')}
                      >
                        <UserCircle className="h-4 w-4" />
                        View Profile
                      </Link>
                    </motion.div>
                  ) : (
                    <>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          to="/signin"
                          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                          onClick={() => handleMobileAccountClick('login')}
                        >
                          <LogIn className="h-4 w-4" />
                          Login
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          to="/signup"
                          className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800"
                          onClick={() => handleMobileAccountClick('signup')}
                        >
                          <UserPlus className="h-4 w-4" />
                          Sign up
                        </Link>
                      </motion.div>
                    </>
                  )}
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