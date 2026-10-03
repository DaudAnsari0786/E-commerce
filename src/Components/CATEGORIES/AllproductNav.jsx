import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  Check,
} from 'lucide-react';

/* ============================== Product Data ============================== */
import { GirlsProducts as girlsData } from '../../AllProductsData/GirlsProduct';
import { KidsProducts as kidsData } from '../../AllProductsData/KidsProduct';
import { MensProducts as mensData } from '../../AllProductsData/MensProduct';
import { WomensProducts as womensData } from '../../AllProductsData/WomensProduct';

/* ============================== Cart store ============================== */
import { addToCart as addToCartStore } from '../../utils/cartStore';

/* ============================== Constants ============================== */
const PRODUCTS_BASE = '/products';

/* ============================== Animation Variants ============================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const sectionWrapperVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const pageTransitionVariants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

/* ============================== Category Nav Data ============================== */
const navList = [
  { label: 'All', icon: Filter, path: '/products' },
  { label: 'Women', icon: Crown, path: `${PRODUCTS_BASE}/womens` },
  { label: 'Men', icon: Shirt, path: `${PRODUCTS_BASE}/mens` },
  { label: 'Girls', icon: Flower2, path: `${PRODUCTS_BASE}/girls` },
  { label: 'Kids', icon: Baby, path: `${PRODUCTS_BASE}/kids` },
  { label: 'New Arrivals', icon: Sparkles, path: `${PRODUCTS_BASE}/arrivals` },
  { label: 'Sale', icon: BadgePercent, path: `${PRODUCTS_BASE}/sale` },
];

/* ============================== Product Card (memoized) ============================== */
const ProductCard = memo(function ProductCard({
  product,
  isWishlisted,
  onWishlist,
  onAddToCart,
}) {
  const [justAdded, setJustAdded] = useState(false);

  const badgeColor =
    product.badge === 'Sale'
      ? 'bg-gradient-to-r from-rose-500 to-pink-500'
      : product.badge === 'New'
      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
      : 'bg-gradient-to-r from-amber-500 to-orange-500';

  const discount =
    product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
    setJustAdded(true);
    window.clearTimeout(handleAddToCart._t);
    handleAddToCart._t = window.setTimeout(() => setJustAdded(false), 1200);
  }, [product, onAddToCart]);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all flex flex-col"
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
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-rose-500 text-white rounded-full shadow-md">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist toggle */}
        <button
          type="button"
          onClick={() => onWishlist(product)}
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

        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

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

        {/* CTA — real Add To Cart */}
        <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`buy-now-btn w-full cursor-pointer ${
              justAdded ? 'is-added' : ''
            }`}
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 buy-now-icon" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 buy-now-icon" />
                 Add To Cart
                </>
              )}
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
});

/* ============================== Product Section (memoized) ============================== */
const ProductSection = memo(function ProductSection({
  title,
  subtitle,
  products,
  wishlist,
  onWishlist,
  onAddToCart,
}) {
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
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.some((i) => i.id === product.id)}
            onWishlist={onWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </motion.section>
  );
});

/* ============================== All Products View ============================== */
function AllProductsView({ wishlist, onWishlist, onAddToCart }) {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      key="all-products-view"
    >
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Explore Our Full Collection
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Discover styles for Men, Women, Girls &amp; Kids — all in one place.
        </p>
      </div>

      <ProductSection
        title="Girls Collection"
        subtitle="Cute looks for girls"
        products={girlsData}
        wishlist={wishlist}
        onWishlist={onWishlist}
        onAddToCart={onAddToCart}
      />
      <ProductSection
        title="Kids Collection"
        subtitle="Playful styles for little ones"
        products={kidsData}
        wishlist={wishlist}
        onWishlist={onWishlist}
        onAddToCart={onAddToCart}
      />
      <ProductSection
        title="Men's Collection"
        subtitle="Sharp &amp; comfortable everyday wear"
        products={mensData}
        wishlist={wishlist}
        onWishlist={onWishlist}
        onAddToCart={onAddToCart}
      />
      <ProductSection
        title="Women's Collection"
        subtitle="Elegant styles for every occasion"
        products={womensData}
        wishlist={wishlist}
        onWishlist={onWishlist}
        onAddToCart={onAddToCart}
      />
    </motion.div>
  );
}

/* ============================== Category Strip ============================== */
const CategoryStrip = memo(function CategoryStrip() {
  return (
    <div className="sticky top-14 sm:top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
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
  );
});

/* ============================== Main Component ============================== */
const AllproductNav = () => {
  const location = useLocation();
  const isIndexRoute = location.pathname === '/products';

  /* ---------- Wishlist (synced with localStorage) ---------- */
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      window.dispatchEvent(new Event('wishlist:updated'));
    } catch {}
  }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  }, []);

  /* ---------- Add to Cart (via shared store) ---------- */
  const handleAddToCart = useCallback((product) => {
    addToCartStore(product); // updates shared cache + fires cart:updated
  }, []);

  /* ---------- Derived ---------- */
  const wishlistIdSet = useMemo(
    () => new Set(wishlist.map((i) => i.id)),
    [wishlist]
  );

  /* Wrap wishlist check so memoized card gets a stable bool */
  const onWishlist = useCallback(
    (product) => toggleWishlist(product),
    [toggleWishlist]
  );

  return (
    <div className="w-full">
      {/* Category nav bar */}
      <CategoryStrip />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* /products — All tab */}
          {isIndexRoute && (
            <AllProductsView
              key="all"
              wishlist={wishlist}
              onWishlist={onWishlist}
              onAddToCart={handleAddToCart}
            />
          )}

          {/* Nested category routes */}
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