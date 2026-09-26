import React from 'react';
import { motion } from 'framer-motion';
import About from "./About"
import Arrival from "./Arrivals"
import Shop from '../FEATURES/AllproductNav';
import Contact from './Contact';
import Testimonial from "./Testimonial"
import Profile from '../Forms/Profile';
const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const floatBadge = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const floatCard = {
    animate: {
      y: [0, -6, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
    },
  };

  // Marquee brands
  const brands = ['ZARA', 'H&M', 'GUCCI', 'PRADA', 'NIKE', 'LEVI\'S', 'UNIQLO', 'MANGO'];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Decorative blurred blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute -bottom-24 -right-24 w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute top-1/3 left-1/2 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl -translate-x-1/2"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20 w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* ---------- TEXT ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center md:text-left order-2 md:order-1"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold text-indigo-700 bg-indigo-100/80 backdrop-blur rounded-full mb-5 sm:mb-6 shadow-sm border border-indigo-200/50"
            >
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              New Season 2025 Drop
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight"
            >
              Dress Well.
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
                  Feel Better.
                </span>
                {/* Underline squiggle */}
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                  viewBox="0 0 300 12"
                  className="absolute -bottom-2 left-0 w-full h-3"
                  fill="none"
                >
                  <motion.path
                    d="M2 8 Q 75 2, 150 7 T 298 5"
                    stroke="url(#grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="50%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 sm:mt-7 text-gray-600 text-base sm:text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed"
            >
              Timeless clothing crafted for comfort, confidence, and everyday style. Find your signature look today.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-9 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(79,70,229,0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 text-white rounded-full font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                Shop Now
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="w-6 h-6 rounded-full bg-gray-900 group-hover:bg-white flex items-center justify-center transition-colors">
                  <span className="text-white group-hover:text-gray-900 text-[10px]">▶</span>
                </span>
                View Lookbook
              </motion.button>
            </motion.div>

            {/* Avatars + rating row (NEW) */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center md:justify-start"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?img=${i + 10}`}
                    alt={`Customer ${i}`}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                ))}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                  9k+
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-0.5 text-amber-400 text-sm">
                  ★★★★★
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Loved by <span className="font-semibold text-gray-800">50,000+</span> customers
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200/70 flex gap-5 sm:gap-8 justify-center md:justify-start"
            >
              {[
                { value: '500+', label: 'Styles' },
                { value: '50k+', label: 'Happy Customers' },
                { value: '4.9★', label: 'Rating' },
              ].map((stat, i) => (
                <React.Fragment key={i}>
                  <div className="text-center md:text-left">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                  {i < 2 && <div className="w-px bg-gray-200 self-center h-10"></div>}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------- IMAGE ---------- */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="relative order-1 md:order-2 max-w-sm sm:max-w-md md:max-w-none mx-auto w-full"
          >
            {/* Rotated gradient frame */}
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.25, rotate: 4 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-500 to-rose-500 rounded-[2rem]"
            />
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.15, rotate: -4 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-bl from-rose-500 to-indigo-600 rounded-[2rem]"
            />

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=700&fit=crop"
              alt="Fashion model"
              className="relative rounded-[2rem] shadow-2xl w-full object-cover h-[360px] sm:h-[440px] md:h-[520px] lg:h-[580px]"
            />

            {/* Floating tag (bottom-left) */}
            <motion.div
              variants={floatBadge}
              animate="animate"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-4 sm:-bottom-5 -left-3 sm:-left-5 bg-white/90 backdrop-blur rounded-2xl shadow-xl px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3 border border-white/60"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-base sm:text-lg">
                ✨
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500">Trending now</p>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">Summer Essentials</p>
              </div>
            </motion.div>

            {/* Discount badge (top-right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 8 }}
              transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 150 }}
              whileHover={{ scale: 1.15, rotate: 0 }}
              className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center shadow-xl shadow-rose-500/40"
            >
              <span className="text-[9px] sm:text-[10px]">UP TO</span>
              <span className="text-sm sm:text-xl font-bold">50%</span>
              <span className="text-[9px] sm:text-[10px]">OFF</span>
            </motion.div>

            {/* NEW: Free shipping pill (top-left) */}
            <motion.div
              variants={floatCard}
              animate="animate"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute top-4 -left-3 sm:top-6 sm:-left-6 bg-white/90 backdrop-blur rounded-full shadow-lg px-3 sm:px-4 py-2 flex items-center gap-2 border border-white/60"
            >
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px]">
                ✓
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-gray-800">Free Shipping</p>
            </motion.div>

            {/* NEW: Small product thumbnail card (bottom-right) */}
            <motion.div
              variants={floatCard}
              animate="animate"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="hidden sm:block absolute -bottom-6 -right-4 md:-right-6 bg-white/90 backdrop-blur rounded-2xl shadow-xl p-3 border border-white/60 w-40"
            >
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop"
                alt="Product"
                className="w-full h-20 object-cover rounded-lg"
              />
              <p className="text-[10px] text-gray-500 mt-2">Just dropped</p>
              <p className="text-xs font-semibold text-gray-900">Classic Tee — $29</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---------- BRAND MARQUEE (bottom) ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative border-t border-gray-200/70 bg-white/40 backdrop-blur-sm overflow-hidden py-5 sm:py-6"
      >
        <div className="flex gap-12 sm:gap-16 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="text-lg sm:text-2xl font-bold text-gray-400/70 tracking-widest hover:text-gray-700 transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>
      </motion.div>


<div className="">
  <Profile/>
</div>

<div className="">
  {/* <Testimonial/> */}
</div>
      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Home;