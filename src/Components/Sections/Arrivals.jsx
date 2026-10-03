import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, ArrowRight, Check } from 'lucide-react';
import products from '../../Product.js';

// 🔥 Shared stores — fire events the Navbar listens to
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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

  const discount =
    product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const handleAdd = useCallback(() => {
    onAddToCart(product);
    setJustAdded(true);
    window.clearTimeout(handleAdd._t);
    handleAdd._t = window.setTimeout(() => setJustAdded(false), 1200);
  }, [product, onAddToCart]);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-200/40 border border-gray-100 hover:border-indigo-200 transition-all flex flex-col"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* New Badge */}
        <span className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md transition-transform duration-300 group-hover:scale-105">
          New
        </span>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
            {discount}% OFF
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
          <Heart className={`w-4 h-4 transition-all duration-200 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 capitalize mt-0.5">
          {product.category}
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

        {/* ✅ Add To Cart — fires cart:updated */}
        <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`buy-now-btn w-full cursor-pointer ${justAdded ? 'is-added' : ''}`}
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

/* ============================== Arrivals Section ============================== */
const Arrivals = () => {
  // ✅ Live wishlist from the shared store (auto-updates cross-tab)
  const { items: wishlist } = useWishlistAutoReload();

  const handleWishlist = useCallback((e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistStore(product);
  }, []);

  const handleAddToCart = useCallback((product) => {
    addToCartStore(product);
  }, []);

  // ✅ Get the latest 8 products
  const newArrivals = products.slice(0, 8);

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 mb-10 sm:mb-12 lg:mb-14"
        >
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              New Arrivals
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl">
              Check out our latest collection of products
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

        {/* Product Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
        >
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.some((i) => i.id === product.id)}
              onWishlist={handleWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Arrivals;