import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
  FaUndoAlt,
  FaMinus,
  FaPlus,
  FaCheckCircle,
  FaBolt,
  FaShareAlt,
} from 'react-icons/fa';

/* ----------------------------------------------------------------
   ✅ Data imports — src/AllProductsData/*  (../../ escapes
      Components/CATEGORIES/ and reaches src/)
--------------------------------------------------------------- */
import { GirlsProducts } from '../../AllProductsData/GirlsProduct';
import { KidsProducts } from '../../AllProductsData/KidsProduct';
import { MensProducts } from '../../AllProductsData/MensProduct';
import { WomensProducts } from '../../AllProductsData/WomensProduct';
import { Trending } from '../../AllProductsData/TrendingProduct';

/* ----------------------------------------------------------------
   ✅ Shared stores — src/utils/* and src/hooks/*
      FIXED: was ../utils → must be ../../utils
--------------------------------------------------------------- */
import { addToCart as addToCartStore } from '../../utils/cartStore';
import { toggleWishlist as toggleWishlistStore } from '../../utils/wishlistStore';
import { useWishlistAutoReload } from '../../hooks/useWishlistAutoReload';

/* ---------- Constants ---------- */
const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" fill="%239ca3af" font-family="sans-serif" font-size="20" text-anchor="middle" dy=".3em">No image</text></svg>';

/* ---------- Build a unified product lookup ---------- */
const ALL_PRODUCTS = [
  ...(GirlsProducts || []),
  ...(KidsProducts || []),
  ...(MensProducts || []),
  ...(WomensProducts || []),
  ...(Trending || []),
];

/* ---------- Helpers ---------- */
const normalizeId = (v) => (v == null ? '' : String(v));
const normalizeCategory = (v) => (v == null ? '' : String(v).toLowerCase().trim());

const formatINR = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return '₹0';
  return `₹${num.toLocaleString('en-IN')}`;
};

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

/* ================================================================
   ProductDetails
   Route: /products/:category/:productId
   ================================================================ */
const ProductDetails = () => {
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const { items: wishlist } = useWishlistAutoReload();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [justAdded, setJustAdded] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message }
  const [activeTab, setActiveTab] = useState('description');

  const addedTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  /* ---------- Toast helper ---------- */
  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

  /* ----------------------------------------------------------------
     FETCH product — resolves by category+id first, then id-only
  ---------------------------------------------------------------- */
  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        await new Promise((r) => setTimeout(r, 200)); // simulate network

        const pid = normalizeId(productId);
        const cat = normalizeCategory(category);

        // 1️⃣ prefer strict category+id match
        let found = cat
          ? ALL_PRODUCTS.find(
              (p) =>
                normalizeId(p.id) === pid &&
                normalizeCategory(p.category) === cat
            )
          : null;

        // 2️⃣ fall back to id-only
        if (!found) {
          found = ALL_PRODUCTS.find((p) => normalizeId(p.id) === pid);
        }

        if (cancelled) return;

        if (found) {
          setProduct(found);
          setSelectedSize(found.sizes?.[0] ?? null);
          setSelectedColor(found.colors?.[0] ?? null);
          setQty(1);
        } else {
          setProduct(null);
          setError('Product not found');
        }
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load product');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [productId, category]);

  /* ---------- Cleanup timers ---------- */
  useEffect(
    () => () => {
      clearTimeout(addedTimerRef.current);
      clearTimeout(toastTimerRef.current);
    },
    []
  );

  /* ---------- Derived ---------- */
  const discount = useMemo(() => {
    if (!product?.oldPrice || !product?.price) return 0;
    return Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
  }, [product]);

  const inStock = product ? product.inStock !== false : false;
  const maxQty = Math.max(1, Number(product?.stock) || 10);

  const isWishlisted = useMemo(
    () =>
      product
        ? wishlist.some((i) => normalizeId(i.id) === normalizeId(product.id))
        : false,
    [wishlist, product]
  );

  /* ---------- Related products (category OR subCategory) ---------- */
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const cat = normalizeCategory(product.category);
    const sub = normalizeCategory(product.subCategory);

    return ALL_PRODUCTS.filter((p) => {
      if (normalizeId(p.id) === normalizeId(product.id)) return false;
      const pCat = normalizeCategory(p.category);
      const pSub = normalizeCategory(p.subCategory);
      return (cat && pCat === cat) || (sub && pSub === sub);
    }).slice(0, 4);
  }, [product]);

  /* ---------- Thumbnails (dedup, fall back to single) ---------- */
  const thumbnails = useMemo(() => {
    if (!product?.image) return [];
    const list =
      Array.isArray(product.images) && product.images.length
        ? product.images
        : [product.image];
    return Array.from(new Set(list)).slice(0, 4);
  }, [product]);

  /* ---------- Cart payload builder ---------- */
  const buildCartItem = useCallback(() => {
    if (!product) return null;
    return {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: qty,
    };
  }, [product, selectedSize, selectedColor, qty]);

  /* ---------- Handlers ---------- */
  const validateSelection = useCallback(() => {
    if (product?.sizes?.length && !selectedSize) {
      showToast('error', 'Please select a size');
      return false;
    }
    if (product?.colors?.length && !selectedColor) {
      showToast('error', 'Please select a color');
      return false;
    }
    return true;
  }, [product, selectedSize, selectedColor, showToast]);

  const handleAddToCart = useCallback(() => {
    if (!product || !inStock) return;
    if (!validateSelection()) return;

    const cartItem = buildCartItem();
    addToCartStore(cartItem);
    setJustAdded(true);
    clearTimeout(addedTimerRef.current);
    addedTimerRef.current = setTimeout(() => setJustAdded(false), 1200);
  }, [product, inStock, validateSelection, buildCartItem]);

  const handleBuyNow = useCallback(() => {
    if (!product || !inStock) return;
    if (!validateSelection()) return;

    const cartItem = buildCartItem();
    addToCartStore(cartItem);
    navigate('/checkout', {
      state: { buyNowItemId: product.id, buyNowProduct: cartItem },
    });
  }, [product, inStock, validateSelection, buildCartItem, navigate]);

  const handleWishlist = useCallback(() => {
    if (!product) return;
    toggleWishlistStore(product);
  }, [product]);

  const handleShare = useCallback(async () => {
    if (!product) return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast('success', 'Link copied to clipboard');
      } else {
        showToast('error', 'Sharing not supported');
      }
    } catch (err) {
      if (err?.name !== 'AbortError') {
        console.warn('Share failed:', err);
      }
    }
  }, [product, showToast]);

  /* ----------------------------------------------------------------
     Loading state — mirrors real layout
  ---------------------------------------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-64 rounded bg-gray-200 animate-pulse mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 w-24 rounded bg-gray-200 animate-pulse" />
              <div className="h-9 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
              <div className="h-12 w-1/3 rounded bg-gray-200 animate-pulse" />
              <div className="h-24 w-full rounded bg-gray-200 animate-pulse" />
              <div className="h-12 w-full rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------------------
     Not found state
  ---------------------------------------------------------------- */
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-indigo-50 via-white to-rose-50">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-rose-100 flex items-center justify-center">
            <FaShieldAlt className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || 'Product not found'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            The product you're looking for doesn't exist or was removed.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------------------
     Main
  ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap"
        >
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/products" className="hover:text-indigo-600 transition-colors">
            Products
          </Link>
          {category && (
            <>
              <span aria-hidden>/</span>
              <Link
                to={`/products/${category}`}
                className="capitalize hover:text-indigo-600 transition-colors"
              >
                {category}
              </Link>
            </>
          )}
          <span aria-hidden>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[180px]">
            {product.name}
          </span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ---------- Left: Image ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
              <img
                src={product.image || FALLBACK_IMAGE}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover"
              />

              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-full text-white bg-gradient-to-r from-rose-500 to-pink-500 shadow-md">
                  -{discount}% OFF
                </span>
              )}

              {product.badge && (
                <span className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold rounded-full bg-indigo-600 text-white shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail strip — only if >1 unique image */}
            {thumbnails.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {thumbnails.map((img, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      i === 0
                        ? 'border-indigo-500'
                        : 'border-gray-100 hover:border-indigo-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ---------- Right: Details ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-col"
          >
            {/* Category + Actions */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 rounded-full">
                {product.category || 'Fashion'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 flex items-center justify-center transition-all cursor-pointer"
                >
                  <FaShareAlt className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleWishlist}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  aria-pressed={isWishlisted}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-500 hover:text-rose-500 hover:border-rose-300'
                  }`}
                >
                  <FaHeart
                    className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating || 0)
                        ? 'text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {product.rating ?? '—'}
              </span>
              <span className="text-sm text-gray-400">
                ({product.reviews ?? 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-200 flex-wrap">
              <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {formatINR(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formatINR(product.oldPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-semibold text-emerald-600">
                  You save {formatINR(product.oldPrice - product.price)}
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Color:{' '}
                  <span className="text-gray-600 font-normal">
                    {selectedColor || '—'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      aria-pressed={selectedColor === color}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Size:{' '}
                  <span className="text-gray-600 font-normal">
                    {selectedSize || '—'}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`min-w-[44px] px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-2">Quantity</p>
              <div className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <FaMinus className="w-3 h-3" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-gray-900">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                  disabled={qty >= maxQty}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <FaPlus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              {inStock ? (
                <>
                  <FaCheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">
                    In stock — ready to ship
                  </span>
                </>
              ) : (
                <span className="text-sm font-medium text-rose-500">
                  Out of stock
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`buy-now-btn flex-1 ${justAdded ? 'is-added' : ''} ${
                  !inStock ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {justAdded ? (
                  <>
                    <FaCheckCircle className="buy-now-icon" />
                    <span className="buy-now-label">Added to Cart</span>
                  </>
                ) : (
                  <>
                    <FaShoppingCart className="buy-now-icon" />
                    <span className="buy-now-label">Add to Cart</span>
                  </>
                )}
              </button>

              <Link to="/order"
                type="button"
                onClick={handleBuyNow}
                disabled={!inStock}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-orange-600 hover:to-rose-500 transition-all shadow-sm hover:shadow-md hover:shadow-orange-500/40 ${
                  !inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <FaBolt className="w-3.5 h-3.5" />
                Buy Now
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: FaTruck, label: 'Free shipping' },
                { icon: FaUndoAlt, label: '30-day returns' },
                { icon: FaShieldAlt, label: 'Secure checkout' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl bg-white border border-gray-100 px-3 py-2.5 text-xs font-medium text-gray-600"
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Tabs ---------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div
            role="tablist"
            className="flex border-b border-gray-100 overflow-x-auto"
          >
            {[
              { key: 'description', label: 'Description' },
              { key: 'details', label: 'Details' },
              { key: 'shipping', label: 'Shipping & Returns' },
            ].map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 sm:px-6 py-3.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'description' && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description ||
                      'A beautifully crafted piece made with premium materials for everyday wear. Designed for comfort and durability.'}
                  </p>
                )}

                {activeTab === 'details' && (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <DetailRow label="Category" value={product.category} />
                    <DetailRow label="Sub Category" value={product.subCategory} />
                    <DetailRow
                      label="Available Sizes"
                      value={product.sizes?.join(', ') || '—'}
                    />
                    <DetailRow
                      label="Available Colors"
                      value={product.colors?.join(', ') || '—'}
                    />
                    <DetailRow
                      label="Rating"
                      value={product.rating != null ? `${product.rating} / 5` : '—'}
                    />
                    <DetailRow label="Reviews" value={product.reviews ?? '—'} />
                  </dl>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <strong className="text-gray-900">Free shipping</strong> on
                      orders above ₹1500. Standard delivery in 3–5 business days.
                    </p>
                    <p>
                      <strong className="text-gray-900">30-day returns.</strong>{' '}
                      Not satisfied? Return within 30 days for a full refund.
                    </p>
                    <p>
                      <strong className="text-gray-900">Secure checkout.</strong>{' '}
                      All payments are 256-bit SSL encrypted.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ---------- Related products ---------- */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12"
          >
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  You might also like
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Similar picks from the {product.category} collection
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/products/${normalizeCategory(rp.category)}/${rp.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={rp.image || FALLBACK_IMAGE}
                      alt={rp.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {rp.name}
                    </p>
                    <p className="text-sm font-bold text-indigo-600 mt-1">
                      {formatINR(rp.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* ---------- Toast ---------- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            role="status"
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg ${
              toast.type === 'error'
                ? 'bg-rose-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- Small helper ---------- */
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between gap-3 py-2 border-b border-gray-100">
    <dt className="text-gray-500">{label}</dt>
    <dd className="font-medium text-gray-900 text-right">{value || '—'}</dd>
  </div>
);

export default ProductDetails;