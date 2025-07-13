import React, { useState } from 'react';
import { Scan, ShoppingBag as ShoppingList, Camera, Check, X, Eye } from 'lucide-react';
import { useList } from '../context/ListContext';
import { useCart } from '../context/CartContext';

const BarcodeScanner = () => {
  const [scanMode, setScanMode] = useState<'connect' | 'direct' | null>(null);
  const [connectedList, setConnectedList] = useState<any>(null);
  const [scannedItems, setScannedItems] = useState<any[]>([]);
  const { lists } = useList();
  const { cartItems, addToCart } = useCart();

  // Sample products for scanning simulation
  const sampleProducts = [
    { barcode: '123456789', name: 'Organic Milk', price: 3.99, category: 'Dairy', image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { barcode: '987654321', name: 'Whole Grain Bread', price: 2.49, category: 'Bakery', image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { barcode: '456789123', name: 'Fresh Apples', price: 4.99, category: 'Fruits', image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  const simulateScan = () => {
    // Simulate barcode scanning
    const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    
    if (scanMode === 'connect' && connectedList) {
      // Check if item is in the connected list
      const listItem = connectedList.items.find((item: any) => 
        item.name.toLowerCase().includes(randomProduct.name.toLowerCase())
      );
      
      if (listItem) {
        // Mark as scanned in list and add to cart
        addToCart(randomProduct);
        setScannedItems(prev => [...prev, { ...randomProduct, fromList: true, listItemId: listItem.id }]);
      } else {
        // Item not in list, still add to cart
        addToCart(randomProduct);
        setScannedItems(prev => [...prev, { ...randomProduct, fromList: false }]);
      }
    } else {
      // Direct scan mode
      addToCart(randomProduct);
      setScannedItems(prev => [...prev, randomProduct]);
    }
  };

  if (!scanMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Barcode Scanner</h1>
          <p className="text-lg text-gray-600">Choose your scanning mode</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Connect to Shopping List */}
          <div
            onClick={() => setScanMode('connect')}
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <ShoppingList className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect to Shopping List</h2>
              <p className="text-gray-600 mb-6">Track your shopping list items in real-time while scanning</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>Live list tracking</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Scan className="w-4 h-4" />
                  <span>Mark items as purchased</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Scanning */}
          <div
            onClick={() => setScanMode('direct')}
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Camera className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Direct Scanning</h2>
              <p className="text-gray-600 mb-6">Scan products directly and add to cart</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <Scan className="w-4 h-4" />
                  <span>Quick scanning</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Instant cart addition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (scanMode === 'connect' && !connectedList) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Select Shopping List</h1>
          <p className="text-lg text-gray-600">Choose a list to track while scanning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lists.map((list) => (
            <div
              key={list.id}
              onClick={() => setConnectedList(list)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{list.name}</h3>
              <p className="text-gray-600 mb-4">{list.items.length} items</p>
              <div className="space-y-2">
                {list.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.completed ? 'Done' : 'Pending'}
                    </span>
                  </div>
                ))}
                {list.items.length > 3 && (
                  <p className="text-xs text-gray-500">+{list.items.length - 3} more items</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setScanMode(null)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg"
          >
            Back to Scanner Options
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {scanMode === 'connect' ? 'Live Shopping Scanner' : 'Direct Scanner'}
        </h1>
        <button
          onClick={() => {
            setScanMode(null);
            setConnectedList(null);
            setScannedItems([]);
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
        >
          Change Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scanner Interface */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Scanner</h2>
            
            {/* 
              BARCODE SCANNER INTEGRATION SPACE
              Replace this section with actual barcode scanner library
              Popular options:
              - ZXing-js (JavaScript)
              - QuaggaJS
              - React Native Camera with barcode scanning
              
              Example integration:
              <BarcodeScanner
                onDetected={(code) => handleBarcodeDetected(code)}
                style={{ width: '100%', height: '200px' }}
              />
            */}
            
            <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Camera Scanner Placeholder</p>
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <Scan className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <button
              onClick={simulateScan}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Scan className="w-5 h-5" />
              <span>Simulate Scan</span>
            </button>

            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-yellow-800">
                🔧 Integration Space: Replace with actual barcode scanner (ZXing-js, QuaggaJS, etc.)
              </p>
            </div>
          </div>
        </div>

        {/* Connected List (if in connect mode) */}
        {scanMode === 'connect' && connectedList && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{connectedList.name}</h2>
              <div className="space-y-3">
                {connectedList.items.map((item: any) => {
                  const isScanned = scannedItems.some(scanned => 
                    scanned.fromList && scanned.listItemId === item.id
                  );
                  return (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        isScanned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <span className={isScanned ? 'text-green-800 line-through' : 'text-gray-800'}>
                        {item.name}
                      </span>
                      {isScanned ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>View Cart</span>
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items scanned yet</p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-gray-600 text-xs">${item.price}</p>
                    </div>
                    <span className="text-gray-500 text-sm">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg">
                    ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
                  Send to Counter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;