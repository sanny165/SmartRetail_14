import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingUp, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const categories = [
    { id: 1, name: 'Electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300', count: '200+ items' },
    { id: 2, name: 'Groceries', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300', count: '1000+ items' },
    { id: 3, name: 'Clothing', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300', count: '500+ items' },
    { id: 4, name: 'Home & Garden', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=300', count: '300+ items' },
    { id: 5, name: 'Sports', image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=300', count: '150+ items' },
    { id: 6, name: 'Books', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300', count: '250+ items' },
  ];

  const offers = [
    { id: 1, title: 'Flash Sale', description: 'Up to 50% off Electronics', bgColor: 'bg-red-500' },
    { id: 2, title: 'Trending Now', description: 'Smart Home Devices', bgColor: 'bg-blue-500' },
    { id: 3, title: 'Special Offer', description: 'Buy 2 Get 1 Free on Books', bgColor: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner with Offers */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to SmartMart</h1>
            <p className="text-xl opacity-90">Your intelligent shopping companion</p>
          </div>
          
          {/* Offers Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`${offer.bgColor} rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 animate-pulse`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {offer.title === 'Flash Sale' && <Zap className="w-6 h-6" />}
                  {offer.title === 'Trending Now' && <TrendingUp className="w-6 h-6" />}
                  {offer.title === 'Special Offer' && <Star className="w-6 h-6" />}
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                </div>
                <p className="text-lg">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600">Discover our wide range of products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/products"
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-10">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-90 mb-2">{category.count}</p>
                <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Shop now</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Shopping Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/lists" className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Lists</h3>
              <p className="text-gray-600 text-sm">AI-powered shopping lists with suggestions</p>
            </Link>
            <Link to="/inshop" className="text-center group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">InShop Scanner</h3>
              <p className="text-gray-600 text-sm">Scan products while you shop</p>
            </Link>
            <Link to="/product-info" className="text-center group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Voice Assistant</h3>
              <p className="text-gray-600 text-sm">Voice-powered product information</p>
            </Link>
            <Link to="/cart" className="text-center group">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Cart</h3>
              <p className="text-gray-600 text-sm">Intelligent cart with chatbot support</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;