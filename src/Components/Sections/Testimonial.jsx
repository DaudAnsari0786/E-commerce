import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Harsh Kumar', role: 'Verified Buyer', text: 'Amazing quality and fast shipping! The denim jacket I ordered fits perfectly and looks even better in person.', avatar: 'https://i.pravatar.cc/100?img=1', rating: 5 },
  { name: 'Abdul Gani.', role: 'Verified Buyer', text: 'StyleCraft has become my go-to for clothes. Prices are great, and returns are super easy. Highly recommend!', avatar: 'https://i.pravatar.cc/100?img=12', rating: 5 },
  { name: 'Priya R.', role: 'Verified Buyer', text: 'Love the variety! I found outfits for my whole family in one place. Will definitely shop here again.', avatar: 'https://i.pravatar.cc/100?img=5', rating: 5 },
];

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Testimonial = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-indigo-50 via-white to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.span
            whileHover={{ scale: 1.08, y: -2 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className="inline-block cursor-pointer px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-indigo-700 bg-indigo-100 rounded-full mb-3 transition-colors duration-300 hover:bg-indigo-200 hover:text-indigo-800"
          >
            Testimonials
          </motion.span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
            <span className="text-gray-900">What Our Customers </span>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Real reviews from real shoppers
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              className="group relative cursor-pointer overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ease-in hover:shadow-2xl hover:border-indigo-200"
            >
              {/* Gradient glow overlay on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-rose-500/0 opacity-0 transition-opacity duration-300 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-rose-500/10 group-hover:opacity-100" />

              {/* Top accent bar that slides in */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 transition-transform duration-300 ease-in group-hover:scale-x-100" />

              {/* Stars */}
              <div className="relative flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="text-amber-400 text-sm transition-transform duration-300 ease-in group-hover:scale-110"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="relative text-sm sm:text-base text-slate-600 mb-4 italic leading-relaxed transition-colors duration-300 ease-in group-hover:text-slate-800">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="relative flex items-center gap-3 pt-4 border-t border-gray-100 transition-colors duration-300 ease-in group-hover:border-indigo-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100 transition-all duration-300 ease-in group-hover:ring-indigo-400 group-hover:scale-110"
                />
                <div className="transition-transform duration-300 ease-in group-hover:translate-x-1">
                  <div className="text-sm font-bold text-slate-900 transition-colors duration-300 ease-in group-hover:text-indigo-700">
                    {t.name}
                  </div>
                  <div className="text-xs text-indigo-500 font-medium">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;