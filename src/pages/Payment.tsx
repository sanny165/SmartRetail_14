import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Payment = () => {
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'digital' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.08;
  const finalTotal = total + tax;

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      clearCart();
      
      // Navigate back to home after showing success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-6">Your order has been processed successfully.</p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600">Transaction ID: #PAY{Date.now()}</p>
            <p className="text-2xl font-bold text-gray-900">${finalTotal.toFixed(2)}</p>
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-blue-600">Bye!</h2>
            <h3 className="text-lg font-semibold">Visit Again!</h3>
            <p className="text-gray-600">Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Payment</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          
          <div className="space-y-4 mb-6">
            {/* Credit Card */}
            <div
              onClick={() => setPaymentMethod('card')}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Credit/Debit Card</h3>
                  <p className="text-sm text-gray-600">Pay with your card</p>
                </div>
              </div>
            </div>

            {/* Digital Payment */}
            <div
              onClick={() => setPaymentMethod('digital')}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === 'digital' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Smartphone className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">Digital Wallet</h3>
                  <p className="text-sm text-gray-600">UPI, PayPal, Apple Pay</p>
                </div>
              </div>
            </div>

            {/* Cash */}
            <div
              onClick={() => setPaymentMethod('cash')}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Banknote className="w-6 h-6 text-orange-600" />
                <div>
                  <h3 className="font-semibold">Cash Payment</h3>
                  <p className="text-sm text-gray-600">Pay at counter</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'digital' && (
            <div className="space-y-4 mb-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-2">Scan QR code or use UPI ID</p>
                <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-gray-400">QR Code</span>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'cash' && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-orange-800">
                Please proceed to the counter to complete your cash payment.
              </p>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;