import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Sections/Home';
import About from './Components/Sections/About';
import Shop from './Components/FEATURES/Shop';
import Mens from './Components/CATEGORIES/Mens';
import Womens from './Components/CATEGORIES/Womens';
import Kids from './Components/CATEGORIES/Kids';
import Girls from './Components/CATEGORIES/Girls';
import Footer from './Components/Footer/Footer';
import Products from './Components/Sections/Products';
import Contact from "./Components/Sections/Contact"
import Resource from './Components/Sections/Resource';
// Optional: a simple index page shown at /shop
const ShopHome = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">Welcome to the Shop</h1>
    <p className="text-gray-600 mt-2">Pick a category above to get started.</p>
  </div>
);

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/products' element={<Products />} />
          {/* Nested routes under /shop */}
          <Route path="/shop" element={<Shop />}>
            <Route index element={<ShopHome />} />
            <Route path="mens" element={<Mens />} />
            <Route path="womens" element={<Womens />} />
            <Route path="kids" element={<Kids />} />
            <Route path="girls" element={<Girls />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/resources' element={<Resource />} />
          {/* 404 fallback (optional) */}
          <Route
            path="*"
            element={
                <section className="min-h-screen flex items-center justify-center bg-white px-4 py-10 font-serif">
      <div className="w-full max-w-3xl text-center">
        {/* 404 GIF Background */}
        <div
          className="h-[400px] bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
          }}
        >
          <h1 className="text-[80px] font-bold text-gray-800">404</h1>
        </div>

        {/* Content Box */}
        <div className="-mt-12">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Look like you're lost
          </h3>

          <p className="text-gray-600 mb-6">
            the page you are looking for not available!
          </p>

          <Link
            to="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;