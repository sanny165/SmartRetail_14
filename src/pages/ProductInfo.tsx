import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Globe, MapPin, Info } from 'lucide-react';

const ProductInfo = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  const [productInfo, setProductInfo] = useState<any>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
  ];

  const sampleProducts = [
    {
      name: 'Organic Apples',
      location: 'Aisle 3, Section B',
      price: '$4.99/lb',
      description: 'Fresh organic red apples from local farms',
      inStock: true,
      nutrients: 'High in fiber, Vitamin C',
    },
    {
      name: 'Wireless Headphones',
      location: 'Electronics Section, Row 2',
      price: '$99.99',
      description: 'Bluetooth wireless headphones with noise cancellation',
      inStock: true,
      warranty: '2 years',
    },
  ];

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = fromLanguage + '-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const handleTranslate = () => {
    // TRANSLATION SERVICE INTEGRATION SPACE
    // Replace this section with actual translation API call
    // Example: Google Translate API, Azure Translator, or custom Python backend
    
    /* 
    PYTHON TRANSLATION BACKEND INTEGRATION SPACE
    
    This is where you would integrate with your Python translation service:
    
    const translateText = async (text, from, to) => {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            from_lang: from,
            to_lang: to
          })
        });
        const result = await response.json();
        return result.translated_text;
      } catch (error) {
        console.error('Translation error:', error);
        return text;
      }
    };
    */
    
    // Simulated translation for demo
    const translations: { [key: string]: { [key: string]: string } } = {
      'apples': { 'hi': 'सेब', 'te': 'ఆపిల్స్', 'es': 'manzanas' },
      'headphones': { 'hi': 'हेडफोन्स', 'te': 'హెడ్‌ఫోన్స్', 'es': 'auriculares' },
      'price': { 'hi': 'कीमत', 'te': 'ధర', 'es': 'precio' },
    };
    
    const words = inputText.toLowerCase().split(' ');
    let translated = inputText;
    
    words.forEach(word => {
      if (translations[word] && translations[word][toLanguage]) {
        translated = translated.replace(new RegExp(word, 'gi'), translations[word][toLanguage]);
      }
    });
    
    setTranslatedText(translated);
    getProductInfo(inputText);
  };

  const getProductInfo = (query: string) => {
    // Simulate product search
    const product = sampleProducts.find(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(p.name.toLowerCase())
    );
    
    if (product) {
      setProductInfo(product);
    } else {
      setProductInfo({
        name: 'Product not found',
        location: 'Please try a different search term',
        description: 'We couldn\'t find information about this product',
        inStock: false,
      });
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = toLanguage + '-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Information</h1>
        <p className="text-lg text-gray-600">Get product details using voice or text input with translation support</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Ask About a Product</h2>
        
        {/* Language Selection */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Language</label>
            <select
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Language</label>
            <select
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Input Field */}
        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Ask about a product (e.g., 'Where are the apples?')"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleVoiceInput}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                isListening
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          {isListening && (
            <p className="text-red-600 text-sm mt-2 flex items-center">
              <div className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></div>
              Listening...
            </p>
          )}
        </div>

        <button
          onClick={handleTranslate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
        >
          <Globe className="w-5 h-5" />
          <span>Translate & Get Info</span>
        </button>

        {/* Translation Result */}
        {translatedText && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm text-green-800 font-medium mb-1">Translation:</p>
                <p className="text-green-900">{translatedText}</p>
              </div>
              <button
                onClick={() => speakText(translatedText)}
                className="text-green-600 hover:text-green-800 p-1"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product Information Display */}
      {productInfo && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            Product Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{productInfo.name}</h3>
                <p className="text-gray-600">{productInfo.description}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Location:</span>
                <span className="text-gray-700">{productInfo.location}</span>
              </div>
              
              {productInfo.price && (
                <div>
                  <span className="font-medium">Price:</span>
                  <span className="text-green-600 font-bold ml-2">{productInfo.price}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Stock Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  productInfo.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {productInfo.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {productInfo.nutrients && (
                <div>
                  <span className="font-medium">Nutritional Info:</span>
                  <p className="text-gray-700">{productInfo.nutrients}</p>
                </div>
              )}
              
              {productInfo.warranty && (
                <div>
                  <span className="font-medium">Warranty:</span>
                  <p className="text-gray-700">{productInfo.warranty}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Integration Notes */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">🔧 Integration Space</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p><strong>Translation Backend:</strong> Replace the simulated translation with your Python translation service API</p>
          <p><strong>Product Database:</strong> Connect to your product inventory system for real-time information</p>
          <p><strong>Voice Recognition:</strong> Enhanced with custom voice models for better accuracy</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;