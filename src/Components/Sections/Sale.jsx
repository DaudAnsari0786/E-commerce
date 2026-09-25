import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, ShoppingCart, Tag, Sparkles } from 'lucide-react';
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
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

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
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-md group-hover:scale-110 transition-transform duration-300">
              -{discount}%
            </span>
          )}

          {/* Wishlist */}
          <motion.button
            onClick={(e) => e.preventDefault()}
            aria-label="Add to wishlist"
            whileHover={{ scale: 1.15, rotate: -8 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-gray-700 hover:text-rose-500 hover:bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-colors"
          >
            <Heart className="w-4 h-4" />
          </motion.button>
        </div>
      </Link>

      {/* Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link to={`/shop/${product.category}`} className="group/title inline-block">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate group-hover/title:text-indigo-600 transition-colors relative">
            {product.name}
            <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover/title:w-full transition-all duration-300" />
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5 mb-2">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-[10px] sm:text-xs text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.oldPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* CTA */}
        <motion.div whileTap={{ scale: 0.97 }} className="mt-auto">
          <Link
            to="/cart"
            className="group/btn relative inline-flex items-center justify-center gap-2 w-full rounded-lg font-semibold text-white py-2 sm:py-2.5 text-xs sm:text-sm bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 bg-[length:200%_100%] bg-left hover:bg-right hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-500 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-[0.97] overflow-hidden"
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

// ==================== SALE PAGE ====================
const Sale = () => {
  const saleItems = products.filter((p) => p.badge === 'Sale').slice(0, 8);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* ==================== SALE ITEMS ==================== */}
      {saleItems.length > 0 ? (
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block"
                  >
                    <Tag className="w-6 h-6 text-rose-500" />
                  </motion.span>
                  On Sale
                  <span className="text-gray-500 text-lg sm:text-xl font-medium">—</span>
                  <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                    Up to 60% OFF
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {saleItems.length}{' '}
                  {saleItems.length === 1 ? 'item' : 'items'} on sale — grab them fast
                </p>
              </div>

              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-1.5 text-indigo-600 text-sm sm:text-base font-semibold hover:gap-3 transition-all duration-300 hover:text-purple-600"
              >
                Browse all
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
              {saleItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </div>
        </section>
      ) : (
        /* ==================== EMPTY STATE ==================== */
        <section className="py-20">
          <div className="max-w-md mx-auto px-4 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-rose-200/50 transition-shadow cursor-pointer"
            >
              <Tag className="w-10 h-10 text-rose-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No items on sale right now
            </h2>
            <p className="text-gray-600 mb-6">
              Check back soon for fresh deals and discounts!
            </p>
            <motion.div whileTap={{ scale: 0.96 }} className="inline-block">
              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-[length:200%_100%] bg-left hover:bg-right hover:from-purple-600 hover:to-rose-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-500 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-purple-500/40 active:scale-[0.97] overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">Browse All Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ==================== PROMO BANNER ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-rose-600 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20"
          >
            {/* Decorative circles */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/3"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/20 rounded-full translate-y-1/2 -translate-x-1/4"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center p-6 sm:p-10 lg:p-14">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold tracking-wider rounded-full mb-3 sm:mb-4"
                >
                  <Sparkles className="w-3 h-3" />
                  LIMITED TIME
                </motion.span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  End of Season
                  <br />
                  <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                    Mega Sale
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-white/80 mb-5 sm:mb-6 max-w-md leading-relaxed">
                  Up to 60% off on selected items. Refresh your wardrobe without
                  breaking the bank.
                </p>

                <motion.div whileTap={{ scale: 0.96 }} className="inline-block">
                  <Link
                    to="/shop/sale"
                    className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-white text-indigo-700 text-sm sm:text-base font-bold rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 active:scale-[0.97] overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />
                    <span className="relative">Shop the Sale</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="hidden lg:flex justify-center"
              >
                <motion.img
                  animate={{ rotate: [0, 3, 0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=600&fit=crop"
                  alt="Sale"
                  className="w-72 h-50 object-cover rounded-3xl shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sale;