import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaBook,
  FaSearch,
  FaTimes,
  FaDownload,
  FaArrowRight,
  FaClock,
  FaStar,
  FaHeart,
  FaLeaf,
  FaRulerCombined,
  FaPalette,
  FaShoePrints,
  FaVideo,
  FaFilePdf,
  FaBookOpen,
  FaLightbulb,
  FaChevronRight,
  FaNewspaper,
  FaTags,
} from 'react-icons/fa';

/* ---------- Animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/* ---------- Data ---------- */
const categories = [
  { key: 'all', label: 'All resources', icon: FaBookOpen },
  { key: 'guides', label: 'Style guides', icon: FaBook },
  { key: 'sizing', label: 'Sizing', icon: FaRulerCombined },
  { key: 'fabric', label: 'Fabrics', icon: FaLeaf },
  { key: 'color', label: 'Colors', icon: FaPalette },
  { key: 'care', label: 'Care tips', icon: FaHeart },
];

const resources = [
  {
    category: 'guides',
    type: 'Article',
    icon: FaBook,
    title: 'The complete capsule wardrobe guide',
    desc: 'Build a timeless closet with 30 essential pieces you can mix and match all year.',
    readTime: '8 min read',
    featured: true,
    theme: 'indigo',
    to: '/blog/capsule-wardrobe',
  },
  {
    category: 'sizing',
    type: 'Tool',
    icon: FaRulerCombined,
    title: 'Size & fit calculator',
    desc: 'Enter your measurements and get your perfect fit across every StyleCraft piece.',
    readTime: 'Interactive',
    featured: true,
    theme: 'emerald',
    to: '/size-guide',
  },
  {
    category: 'color',
    type: 'Guide',
    icon: FaPalette,
    title: 'Color theory for everyday outfits',
    desc: 'Learn how to pair colors that flatter your tone and elevate any look.',
    readTime: '6 min read',
    theme: 'amber',
    to: '/blog/color-theory',
  },
  {
    category: 'fabric',
    type: 'Article',
    icon: FaLeaf,
    title: 'Cotton vs. linen vs. modal: which to choose',
    desc: 'A practical breakdown of what each fabric does best — and when to wear it.',
    readTime: '5 min read',
    theme: 'emerald',
    to: '/blog/fabric-guide',
  },
  {
    category: 'care',
    type: 'Guide',
    icon: FaHeart,
    title: 'Make your clothes last longer',
    desc: '10 easy habits to preserve color, shape, and texture for years to come.',
    readTime: '4 min read',
    theme: 'rose',
    to: '/blog/clothing-care',
  },
  {
    category: 'guides',
    type: 'Article',
    icon: FaBook,
    title: 'How to dress for your body type',
    desc: 'Practical styling tips for every shape — find what flatters you most.',
    readTime: '7 min read',
    theme: 'indigo',
    to: '/blog/body-type',
  },
  {
    category: 'color',
    type: 'Guide',
    icon: FaPalette,
    title: 'Seasonal color palettes 2026',
    desc: 'The trending color combinations we\'re seeing this season and how to wear them.',
    readTime: '5 min read',
    theme: 'amber',
    to: '/blog/seasonal-colors',
  },
  {
    category: 'sizing',
    type: 'Guide',
    icon: FaRulerCombined,
    title: 'Measure yourself correctly',
    desc: 'Step-by-step instructions to take accurate measurements from home.',
    readTime: '3 min read',
    theme: 'emerald',
    to: '/size-guide/measure',
  },
  {
    category: 'care',
    type: 'Article',
    icon: FaHeart,
    title: 'How to wash and store knitwear',
    desc: 'Protect your woolens from pilling, stretching, and moths with these simple steps.',
    readTime: '4 min read',
    theme: 'rose',
    to: '/blog/knitwear-care',
  },
];

const featuredDownloads = [
  {
    icon: FaFilePdf,
    title: 'Size chart PDF',
    desc: 'Printable size reference for all categories',
    size: '120 KB',
    theme: 'indigo',
    href: '#',
  },
  {
    icon: FaPalette,
    title: 'Color mood board',
    desc: 'This season\'s palette in high resolution',
    size: '2.4 MB',
    theme: 'amber',
    href: '#',
  },
  {
    icon: FaRulerCombined,
    title: 'Measurement template',
    desc: 'Fill-in sheet to record your measurements',
    size: '85 KB',
    theme: 'emerald',
    href: '#',
  },
];

const themeStyles = {
  indigo: {
    tile: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    pill: 'bg-indigo-50 text-indigo-700',
    hoverBorder: 'hover:border-indigo-300',
    hoverShadow: 'hover:shadow-indigo-500/10',
    accent: 'group-hover:text-indigo-700',
    accentBg: 'group-hover:bg-indigo-600 group-hover:text-white',
  },
  emerald: {
    tile: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    pill: 'bg-emerald-50 text-emerald-700',
    hoverBorder: 'hover:border-emerald-300',
    hoverShadow: 'hover:shadow-emerald-500/10',
    accent: 'group-hover:text-emerald-700',
    accentBg: 'group-hover:bg-emerald-600 group-hover:text-white',
  },
  amber: {
    tile: 'bg-gradient-to-br from-amber-500 to-amber-600',
    pill: 'bg-amber-50 text-amber-700',
    hoverBorder: 'hover:border-amber-300',
    hoverShadow: 'hover:shadow-amber-500/10',
    accent: 'group-hover:text-amber-700',
    accentBg: 'group-hover:bg-amber-600 group-hover:text-white',
  },
  rose: {
    tile: 'bg-gradient-to-br from-rose-500 to-rose-600',
    pill: 'bg-rose-50 text-rose-700',
    hoverBorder: 'hover:border-rose-300',
    hoverShadow: 'hover:shadow-rose-500/10',
    accent: 'group-hover:text-rose-700',
    accentBg: 'group-hover:bg-rose-600 group-hover:text-white',
  },
};

/* ============================== Component ============================== */
const Resource = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    const out = { all: resources.length };
    categories.forEach(({ key }) => {
      if (key !== 'all') out[key] = resources.filter((r) => r.category === key).length;
    });
    return out;
  }, []);

  const filtered = useMemo(() => {
    let list =
      activeCategory === 'all'
        ? resources
        : resources.filter((r) => r.category === activeCategory);

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const featured = resources.filter((r) => r.featured);

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
              <FaLightbulb className="w-3 h-3" />
              Learn & explore
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Style resources & guides
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed"
          >
            Everything you need to dress well, buy smart, and care for your clothes —
            from fit calculators to fabric guides and styling tips.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <div className="relative group">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-indigo-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guides, tips, and downloads…"
                className="w-full rounded-2xl border border-transparent bg-white/95 backdrop-blur py-3.5 pl-11 pr-11 text-sm text-gray-900 placeholder-gray-400 shadow-lg shadow-indigo-900/10 transition-all duration-200 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              )}
            </div>
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
        {/* ---------- Featured cards ---------- */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
            <FaStar className="w-3.5 h-3.5 text-amber-500" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Featured resources
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map(({ icon: Icon, type, title, desc, readTime, theme, to }) => {
              const t = themeStyles[theme] || themeStyles.indigo;
              return (
                <motion.div key={title} variants={fadeInUp}>
                  <Link
                    to={to}
                    className={`group relative block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl ${t.hoverShadow} ${t.hoverBorder} transition-all duration-200 overflow-hidden hover:-translate-y-1`}
                  >
                    {/* Gradient accent bar */}
                    <div className={`absolute inset-x-0 top-0 h-1 ${t.tile} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300`} />

                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl ${t.tile} text-white flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.pill}`}>
                            {type}
                          </span>
                          <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                            <FaClock className="w-2.5 h-2.5" />
                            {readTime}
                          </p>
                        </div>
                      </div>

                      <h3 className={`text-lg font-bold text-gray-900 ${t.accent} transition-colors mb-2`}>
                        {title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {desc}
                      </p>

                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">
                        Read now
                        <FaArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ---------- Category tabs ---------- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-6 -mx-1 overflow-x-auto pb-1"
        >
          <div className="flex gap-2 min-w-max px-1">
            {categories.map(({ key, label, icon: Icon }) => {
              const active = activeCategory === key;
              return (
                <motion.button
                  key={key}
                  variants={fadeInUp}
                  type="button"
                  onClick={() => setActiveCategory(key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                  <span
                    className={`inline-flex items-center justify-center min-w-[18px] h-4 px-1 rounded-full text-[10px] font-bold ${
                      active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {counts[key] ?? 0}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ---------- Result count ---------- */}
        <p className="mb-4 text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span>{' '}
          {filtered.length === 1 ? 'resource' : 'resources'}
          {search && (
            <>
              {' '}
              for "<span className="font-semibold text-gray-700">{search}</span>"
            </>
          )}
        </p>

        {/* ---------- Resource grid ---------- */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {filtered.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FaSearch className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                No resources matched
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                Try a different search or pick another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('all');
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(({ icon: Icon, type, title, desc, readTime, theme, to }) => {
                const t = themeStyles[theme] || themeStyles.indigo;
                return (
                  <motion.div key={title} variants={fadeInUp}>
                    <Link
                      to={to}
                      className={`group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl ${t.hoverShadow} ${t.hoverBorder} transition-all duration-200 overflow-hidden hover:-translate-y-1`}
                    >
                      <div className="p-5 flex-1 flex flex-col">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className={`w-11 h-11 rounded-xl ${t.tile} text-white flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-3`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${t.pill}`}>
                            {type}
                          </span>
                        </div>

                        {/* Body */}
                        <h3 className={`text-base font-bold text-gray-900 ${t.accent} transition-colors mb-2 leading-snug`}>
                          {title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed flex-1">
                          {desc}
                        </p>

                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                            <FaClock className="w-2.5 h-2.5" />
                            {readTime}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold text-gray-400 ${t.accent} transition-colors`}>
                            Open
                            <FaChevronRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* ---------- Downloads ---------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-16"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              <FaDownload className="w-3 h-3" />
              Free downloads
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
              Take our guides with you
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
              Print, save, or share — everything here is free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredDownloads.map(({ icon: Icon, title, desc, size, theme, href }) => {
              const t = themeStyles[theme] || themeStyles.indigo;
              return (
                <motion.a
                  key={title}
                  variants={fadeInUp}
                  href={href}
                  download
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-5 transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl ${t.tile} text-white flex items-center justify-center shadow-md mb-4 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-base font-bold text-gray-900 mb-1.5 ${t.accent} transition-colors`}>
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{size}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">
                      <FaDownload className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                      Download
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.section>

        {/* ---------- CTA ---------- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-16"
        >
          <motion.div
            variants={fadeInUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 p-8 sm:p-12 text-center text-white shadow-2xl shadow-indigo-500/20"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center">
                <FaNewspaper className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                Get new guides in your inbox
              </h2>
              <p className="text-sm sm:text-base text-white/85 max-w-lg mx-auto mb-7">
                Style tips, seasonal trend reports, and fabric guides — sent
                once a month. No spam, ever.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white text-indigo-700 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Visit our blog
                  <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/25 transition-all duration-200"
                >
                  Suggest a topic
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Resource;