import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHeart,
  FaLeaf,
  FaHandshake,
  FaGem,
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
  FaUsers,
  FaAward,
  FaGlobe,
  FaArrowRight,
  FaQuoteLeft,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/* ---------- Data ---------- */
const stats = [
  { icon: FaUsers, value: '50K+', label: 'Happy customers' },
  { icon: FaGem, value: '500+', label: 'Styles crafted' },
  { icon: FaGlobe, value: '120+', label: 'Cities served' },
  { icon: FaAward, value: '4.9★', label: 'Average rating' },
];

const values = [
  {
    icon: FaLeaf,
    title: 'Sustainable by design',
    desc: 'We source organic and recycled fabrics, and offset 100% of our shipping emissions.',
    theme: 'emerald',
  },
  {
    icon: FaHandshake,
    title: 'Fair & ethical',
    desc: 'Every garment is made in certified factories where artisans earn fair wages.',
    theme: 'indigo',
  },
  {
    icon: FaHeart,
    title: 'Made with care',
    desc: 'Small-batch production means more attention to detail in every stitch.',
    theme: 'rose',
  },
  {
    icon: FaShieldAlt,
    title: 'Built to last',
    desc: 'Timeless silhouettes and quality materials that survive trends and seasons.',
    theme: 'amber',
  },
];

const themeStyles = {
  indigo: { tile: 'bg-gradient-to-br from-indigo-500 to-indigo-600', ring: 'ring-indigo-100' },
  emerald: { tile: 'bg-gradient-to-br from-emerald-500 to-emerald-600', ring: 'ring-emerald-100' },
  rose: { tile: 'bg-gradient-to-br from-rose-500 to-rose-600', ring: 'ring-rose-100' },
  amber: { tile: 'bg-gradient-to-br from-amber-500 to-amber-600', ring: 'ring-amber-100' },
};

const timeline = [
  {
    year: '2018',
    title: 'A small idea',
    desc: 'StyleCraft started in a Delhi apartment with 12 hand-stitched jackets and a big dream.',
  },
  {
    year: '2020',
    title: 'Going online',
    desc: 'We launched our first online store and shipped to 8 cities within the first month.',
  },
  {
    year: '2022',
    title: 'Sustainable shift',
    desc: 'We switched to 100% organic cotton and recycled packaging across every product line.',
  },
  {
    year: '2024',
    title: '50K community',
    desc: 'Half a million orders later, we hit 50,000 happy customers and opened a flagship studio.',
  },
];

const team = [
  { name: 'Ayesha Khan', role: 'Founder & Creative Director', initials: 'AK', color: 'from-indigo-500 to-purple-600' },
  { name: 'Rahul Verma', role: 'Head of Design', initials: 'RV', color: 'from-emerald-500 to-teal-600' },
  { name: 'Priya Sharma', role: 'Sustainability Lead', initials: 'PS', color: 'from-rose-500 to-pink-600' },
  { name: 'Imran Ali', role: 'Head of Operations', initials: 'IA', color: 'from-amber-500 to-orange-600' },
];

const promises = [
  { icon: FaTruck, label: 'Free shipping', desc: 'On orders over ₹1500' },
  { icon: FaUndoAlt, label: '30-day returns', desc: 'Hassle-free, no questions' },
  { icon: FaShieldAlt, label: 'Secure payment', desc: '256-bit SSL encryption' },
];

/* ============================== Component ============================== */
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/40">
      {/* ---------- Hero header ---------- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              <FaHeart className="w-3 h-3" />
              Our story
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Fashion that feels like home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed"
          >
            We craft timeless pieces from sustainable materials — for people who
            dress with intention, not just for trends.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-xl bg-white text-indigo-700 px-5 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Shop the collection
              <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:bg-white/25 transition-all duration-200"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>

        <div className="relative">
          <svg
            className="block w-full h-8 sm:h-12 text-slate-50"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,32 C240,60 480,0 720,20 C960,40 1200,60 1440,32 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </div>

      {/* ---------- Main content ---------- */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-4 sm:-mt-6">
        {/* ---------- Stats ---------- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-100 p-5 text-center transition-all duration-200"
            >
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- Story section ---------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-center"
        >
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-rose-100 aspect-[4/5] flex items-center justify-center p-8">
              <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/60 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/60 blur-3xl" />

              <div className="relative text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-lg mb-4">
                  <FaQuoteLeft className="w-6 h-6" />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                  "We design clothes for the person you're becoming — not the
                  person you used to be."
                </p>
                <p className="mt-4 text-sm text-gray-600">— Ayesha Khan, Founder</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              Our mission
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Timeless style, thoughtfully made.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              We started StyleCraft with a simple belief: fashion should feel
              personal, not mass-produced. Every piece in our collection is
              designed in-house, made from sustainable materials, and crafted to
              last through seasons — not just trends.
            </p>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              We work with small family-run factories and independent artisans
              across India. That means slower production, fairer wages, and
              better clothes. No compromises, no shortcuts.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {promises.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <Icon className="w-4 h-4 text-indigo-600 mx-auto mb-1.5 transition-transform duration-200 group-hover:scale-110" />
                  <p className="text-xs font-bold text-gray-900">{label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ---------- Values ---------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              <FaGem className="w-3 h-3" />
              What we stand for
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
              The values behind every stitch
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
              Four principles guide everything we make — from fabric selection
              to the final package on your doorstep.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc, theme }) => {
              const t = themeStyles[theme] || themeStyles.indigo;
              return (
                <motion.div
                  key={title}
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-6 transition-all duration-200"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${t.tile} text-white flex items-center justify-center shadow-md mb-4 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                  <div
                    className={`absolute inset-x-6 bottom-0 h-0.5 rounded-full bg-gradient-to-r ${t.tile} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300`}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ---------- Timeline ---------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              <FaAward className="w-3 h-3" />
              Our journey
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
              How we got here
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-rose-200 sm:-translate-x-1/2" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  className={`relative flex items-start gap-5 sm:gap-8 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 mt-1.5">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 * i }}
                      className="block h-3.5 w-3.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 ring-4 ring-white shadow-md"
                    />
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-8 shrink-0 sm:hidden" />

                  {/* Card */}
                  <div
                    className={`flex-1 sm:w-1/2 ${
                      i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'
                    }`}
                  >
                    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-200 p-5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2.5 py-0.5 text-[10px] font-bold tracking-wider shadow-sm">
                        {item.year}
                      </span>
                      <h3 className="mt-2.5 text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right spacer for desktop */}
                  <div className="hidden sm:block sm:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ---------- Team ---------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              <FaUsers className="w-3 h-3" />
              The team
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
              The people behind StyleCraft
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
              A small, focused team that cares deeply about the details.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(({ name, role, initials, color }) => (
              <motion.div
                key={name}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-5 text-center transition-all duration-200"
              >
                <div className="relative inline-block mb-3">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center text-2xl font-bold shadow-md transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3`}
                  >
                    {initials}
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">{name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{role}</p>

                {/* Social reveal on hover */}
                <div className="mt-3 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                    <span
                      key={i}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gray-50 text-gray-400 hover:bg-indigo-100 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      <Icon className="w-2.5 h-2.5" />
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ---------- CTA ---------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div
            variants={fadeInUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 p-8 sm:p-12 text-center text-white shadow-2xl shadow-indigo-500/20"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center">
                <FaHeart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                Ready to find your style?
              </h2>
              <p className="text-sm sm:text-base text-white/85 max-w-lg mx-auto mb-7">
                Explore the collection and discover pieces made with care,
                designed to last, and priced fairly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white text-indigo-700 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Shop now
                  <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/25 transition-all duration-200"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;