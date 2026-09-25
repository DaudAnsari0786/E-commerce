import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import products from '../../Product.js';

// ==================== ANIMATION VARIANTS ====================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// ==================== PRODUCT CARD ====================
const ProductCard = ({ product }) => {
  const badgeColor =
    product.badge === 'Sale'
      ? 'bg-gradient-to-r from-rose-500 to-pink-500'
      : product.badge === 'New'
      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
      : 'bg-gradient-to-r from-amber-500 to-orange-500';

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-200/40 border border-gray-100 hover:border-indigo-200 transition-all flex flex-col cursor-pointer"
    >
      {/* Image */}
      <Link to={`/shop/${product.category}`} className="block relative overflow-hidden">
        <div className="relative aspect-[5/4] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full text-white shadow-md ${badgeColor} group-hover:scale-110 transition-transform duration-300`}
            >
              {product.badge}
            </span>
          )}

          {/* Wishlist */}
          <motion.button
            onClick={(e) => e.preventDefault()}
            aria-label="Add to wishlist"
            whileHover={{ scale: 1.15, rotate: -8 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-gray-700 hover:text-rose-500 hover:bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-colors"
          >
            <Heart className="w-4 h-4 transition-colors" />
          </motion.button>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/shop/${product.category}`} className="group/title inline-block">
          <h3 className="text-sm font-semibold text-gray-900 truncate group-hover/title:text-indigo-600 transition-colors relative">
            {product.name}
            {/* Animated underline */}
            <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover/title:w-full transition-all duration-300" />
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2 mb-4">
          <span className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-rose-500 transition-all duration-500">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.oldPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* CTA — gradient with rich hover + active effects */}
        <motion.div whileTap={{ scale: 0.97 }}>
          <Link
            to="/cart"
            className="group/btn relative mt-auto inline-flex items-center justify-center gap-2 w-full rounded-lg font-semibold text-white py-2.5 text-sm btn-dark-gradient shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-[0.97] overflow-hidden"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <ShoppingCart className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-[-8deg] transition-transform duration-300" />
            <span className="relative">Buy Now</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ==================== ARRIVALS PAGE ====================
const Arrivals = () => {
  const newArrivals = products.filter((p) => p.badge === 'New');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {newArrivals.length > 0 ? (
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 mb-8"
            >
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 flex items-center gap-2 justify-center sm:justify-start">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block"
                  >
                    <Sparkles className="w-6 h-6 text-emerald-500" />
                  </motion.span>
                  New Arrivals
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {newArrivals.length}{' '}
                  {newArrivals.length === 1 ? 'new item' : 'new items'} just landed
                </p>
              </div>

              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-1.5 text-indigo-600 text-sm sm:text-base font-semibold hover:gap-3 transition-all duration-300 hover:text-purple-600"
              >
                Browse all
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                {/* Underline effect */}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </div>
        </section>
      ) : (
        /* Empty State */
        <section className="py-20">
          <div className="max-w-md mx-auto px-4 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-emerald-200/50 transition-shadow cursor-pointer"
            >
              <Sparkles className="w-10 h-10 text-emerald-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No new arrivals yet
            </h2>
            <p className="text-gray-600 mb-6">
              Fresh drops are on the way. Check back soon!
            </p>
            <motion.div whileTap={{ scale: 0.96 }} className="inline-block">
              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-[length:200%_100%] bg-left hover:bg-right hover:from-purple-600 hover:to-rose-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-500 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-purple-500/40 active:scale-[0.97] overflow-hidden"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">Browse All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Arrivals;