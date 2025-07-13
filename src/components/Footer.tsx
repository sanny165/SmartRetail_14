import React from 'react';
import { Mic } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SmartMart</h3>
            <p className="text-gray-400">Your intelligent shopping companion with voice assistance and smart features.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/lists" className="hover:text-white transition-colors">Lists</a></li>
              <li><a href="/inshop" className="hover:text-white transition-colors">InShop</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Voice Assistant</h4>
            <div className="flex items-center space-x-2 text-gray-400">
              <Mic className="w-4 h-4" />
              <span>Available on all pages</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Say "Hey SmartMart" to get started</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SmartMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;