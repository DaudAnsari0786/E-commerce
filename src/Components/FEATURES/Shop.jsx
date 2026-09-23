import React, { useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { label: 'All', path: '' },
  { label: 'Men', path: 'mens' },
  { label: 'Women', path: 'womens' },
  { label: 'Kids', path: 'kids' },
  { label: 'Girls', path: 'girls' },
];

const Shop = () => {
  const location = useLocation();
  const tabsRef = useRef(null);

  // Scroll to top whenever the child route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Scroll active tab into view (useful on mobile)
  useEffect(() => {
    const active = tabsRef.current?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [location.pathname]);

  // Determine which tab is active based on the current pathname
  const isTabActive = (path) => {
    if (path === '') {
      // "All" is active only at exactly /shop
      return location.pathname === '/shop' || location.pathname === '/shop/';
    }
    return location.pathname.startsWith(`/shop/${path}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold mb-6"
      >
        Shop
      </motion.h1>

      {/* Category tabs */}
      <nav
        ref={tabsRef}
        className="relative mb-8 border-b border-gray-200 pb-4
                   flex gap-3 overflow-x-auto scrollbar-hide
                   sm:flex-wrap sm:overflow-visible"
      >
        {categories.map((cat) => {
          const active = isTabActive(cat.path);
          const to = cat.path === '' ? '/shop' : cat.path;

          return (
            <Link
              key={cat.path || 'all'}
              to={to}
              data-active={active}
              aria-current={active ? 'page' : undefined}
              className={`relative shrink-0 px-4 py-2 rounded-md text-sm font-medium
                          transition-colors focus:outline-none focus-visible:ring-2
                          focus-visible:ring-blue-600 focus-visible:ring-offset-2
                          ${
                            active
                              ? 'text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
            >
              {/* Animated active background (slides between tabs) */}
              {active && (
                <motion.span
                  layoutId="shop-tab-bg"
                  className="absolute inset-0 rounded-md bg-blue-700 -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Animated page content — fades + slides when route changes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Shop;