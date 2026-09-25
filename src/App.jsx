import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Sections/Home';
import About from './Components/Sections/About';
import Footer from './Components/Footer/Footer';
import Products from './Components/Sections/Products';
import Contact from './Components/Sections/Contact';
import Resource from './Components/Sections/Resource';
import Login from './Components/Forms/Login';
import Signup from './Components/Forms/Signup';
import WishList from './Components/Sections/WishList';
import Cart from './Components/Sections/Cart';
import Arrivals from './Components/Sections/Arrivals';
import Sale from './Components/Sections/Sale';
import MensProducts from './Components/CATEGORIES/MensProducts';
import WomensProducts from './Components/CATEGORIES/WomensProducts';
import KidsProducts from './Components/CATEGORIES/KidsProducts';
import GirlsProducts from './Components/CATEGORIES/GirlsProducts';
import AllproductNav from './Components/FEATURES/AllproductNav';
import Profile from './Components/Forms/Profile';

/* ---------- Page transition variants ---------- */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="w-full"
  >
    {children}
  </motion.div>
);

/* ---------- Layout with Navbar + Footer ---------- */
const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

/* ---------- Layout for auth/profile (no Navbar/Footer) ---------- */
const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">{children}</div>
);

/* ---------- Placeholder ---------- */
const Placeholder = ({ title, description }) => (
  <PageWrapper>
    <section className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          {description || 'This page is under construction. Check back soon!'}
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 px-6 rounded-full transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </section>
  </PageWrapper>
);

/* ---------- 404 ---------- */
const NotFound = () => (
  <PageWrapper>
    <section className="min-h-screen flex items-center justify-center bg-white px-4 py-10 font-serif">
      <div className="w-full max-w-3xl text-center">
        <div
          className="h-[400px] bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
          }}
        >
          <h1 className="text-[80px] font-bold text-gray-800">404</h1>
        </div>
        <div className="-mt-12">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Look like you're lost
          </h3>
          <p className="text-gray-600 mb-6">The page you are looking for is not available!</p>
          <Link
            to="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  </PageWrapper>
);

/* ---------- Scroll to top on route change ---------- */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

/* ---------- Placeholder routes ---------- */
const placeholderRoutes = [
  { path: '/account', title: 'My Account', description: 'Manage your profile, orders, and addresses.' },
  { path: '/careers', title: 'Careers at StyleCraft', description: "We're hiring! Explore open roles." },
  { path: '/blog', title: 'StyleCraft Blog', description: 'Fashion tips, trends, and stories.' },
  { path: '/stores', title: 'Store Locator', description: 'Find a StyleCraft store near you.' },
  { path: '/sustainability', title: 'Sustainability', description: 'Our commitment to ethical fashion.' },
  { path: '/affiliates', title: 'Affiliate Program', description: 'Earn commissions by referring friends.' },
  { path: '/templates', title: 'Templates', description: 'Free style guides and outfit templates.' },
  { path: '/pricing', title: 'Pricing', description: 'Membership plans and benefits.' },
  { path: '/faq', title: 'Frequently Asked Questions', description: 'Quick answers to common questions.' },
  { path: '/shipping', title: 'Shipping Information', description: 'Delivery timelines and charges.' },
  { path: '/returns', title: 'Returns & Refunds', description: 'Our 30-day hassle-free return policy.' },
  { path: '/size-guide', title: 'Size Guide', description: 'Find your perfect fit.' },
  { path: '/track-order', title: 'Track Your Order', description: 'Enter your order ID to see status.' },
  { path: '/privacy', title: 'Privacy Policy', description: 'How we protect your data.' },
  { path: '/terms', title: 'Terms of Service', description: 'Rules for using StyleCraft.' },
  { path: '/cookies', title: 'Cookie Policy', description: 'How we use cookies.' },
];

/* ---------- App ---------- */
const App = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ---------- AUTH SECTION (no Navbar/Footer) ---------- */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <PageWrapper>
                  <Login />
                </PageWrapper>
              </AuthLayout>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthLayout>
                <PageWrapper>
                  <Login />
                </PageWrapper>
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <PageWrapper>
                  <Signup />
                </PageWrapper>
              </AuthLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthLayout>
                <PageWrapper>
                  <Profile />
                </PageWrapper>
              </AuthLayout>
            }
          />

          {/* ---------- MAIN SITE (with Navbar + Footer) ---------- */}
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  {/* CORE */}
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/resources" element={<PageWrapper><Resource /></PageWrapper>} />

                  {/* PRODUCTS (nested layout) */}
                  <Route path="/products" element={<AllproductNav />}>
                    <Route index element={<Products />} />
                    <Route path="mens" element={<MensProducts />} />
                    <Route path="womens" element={<WomensProducts />} />
                    <Route path="kids" element={<KidsProducts />} />
                    <Route path="girls" element={<GirlsProducts />} />
                    <Route path="arrivals" element={<Arrivals />} />
                    <Route path="sale" element={<Sale />} />
                  </Route>

                  {/* USER */}
                  <Route path="/wishlist" element={<PageWrapper><WishList /></PageWrapper>} />
                  <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />

                  {/* PLACEHOLDER ROUTES */}
                  {placeholderRoutes.map(({ path, title, description }) => (
                    <Route
                      key={path}
                      path={path}
                      element={<Placeholder title={title} description={description} />}
                    />
                  ))}

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;