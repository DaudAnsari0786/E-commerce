import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, ArrowRight, Sparkles, Check } from 'lucide-react';
import products from '../../Product.js';

// 🔥 REQUIRED imports — must match the file paths
import { addToCart as addToCartStore } from '../../utils/cartStore';
import { toggleWishlist as toggleWishlistStore } from '../../utils/wishlistStore';
import { useWishlistAutoReload } from '../../hooks/useWishlistAutoReload';

/* ============================== Animation Variants ============================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* ============================== Product Card ============================== */
const ProductCard = memo(function ProductCard({
  product,
  isWishlisted,
  onWishlist,
  onAddToCart,
}) {
  const [justAdded, setJustAdded] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const badgeColor =
    product.badge === 'Sale'
      ? 'bg-gradient-to-r from-rose-500 to-pink-500'
      : product.badge === 'New'
        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
        : 'bg-gradient-to-r from-amber-500 to-orange-500';

  const handleAdd = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onAddToCart(product); // → fires `cart:updated`
      setJustAdded(true);
      window.clearTimeout(handleAdd._t);
      handleAdd._t = window.setTimeout(() => setJustAdded(false), 1200);
    },
    [product, onAddToCart]
  );

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all flex flex-col cursor-pointer"
    >
      <Link to={`/products/${product.category}`} className="block relative overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {product.badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-full text-white shadow-md ${badgeColor}`}>
              {product.badge}
            </span>
          )}

          {discount > 0 && (
            <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-rose-500 text-white rounded-full shadow-md">
              -{discount}%
            </span>
          )}

          {/* ❤️ Wishlist — fires wishlist:updated */}
          <button
            type="button"
            onClick={(e) => onWishlist(e, product)}
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
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {product.sizes?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.sizes.slice(0, 3).map((size) => (
              <span key={size} className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        )}

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

        {/* ✅ Add To Cart — fires cart:updated */}
        <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`buy-now-btn w-full cursor-pointer transition-colors ${justAdded ? 'is-added' : ''}`}
          >
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 buy-now-icon" />
                  <span className="buy-now-label">Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 buy-now-icon" />
                  <span className="buy-now-label">Add To Cart</span>
                </>
              )}
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
});

/* ============================== Featured Section ============================== */
const Featured = () => {
  // ✅ Live wishlist from the shared store (auto-updates cross-tab)
  const { items: wishlist } = useWishlistAutoReload();

  /* ---------- Handlers that export to the stores ---------- */
  const handleWishlist = useCallback((e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistStore(product); // → fires `wishlist:updated`
  }, []);

  const handleAddToCart = useCallback((product) => {
    addToCartStore(product); // → fires `cart:updated`
  }, []);

  const featuredItems = products.filter((p) => p.rating >= 4.5).slice(0, 8);

  return (
    <section className="relative py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 mb-10"
        >
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 rounded-full mb-3">
              <Sparkles className="w-3 h-3" />
              Handpicked for you
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Our best-sellers and top-rated picks
            </p>
          </div>

          <Link
            to="/products"
            className="group relative inline-flex items-center gap-1.5 text-indigo-600 text-sm sm:text-base font-semibold hover:gap-3 transition-all duration-300 hover:text-purple-600"
          >
            View all products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300" />
          </Link>
        </motion.div>

        {featuredItems.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {featuredItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((i) => i.id === product.id)}
                onWishlist={handleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured products available right now.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Featured;