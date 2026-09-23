import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Minus,
    Plus,
    Trash2,
    Heart,
    ShoppingBag,
    Tag,
    Truck,
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    ShoppingCart,
} from 'lucide-react';

import products from '../../Product.js';

const Cart = () => {
    // ---------- Build demo cart from products array (first 3 items) ----------
    const [items, setItems] = useState(
        products.slice(0, 3).map((p) => ({
            id: p.id,
            name: p.name,
            category:
                p.category.charAt(0).toUpperCase() + p.category.slice(1), // "mens" → "Mens"
            price: p.price,
            oldPrice: p.oldPrice,
            quantity: 1,
            size: p.sizes?.[1] || p.sizes?.[0] || 'M',
            color: p.colors?.[0] || 'Default',
            image: p.image,
        }))
    );

    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [promoError, setPromoError] = useState('');

    // ---------- Handlers ----------
    const updateQty = (id, delta) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const applyPromo = (e) => {
        e.preventDefault();
        setPromoError('');
        const codes = { SAVE10: 10, SAVE20: 20, WELCOME15: 15 };
        const code = promoCode.trim().toUpperCase();

        if (codes[code]) {
            setAppliedPromo({ code, discount: codes[code] });
            setPromoCode('');
        } else {
            setPromoError('Invalid promo code');
        }
    };

    // ---------- Calculations ----------
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = appliedPromo ? Math.round((subtotal * appliedPromo.discount) / 100) : 0;
    const shipping = subtotal > 999 ? 0 : 99;
    const tax = Math.round((subtotal - discount) * 0.05);
    const total = subtotal - discount + shipping + tax;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // ---------- ✅ NEW: Pick 6 random products for "You may also like" ----------
    const recommendedProducts = React.useMemo(() => {
        // Filter out items already in the cart
        const cartIds = items.map((i) => i.id);
        const available = products.filter((p) => !cartIds.includes(p.id));

        // Shuffle & take first 6
        const shuffled = [...available].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 8);
    }, [items]);

    // ---------- Empty cart view ----------
    if (items.length === 0) {
        return (
            <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md text-center"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-blue-700" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Your cart is empty
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Looks like you haven't added anything yet. Start exploring our
                        latest collections!
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </motion.div>
            </section>
        );
    }

    return (
        <section className="bg-gray-50 min-h-screen py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ---------- Header ---------- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-700 mb-3 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                        Shopping Cart
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                        You have{' '}
                        <span className="font-semibold text-blue-700">{totalItems}</span>{' '}
                        {totalItems === 1 ? 'item' : 'items'} in your cart
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* ==================== LEFT: CART ITEMS ==================== */}
                    <div className="lg:col-span-2 space-y-3">
                        <AnimatePresence>
                            {items.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-gray-100 transition-shadow"
                                >
                                    <div className="flex gap-4">
                                        {/* Image */}
                                        <Link
                                            to={`/shop/${item.category.toLowerCase()}`}
                                            className="shrink-0"
                                        >
                                            <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-xl overflow-hidden bg-gray-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </Link>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <span className="inline-block text-[10px] sm:text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mb-1.5">
                                                        {item.category}
                                                    </span>
                                                    <Link to={`/shop/${item.category.toLowerCase()}`}>
                                                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-700 transition-colors line-clamp-2">
                                                            {item.name}
                                                        </h3>
                                                    </Link>
                                                    <div className="flex items-center gap-3 mt-1 text-xs sm:text-sm text-gray-500">
                                                        <span>
                                                            Size:{' '}
                                                            <span className="text-gray-700 font-medium">
                                                                {item.size}
                                                            </span>
                                                        </span>
                                                        <span>•</span>
                                                        <span>
                                                            Color:{' '}
                                                            <span className="text-gray-700 font-medium">
                                                                {item.color}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="sm:hidden cursor-pointer text-gray-400 hover:text-red-500 p-1 transition-colors"
                                                    aria-label="Remove"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <div className="mt-2 flex items-baseline gap-2">
                                                <span className="text-base sm:text-lg font-bold text-gray-900">
                                                    ₹{item.price.toLocaleString('en-IN')}
                                                </span>
                                                {item.oldPrice && (
                                                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                                                        ₹{item.oldPrice.toLocaleString('en-IN')}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Quantity + Actions */}
                                            <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                                                <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden bg-white">
                                                    <button
                                                        onClick={() => updateQty(item.id, -1)}
                                                        className="w-8 cursor-pointer h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-10 text-center text-sm font-semibold text-gray-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQty(item.id, 1)}
                                                        className=" cursor-pointer w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                <div className="hidden sm:flex items-center gap-2">
                                                    <button className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
                                                        <Heart className="w-3.5 h-3.5" />
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="cursor-pointer inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-500 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Remove
                                                    </button>
                                                </div>

                                                <div className="hidden sm:block text-right">
                                                    <div className="text-xs text-gray-500">Subtotal</div>
                                                    <div className="text-sm font-bold text-gray-900">
                                                        ₹
                                                        {(item.price * item.quantity).toLocaleString(
                                                            'en-IN'
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setItems([])}
                                className="cursor-pointer font-bold text-xs sm:text-sm text-gray-500 hover:text-red-500 underline underline-offset-4 transition-colors"
                            >
                                Clear cart
                            </button>
                        </div>
                    </div>

                    {/* ==================== RIGHT: ORDER SUMMARY ==================== */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="lg:sticky lg:top-24 space-y-4"
                        >
                            {/* Promo code */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-blue-700" />
                                    Promo Code
                                </h3>
                                {appliedPromo ? (
                                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-semibold text-green-700">
                                                {appliedPromo.code}
                                            </span>
                                            <span className="text-xs text-green-600">
                                                -{appliedPromo.discount}%
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setAppliedPromo(null)}
                                            className="cursor-pointer text-green-700 hover:text-red-500 text-xs font-medium underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={applyPromo} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        />
                                        <button
                                            type="submit"
                                            className=" cursor-pointer px-4 py-2 bg-gray-900 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </form>
                                )}
                                {promoError && (
                                    <p className="text-xs text-red-500 mt-2">{promoError}</p>
                                )}
                                {!appliedPromo && (
                                    <p className="text-[10px] text-gray-400 mt-2">
                                        Try: SAVE10, SAVE20, WELCOME15
                                    </p>
                                )}
                            </div>

                            {/* Summary */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Order Summary
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">
                                            ₹{subtotal.toLocaleString('en-IN')}
                                        </span>
                                    </div>

                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount ({appliedPromo.discount}%)</span>
                                            <span className="font-medium">
                                                -₹{discount.toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        {shipping === 0 ? (
                                            <span className="font-medium text-green-600">FREE</span>
                                        ) : (
                                            <span className="font-medium text-gray-900">
                                                ₹{shipping}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (5%)</span>
                                        <span className="font-medium text-gray-900">
                                            ₹{tax.toLocaleString('en-IN')}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline">
                                        <span className="text-base font-semibold text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-xl font-bold text-blue-700">
                                            ₹{total.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="cursor-pointer w-full mt-5 inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-blue-700/20"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>

                                <p className="text-[10px] text-center text-gray-500 mt-3">
                                    Free shipping on orders over ₹999
                                </p>
                            </div>

                            {/* Trust badges */}
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                                {[
                                    { icon: Truck, text: 'Free shipping over ₹999' },
                                    { icon: ShieldCheck, text: '100% secure payments' },
                                    { icon: Heart, text: 'Easy 30-day returns' },
                                ].map(({ icon: Icon, text }) => (
                                    <div
                                        key={text}
                                        className="flex items-center gap-3 text-xs sm:text-sm text-gray-600"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-blue-700" />
                                        </div>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* ==================== YOU MAY ALSO LIKE ==================== */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12"
                >
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
                        You may also like
                    </h2>

                    {/* ✅ Loop through recommendedProducts */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recommendedProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all"
                            >
                                <Link to={`/shop/${product.category}`}>
                                    <div className="aspect-[2/2] overflow-hidden bg-gray-100">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-3 grid grid-rows-1">
                                        <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate mb-1">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-blue-700">
                                                ₹{product.price.toLocaleString('en-IN')}
                                            </span>
                                            {product.oldPrice && (
                                                <span className="text-xs text-gray-400 line-through">
                                                    ₹{product.oldPrice.toLocaleString('en-IN')}
                                                </span>
                                            )}
                                        </div>
<Link
  to="/cart"
  style={{
    background: 'linear-gradient(90deg, #1e40af 0%, #4f46e5 100%)',
  }}
  className="inline-flex items-center justify-center gap-2 w-full text-center active:bg-blue-800 rounded-lg mt-3 font-semibold text-white py-3
             hover:opacity-90 transition-opacity duration-300 shadow-lg"
>
  <ShoppingCart className="w-4 h-4" />
  Buy Now
</Link> 
                                  </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Cart;