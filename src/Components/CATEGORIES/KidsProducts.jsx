import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KidsProducts as kidsData } from '../../AllProductsData/KidsProduct';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const KidsProducts = () => {
  // ✅ Load wishlist from localStorage on first mount
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Toggle function: adds/removes the FULL product object
  const toggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id) // Remove
        : [...prev, product];                           // Add full object
    });
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Kids Collection</h2>
          <p className="text-sm text-gray-500 mt-1">
            {kidsData.length} playful styles for little ones
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {kidsData.map((product) => {
          // ✅ Check if this product is in the wishlist
          const isWishlisted = wishlist.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[5/5] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}

                {/* Discount Tag */}
                {product.oldPrice > product.price && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold bg-rose-500 text-white rounded-full shadow-md">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </span>
                )}

                {/* ✅ Wishlist Heart Button */}
                <button
                  type="button"
                  onClick={(e) => toggleWishlist(e, product)}
                  className={`absolute bottom-3 right-3 w-9 h-9 rounded-full backdrop-blur flex items-center justify-center shadow-md transition-all duration-300 ${
                    isWishlisted
                      ? 'bg-rose-500 text-white opacity-100 scale-110'
                      : 'bg-white/90 text-gray-500 hover:bg-rose-500 hover:text-white opacity-0 group-hover:opacity-100'
                  }`}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-200 ${
                      isWishlisted ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col flex-1">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>

                {/* Sizes */}
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

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-3 mb-3">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">₹{product.oldPrice}</span>
                  )}
                </div>

                {/* ✅ Buy Now Button */}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KidsProducts;