import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';

// ✅ Import products from your main product file (customize this list as needed)
import products from '../../Product.js';

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
const ProductCard = ({ product, wishlist, toggleWishlist }) => {
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

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
      <Link to={`/products/${product.category}`} className="block relative overflow-hidden">
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
              -{discount}%
            </span>
          )}

          {/* Wishlist Heart */}
          <button
            type="button"
            onClick={(e) => toggleWishlist(e, product)}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur flex items-center justify-center shadow-md transition-all duration-300 ${
              isWishlisted
                ? 'bg-rose-500 text-white opacity-100 scale-110'
                : 'bg-white/90 text-gray-500 hover:bg-rose-500 hover:text-white opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
              >
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

        {/* Buy Now Button */}
        <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
          <Link
            to="/cart"
            className="group/btn relative inline-flex items-center justify-center gap-2 w-full rounded-lg font-semibold text-white py-2.5 text-xs sm:text-sm bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-[length:200%_100%] bg-left hover:bg-right hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-500 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-[0.97] overflow-hidden"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-[-8deg] transition-transform duration-300" />
            <span className="relative">Buy Now</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ============================== Featured Section ============================== */
const Featured = () => {
  // ✅ Shared wishlist synced with localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
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

  // ✅ Pick 8 featured products (you can customize this logic)
  // Examples: highest rating, on-sale items, curated picks, etc.
  const featuredItems = products
    .filter((p) => p.rating >= 4.5) // Only show high-rated items
    .slice(0, 8);

  return (
    <section className="relative py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Products Grid */}
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
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
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