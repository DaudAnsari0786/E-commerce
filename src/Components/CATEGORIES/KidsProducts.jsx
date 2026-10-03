import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KidsProducts as kidsData } from '../../AllProductsData/KidsProduct';
import { Star, Heart, ShoppingCart, Check } from 'lucide-react';
import { addToCart as addToCartStore } from '../../utils/cartStore';
import { toggleWishlist as toggleWishlistStore } from '../../utils/wishlistStore';
import { useWishlistAutoReload } from '../../hooks/useWishlistAutoReload';

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

  const handleAdd = useCallback(() => {
    onAddToCart(product);
    setJustAdded(true);
    window.clearTimeout(handleAdd._t);
    handleAdd._t = window.setTimeout(() => setJustAdded(false), 1200);
  }, [product, onAddToCart]);

  return (
    <div className="group cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-full shadow-md">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold bg-rose-500 text-white rounded-full shadow-md">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={(e) => onWishlist(e, product)}
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-full backdrop-blur flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-500 text-white opacity-100 scale-110'
              : 'bg-white/90 text-gray-500 hover:bg-rose-500 hover:text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 transition-all duration-200 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>

        <div className="flex flex-wrap gap-1 mt-2">
          {product.sizes?.slice(0, 3).map((size) => (
            <span key={size} className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
              {size}
            </span>
          ))}
          {product.sizes?.length > 3 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
              +{product.sizes.length - 3}
            </span>
          )}
        </div>

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
    </div>
  );
});

const KidsProducts = () => {
  const { items: wishlist } = useWishlistAutoReload();

  const handleWishlist = useCallback((e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistStore(product);
  }, []);

  const handleAddToCart = useCallback((product) => {
    addToCartStore(product);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Kids Collection</h2>
          <p className="text-sm text-gray-500 mt-1">
            {kidsData.length} playful styles for little ones
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {kidsData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.some((i) => i.id === product.id)}
            onWishlist={handleWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default KidsProducts;