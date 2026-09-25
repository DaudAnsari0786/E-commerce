import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants ---
const BASE_PATH = '/products';

const CATEGORIES = [
  { label: 'All',   path: ''       },
  { label: 'Men',   path: 'mens'   },
  { label: 'Women', path: 'womens' },
  { label: 'Kids',  path: 'kids'   },
  { label: 'Girls', path: 'girls'  },
];

// --- Helpers ---
/**
 * Strips trailing slashes so `/products` and `/products/` behave the same.
 * Falls back to BASE_PATH for the root.
 */
const normalizePath = (pathname) => {
  const stripped = pathname.replace(/\/+$/, '');
  return stripped || BASE_PATH;
};

/**
 * "All" is active only at exactly `/products`.
 * Others are active at `/products/<path>` or any deeper child.
 */
const isCategoryActive = (categoryPath, currentPath) => {
  if (categoryPath === '') {
    return currentPath === BASE_PATH;
  }
  return (
    currentPath === `${BASE_PATH}/${categoryPath}` ||
    currentPath.startsWith(`${BASE_PATH}/${categoryPath}/`)
  );
};

// --- Page transition variants ---
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2,  ease: [0.22, 1, 0.36, 1] } },
};

const AllproductNav = () => {
  const { pathname } = useLocation();
  const outlet = useOutlet();          // child route element
  const tabsRef = useRef(null);

  // Normalized path (memoized so effects only fire on real changes)
  const cleanPath = useMemo(() => normalizePath(pathname), [pathname]);

  // Scroll page to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [cleanPath]);

  // Keep the active tab visible (useful for horizontally scrolling tab bar on mobile)
  useEffect(() => {
    const activeTab = tabsRef.current?.querySelector('[data-active="true"]');
    activeTab?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [cleanPath]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse our latest drops across every category.
        </p>
      </div>

      {/* Category tabs */}
      <nav
        ref={tabsRef}
        aria-label="Product categories"
        className="relative mb-8 flex gap-3 overflow-x-auto border-b border-gray-200 pb-4
                   scrollbar-hide sm:flex-wrap sm:overflow-visible"
      >
        {CATEGORIES.map(({ label, path }) => {
          const active = isCategoryActive(path, cleanPath);
          const to = path === '' ? BASE_PATH : `${BASE_PATH}/${path}`;

          return (
            <Link
              key={path || 'all'}
              to={to}
              data-active={active}
              aria-current={active ? 'page' : undefined}
              onClick={(e) => {
                // Skip redundant navigation when already on this tab
                if (active) e.preventDefault();
              }}
              className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium
                          transition-colors focus:outline-none focus-visible:ring-2
                          focus-visible:ring-blue-600 focus-visible:ring-offset-2
                          ${
                            active
                              ? 'bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 text-white shadow-sm'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Animated child content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={cleanPath}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AllproductNav;