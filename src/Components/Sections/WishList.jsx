import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, Star } from 'lucide-react';

/* ============================== Import ALL Product Data ============================== */
import { GirlsProducts } from '../../AllProductsData/GirlsProduct';
import { KidsProducts } from '../../AllProductsData/KidsProduct';
import { MensProducts } from '../../AllProductsData/MensProduct';
import { WomensProducts } from '../../AllProductsData/WomensProduct';

/* ============================== Build a Unified Product Lookup ============================== */
// Combine all products into one master array for easy lookup
const ALL_PRODUCTS = [
  ...(GirlsProducts || []),
  ...(KidsProducts || []),
  ...(MensProducts || []),
  ...(WomensProducts || []),
];

// Create a fast lookup map: { productId: productObject }
const PRODUCTS_MAP = ALL_PRODUCTS.reduce((acc, product) => {
  if (product?.id) acc[product.id] = product;
  return acc;
}, {});

/* ============================== WishList Component ============================== */
const WishList = () => {
  // ✅ Load wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Sync with localStorage (cross-tab + on mount)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'wishlist' && e.newValue) {
        try {
          setWishlist(JSON.parse(e.newValue));
        } catch {
          /* ignore corrupt storage */
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Sync on mount (in case user navigated back from a product page)
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch {
        /* ignore corrupt storage */
      }
    }

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // ✅ Enrich wishlist items with full product data (from the master map)
  // This handles the case where wishlist only stored IDs (older data).
  const enrichedWishlist = wishlist
    .map((item) => {
      // If item already has full data (name, price), use it
      if (item.name && item.price) return item;
      // Otherwise, look up by ID from the master map
      return PRODUCTS_MAP[item.id] || null;
    })
    .filter(Boolean); // Remove any nulls (products that no longer exist)

  // ✅ Remove item from wishlist
  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  // ✅ Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  /* ---------- Empty State ---------- */
  if (enrichedWishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40">
        <div className="max-w-md text-center">
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
        </div>
      </div>
    );
  }

  /* ---------- Wishlist Grid ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
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
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {enrichedWishlist.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
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

                {/* Category Tag (Optional - Shows where the product came from) */}
                {product.category && (
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur text-gray-700 rounded-full shadow-sm">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-4">
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
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  className="mt-4 cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

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