import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Lists from './pages/Lists';
import InShop from './pages/InShop';
import Cart from './pages/Cart';
import ProductInfo from './pages/ProductInfo';
import BarcodeScanner from './pages/BarcodeScanner';
import Payment from './pages/Payment';
import { CartProvider } from './context/CartContext';
import { ListProvider } from './context/ListContext';
import JarvisAssistant from "./components/JarvisAssistant";
import VoiceAssistant from "./components/voiceassistant";
import {ProductProvider} from "./context/ProductContext"

function App() {
  return (
    <CartProvider>
      <ListProvider>
        <ProductProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/inshop" element={<InShop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product-info" element={<JarvisAssistant />} />
                <Route path="/barcode-scanner" element={<BarcodeScanner />} />
                <Route path="/payment" element={<Payment />} />
              </Routes>
            </main>

            <VoiceAssistant />
            

            <Footer />
          </div>
        </Router>
        </ProductProvider>
      </ListProvider>
    </CartProvider>
  );
}


export default App;