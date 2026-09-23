import React from 'react';
import { Route, Routes } from 'react-router-dom';

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
<Route path='/products' element={<Products/>}/>
          {/* Nested routes under /shop */}
          <Route path="/shop" element={<Shop />}>
            <Route index element={<ShopHome />} />
            <Route path="mens" element={<Mens />} />
            <Route path="womens" element={<Womens />} />
            <Route path="kids" element={<Kids />} />
            <Route path="girls" element={<Girls />} />
          </Route>
<Route path='/contact' element={<Contact/>}/>
<Route path='/resources' element={<Resource/>}/>
          {/* 404 fallback (optional) */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center">
                <h1 className="text-3xl font-bold">404 — Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default App;