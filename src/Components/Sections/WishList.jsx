import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, Star, ShoppingCart } from 'lucide-react';

/* ============================== Import ALL Product Data ============================== */
import { GirlsProducts } from '../../AllProductsData/GirlsProduct';
import { KidsProducts } from '../../AllProductsData/KidsProduct';
import { MensProducts } from '../../AllProductsData/MensProduct';
import { WomensProducts } from '../../AllProductsData/WomensProduct';

/* ============================== Build a Unified Product Lookup ============================== */
const ALL_PRODUCTS = [
  ...(GirlsProducts || []),
  ...(KidsProducts || []),
  ...(MensProducts || []),
  ...(WomensProducts || []),
];

// Fast lookup map: { productId: productObject }
const PRODUCTS_MAP = ALL_PRODUCTS.reduce((acc, product) => {
  if (product?.id) acc[product.id] = product;
  return acc;
}, {});

/* ============================== Animation Variants ============================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

/* ============================== WishList Component ============================== */
const WishList = () => {
  // ✅ Load wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ✅ Sync with localStorage + cross-tab + same-tab events
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const saved = localStorage.getItem('wishlist');
        setWishlist(saved ? JSON.parse(saved) : []);
      } catch {
        /* ignore corrupt storage */
      }
    };

    // Cross-tab sync
    const handleStorageChange = (e) => {
      if (e.key === 'wishlist') syncFromStorage();
    };

    // Same-tab sync (custom event)
    const handleCustomUpdate = () => syncFromStorage();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlist:updated', handleCustomUpdate);

    // Sync on mount
    syncFromStorage();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlist:updated', handleCustomUpdate);
    };
  }, []);

  // ✅ Enrich wishlist items with full product data
  const enrichedWishlist = wishlist
    .map((item) => {
      if (item.name && item.price) return item;
      return PRODUCTS_MAP[item.id] || null;
    })
    .filter(Boolean);

  // ✅ Remove item from wishlist
  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    // Notify Navbar + other tabs
    window.dispatchEvent(new Event('wishlist:updated'));
  };

  // ✅ Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
    window.dispatchEvent(new Event('wishlist:updated'));
  };

  /* ---------- Empty State ---------- */
  if (enrichedWishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-rose-50 flex items-center justify-center">
            <Heart className="w-9 h-9 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-gray-500 mb-6">
            Tap the heart icon on any product to save it here for later.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ---------- Wishlist Grid ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {enrichedWishlist.length} {enrichedWishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 px-4 py-2.5 text-sm font-semibold transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {enrichedWishlist.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute cursor-pointer top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white shadow-md transition-all duration-200"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}

                {/* Category Tag */}
                {product.category && (
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur text-gray-700 rounded-full shadow-sm">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-1">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-3 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.oldPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* ✅ Buy Now Button — Simple CSS from index.css */}
                <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
                  <Link to="/cart" className="buy-now-btn">
                    <ShoppingCart className="buy-now-icon" />
                    <span className="buy-now-label">Buy Now</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Shopping */}
        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishList;