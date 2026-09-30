import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trending as TrendingData } from '../../AllProductsData/TrendingProduct';
import { Star, Heart, ShoppingCart, Flame, ArrowRight, Check } from 'lucide-react';

/* ================================================================
   SHARED cart cache — must be identical to Cart.jsx
   (put this in a separate file `src/utils/cartStore.js` if you want,
   but duplicating it in both files also works as long as both
   reference `localStorage` and the same event name).
   ================================================================ */
let _cartCache = null;

const readCart = () => {
  if (_cartCache) return _cartCache;
  try {
    const raw = localStorage.getItem('cart');
    _cartCache = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(_cartCache)) _cartCache = [];
  } catch {
    _cartCache = [];
  }
  return _cartCache;
};

let _writeScheduled = false;
const scheduleWrite = () => {
  if (_writeScheduled) return;
  _writeScheduled = true;
  const flush = () => {
    _writeScheduled = false;
    try {
      localStorage.setItem('cart', JSON.stringify(_cartCache));
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: _cartCache }));
    } catch {}
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(flush, { timeout: 300 });
  } else {
    setTimeout(flush, 0);
  }
};

/* ---------- animation ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ---------- Product Card (memoized) ---------- */
const ProductCard = React.memo(
  ({ product, isWishlisted, onWishlist, onAddToCart, rank }) => {
    const [justAdded, setJustAdded] = useState(false);
    const timerRef = useRef(null);

    const discount = product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

    const handleAdd = useCallback(() => {
      setJustAdded(true);
      onAddToCart(product);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setJustAdded(false), 1200);
    }, [product, onAddToCart]);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    return (
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all flex flex-col cursor-pointer relative"
      >
        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-full text-white bg-gradient-to-r from-orange-500 to-rose-500 shadow-md">
          <Flame className="w-3 h-3" />#{rank} Trending
        </span>

        <div className="relative aspect-[5/4] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          {discount > 0 && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-rose-500 text-white rounded-full shadow-md">
              -{discount}%
            </span>
          )}
          <button
            type="button"
            onClick={() => onWishlist(product)}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500 text-white opacity-100 scale-110'
                : 'bg-white/90 text-gray-500 hover:bg-rose-500 hover:text-white opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 capitalize mt-0.5">
            {product.category || 'Girls'}
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.oldPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
            <button
              type="button"
              onClick={handleAdd}
              className={`buy-now-btn w-full cursor-pointer transition-colors ${
                justAdded ? 'is-added' : ''
              }`}
            >
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 buy-now-icon" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 buy-now-icon" /> Add To Cart
                  </>
                )}
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);
ProductCard.displayName = 'ProductCard';

/* ---------- Trending ---------- */
const Trending = () => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem('wishlist');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: wishlist }));
      } catch {}
    }, 50);
    return () => clearTimeout(id);
  }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      return exists ? prev.filter((i) => i.id !== product.id) : [...prev, product];
    });
  }, []);

  // ✅ ADD TO CART — updates the shared cache, schedules a single write
  const addToCart = useCallback((product) => {
    const current = readCart();
    const idx = current.findIndex((i) => i.id === product.id);
    if (idx > -1) {
      _cartCache = current.map((i, n) =>
        n === idx ? { ...i, quantity: (i.quantity || 1) + 1 } : i
      );
    } else {
      _cartCache = [...current, { ...product, quantity: 1 }];
    }
    scheduleWrite();
  }, []);

  const trendingItems = (TrendingData || []).slice(0, 8);

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 mb-10 sm:mb-12"
        >
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100 rounded-full mb-3">
              <Flame className="w-3 h-3" />
              Hot right now
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Trending Products
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl">
              The most-loved styles everyone is talking about this week
            </p>
          </div>

          <Link
            to="/products"
            className="group relative inline-flex items-center gap-1.5 text-indigo-600 text-sm sm:text-base font-semibold hover:gap-3 transition-all duration-300 hover:text-purple-600"
          >
            Browse all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300" />
          </Link>
        </motion.div>

        {trendingItems.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
          >
            {trendingItems.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((i) => i.id === product.id)}
                onWishlist={toggleWishlist}
                onAddToCart={addToCart}
                rank={index + 1}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No trending products right now.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Trending;