import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, Info, Camera, MapPin } from 'lucide-react';

const InShop = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">InShop Features</h1>
        <p className="text-lg text-gray-600">Enhanced shopping experience with smart tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Barcode Scanner */}
        <Link
          to="/barcode-scanner"
          className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-center">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <Scan className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Barcode Scanner</h2>
            <p className="text-gray-600 mb-6">Scan products to add to cart or track your shopping list in real-time</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Camera-based scanning</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Live shopping list tracking</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <Link
          to="/product-info"
          className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
              <Info className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h2>
            <p className="text-gray-600 mb-6">Get detailed product information using voice or text input with translation support</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <span>🎤</span>
                <span>Voice & text input</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>🌍</span>
                <span>Multi-language translation</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Additional Features */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">InShop Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="font-semibold mb-2">Faster Shopping</h4>
            <p className="text-sm text-gray-600">Streamline your shopping experience with smart tools</p>
          </div>
          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📱</span>
            </div>
            <h4 className="font-semibold mb-2">Mobile Optimized</h4>
            <p className="text-sm text-gray-600">Perfect for use on your smartphone while shopping</p>
          </div>
          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔄</span>
            </div>
            <h4 className="font-semibold mb-2">Real-time Sync</h4>
            <p className="text-sm text-gray-600">All your data syncs across devices instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InShop;