import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shirt,
  Crown,
  Baby,
  Flower2,
  Sparkles,
  BadgePercent,
  Filter,
  Star,
  Heart,
  ShoppingCart,
} from 'lucide-react';

/* ============================== Import ALL Product Data ============================== */
import { GirlsProducts as girlsData } from '../../AllProductsData/GirlsProduct';
import { KidsProducts as kidsData } from '../../AllProductsData/KidsProduct';
import { MensProducts as mensData } from '../../AllProductsData/MensProduct';
import { WomensProducts as womensData } from '../../AllProductsData/WomensProduct';

/* ============================== Constants ============================== */
const PRODUCTS_BASE = '/products';

/* ============================== Animation Variants ============================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionWrapperVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

// ✅ Smooth page transition with fade-up + scale
const pageTransitionVariants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

/* ============================== Product Card ============================== */
const ProductCard = ({ product, wishlist, toggleWishlist }) => {
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const badgeColor =
    product.badge === 'Sale'
      ? 'bg-gradient-to-r from-rose-500 to-pink-500'
      : product.badge === 'New'
        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
        : 'bg-gradient-to-r from-amber-500 to-orange-500';

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-full text-white shadow-md ${badgeColor}`}
          >
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {product.oldPrice > product.price && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-rose-500 text-white rounded-full shadow-md">
            {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => toggleWishlist(e, product)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-500 text-white opacity-100 scale-110'
              : 'bg-white/90 text-gray-500 hover:bg-rose-500 hover:text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2 mb-4">
          <span className="text-base font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.oldPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* CTA — Uses global .buy-now-btn from index.css */}
        <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
          <Link to="/cart" className="buy-now-btn">
            <ShoppingCart className="buy-now-icon" />
            <span className="buy-now-label">Buy Now</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ============================== Section Renderer ============================== */
const ProductSection = ({ title, products, wishlist, toggleWishlist }) => {
  if (!products || products.length === 0) return null;

  return (
    <motion.section
      variants={sectionWrapperVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="mb-16 scroll-mt-32"
    >
      <motion.div variants={sectionHeaderVariants} className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </motion.section>
  );
};

/* ============================== All Products View ============================== */
const AllProductsView = ({ wishlist, toggleWishlist }) => (
  <motion.div
    variants={pageTransitionVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    key="all-products-view"
  >
    {/* Top Heading */}
    <div className="mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Explore Our Full Collection
      </h1>
      <p className="text-sm text-gray-500 mt-2">
        Discover styles for Men, Women, Girls &amp; Kids — all in one place.
      </p>
    </div>

    {/* All 4 sections */}
    <ProductSection
      title="Girls Collection"
      products={girlsData}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
    />
    <ProductSection
      title="Kids Collection"
      products={kidsData}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
    />
    <ProductSection
      title="Men's Collection"
      products={mensData}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
    />
    <ProductSection
      title="Women's Collection"
      products={womensData}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
    />
  </motion.div>
);

/* ============================== Navigation Data ============================== */
const navList = [
  { label: 'All', icon: Filter, path: '/products' },
  { label: 'Women', icon: Crown, path: `${PRODUCTS_BASE}/womens` },
  { label: 'Men', icon: Shirt, path: `${PRODUCTS_BASE}/mens` },
  { label: 'Girls', icon: Flower2, path: `${PRODUCTS_BASE}/girls` },
  { label: 'Kids', icon: Baby, path: `${PRODUCTS_BASE}/kids` },
  { label: 'New Arrivals', icon: Sparkles, path: `${PRODUCTS_BASE}/arrivals` },
  { label: 'Sale', icon: BadgePercent, path: `${PRODUCTS_BASE}/sale` },
];

/* ============================== Main Component ============================== */
const AllproductNav = () => {
  const location = useLocation();
  const isIndexRoute = location.pathname === '/products';

  // ✅ Shared wishlist across all sections
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlist:updated'));
  }, [wishlist]);

  const toggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  };

  return (
    <div className="w-full">
      {/* ---------- Category Navigation Bar ---------- */}
      <div className="sticky top-[60px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-nowrap items-center gap-2 sm:gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory">
            {navList.map((link, idx) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={idx}
                  to={link.path}
                  end={link.path === '/products'}
                  className={({ isActive }) =>
                    `snap-start flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                        : 'bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-200'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- Main Content Area with Smooth Transition ---------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* On /products (All tab) */}
          {isIndexRoute && (
            <AllProductsView
              key="all"
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          )}

          {/* Nested routes (specific category pages) */}
          {!isIndexRoute && (
            <motion.div
              key={location.pathname}
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllproductNav;