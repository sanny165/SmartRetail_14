import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Extend the Window interface to include botpressWebChat
declare global {
  interface Window {
    botpressWebChat?: any;
  }
}

const Cart = () => {
  // All hooks must be inside the component function
  const [botpressReady, setBotpressReady] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart, sendToCounter } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Combined and optimized useEffect hooks
  useEffect(() => {
    const checkBotpress = () => {
      if (window.botpressWebChat) {
        setBotpressReady(true);
        return true;
      }
      return false;
    };

    const sendCartData = () => {
      if (window.botpressWebChat && cartItems.length > 0) {
        console.log('✅ Sending cart data to Botpress:', cartItems);
        
        window.botpressWebChat.sendEvent({
          type: 'cart-update',
          channel: 'web',
          payload: {
            cartItems: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              category: item.category,
              price: item.price,
              quantity: item.quantity,
              image: item.image
            }))
          }
        });
      }
    };

    // Initial check and send
    if (checkBotpress()) {
      sendCartData();
    } else {
      // Periodic check if not ready
      const interval = setInterval(() => {
        if (checkBotpress()) {
          clearInterval(interval);
          sendCartData();
        }
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [cartItems]); // Only cartItems as dependency

  const handleSendToCounter = () => {
    sendToCounter();
    setTimeout(() => {
      alert('List verified! Proceeding to payment...');
      navigate('/payment');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart to get started!</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.category}</p>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleSendToCounter}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Send to Counter
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Cart;