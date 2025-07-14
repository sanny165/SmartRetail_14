import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Mic, MicOff, ShoppingCart } from 'lucide-react';

interface VoiceCommand {
  action: 'add' | 'remove' | 'clear';
  itemName: string;
  quantity?: number;
}

const VoiceAssistant: React.FC = () => {
  const { addToCart, removeFromCart, clearCart, cartItems } = useCart();
  const products = useProducts();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Press to start');
  const [lastCommand, setLastCommand] = useState('');
  const [fromLang, setFromLang] = useState<'en' | 'hi' | 'te' | 'hi-IN'>('en');

  // ✅ Normalize Hinglish before translation
  const normalizeHinglish = (text: string): string => {
  text = text.toLowerCase();

  // Basic phrase replacements
  if (text.includes("cart may") && text.includes("jode")) {
    const item = text.replace("cart may", "").replace("jode", "").trim();
    return `add ${item} to cart`;
  }

  if (text.includes("cart may") && text.includes("raku")) {
    const item = text.replace("cart may", "").replace("raku", "").trim();
    return `put ${item} in cart`;
  }

  if (text.includes("cart may") && text.includes("hatado")) {
    const item = text.replace("cart may", "").replace("hatado", "").trim();
    return `remove ${item} from cart`;
  }

  if (text.includes("cart khaali karo") || text.includes("cart empty")) {
    return "clear cart";
  }

  // Fallback word-level mappings
  const map: Record<string, string> = {
    "jode": "add",
    "raku": "put",
    "hatado": "remove",
    "cart may": "in cart",
  };
  for (const [key, val] of Object.entries(map)) {
    text = text.replace(new RegExp(key, 'g'), val);
  }

  return text;
};


  const translateToEnglish = async (text: string): Promise<string> => {
    try {
      const res = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, from: fromLang, to: 'en' }),
      });

      const data = await res.json();
      return data.result || text;
    } catch (error) {
      console.error("Translation failed:", error);
      return text;
    }
  };

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus('Speech API not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('Listening...');
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatus('Press to start');
    };

    interface RecognitionErrorEvent extends Event {
      error: string;
    }

    recognition.onerror = (event: RecognitionErrorEvent) => {
      console.error('Recognition error:', event.error);
      setIsListening(false);
      setStatus(`Error: ${event.error}`);
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please enable microphone permissions.');
      }
    };

    interface SpeechRecognitionResultAlternative {
      transcript: string;
      confidence: number;
    }

    interface SpeechRecognitionEvent extends Event {
      results: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionResultList {
      length: number;
      [index: number]: SpeechRecognitionResult;
    }

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      try {
        const result: SpeechRecognitionResultAlternative = Array.from(
          event.results[event.results.length - 1]
        ).sort((a, b) => b.confidence - a.confidence)[0];

        const transcript: string = result.transcript.trim();
        setLastCommand(transcript);
        console.log('🎤 Heard:', transcript);

        const cleaned = normalizeHinglish(transcript);
        console.log('🧹 Normalized:', cleaned);

        const translated = await translateToEnglish(cleaned);
        console.log('🌍 Translated:', translated);

        const command: VoiceCommand | null = parseVoiceCommand(translated);
        if (!command) return;

        await handleCommand(command);
      } catch (error) {
        console.error('Command processing error:', error);
        setStatus('Error processing command');
      }
    };

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, [products, cartItems, fromLang]);

  const parseVoiceCommand = (text: string): VoiceCommand | null => {
    text = text.toLowerCase();

    const addMatch = text.match(/(?:add|put|buy)\s(.+?)(?:\s(?:to|in)\s(?:cart|basket))?/);
    if (addMatch && addMatch[1]) {
      return {
        action: 'add',
        itemName: addMatch[1].trim(),
        quantity: (() => {
          const match = text.match(/\d+/);
          return match ? parseInt(match[0]) : 1;
        })()
      };
    }

    const removeMatch = text.match(/(?:remove|delete)\s(.+?)(?:\sfrom\s(?:cart|basket))?/);
    if (removeMatch && removeMatch[1]) {
      return {
        action: 'remove',
        itemName: removeMatch[1].trim(),
        quantity: (() => {
          const match = text.match(/\d+/);
          return match ? parseInt(match[0]) : 1;
        })()
      };
    }

    if (text.includes('clear cart') || text.includes('empty cart')) {
      return { action: 'clear', itemName: '', quantity: 0 };
    }

    return null;
  };

  const handleCommand = async (command: VoiceCommand) => {
    switch (command.action) {
      case 'add': {
        const cleanedName = command.itemName.trim().toLowerCase();
        let selected = products.find(p => p.name.toLowerCase() === cleanedName);

        if (!selected) {
          selected = products.find(p => p.name.toLowerCase().includes(cleanedName));
        }

        if (!selected) {
          setStatus(`❌ No product found: ${command.itemName}`);
          return;
        }

        for (let i = 0; i < (command.quantity || 1); i++) {
          addToCart(selected);
        }

        setStatus(`✅ Added ${selected.name} (x${command.quantity || 1})`);
        break;
      }

      case 'remove': {
        const itemToRemove = cartItems.find(item =>
          item.name.toLowerCase().includes(command.itemName.toLowerCase())
        );

        if (!itemToRemove) {
          setStatus(`⚠️ Item not in cart: ${command.itemName}`);
          break;
        }

        removeFromCart(itemToRemove.id);
        setStatus(`🗑️ Removed ${itemToRemove.name}`);
        break;
      }

      case 'clear':
        clearCart();
        setStatus('🧹 Cart cleared');
        break;
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 flex flex-col items-start gap-2">
      {lastCommand && (
        <div className="bg-white p-3 rounded-lg shadow-md max-w-xs">
          <p className="text-sm text-gray-700">"{lastCommand}"</p>
        </div>
      )}

      <div
        className={`flex items-center gap-2 p-3 rounded-full shadow-lg cursor-pointer transition-all
        ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-600 text-white'}`}
        onClick={toggleListening}
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        <span className="text-sm">{status}</span>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500">
        <ShoppingCart size={14} />
        <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
      </div>
    </div>
  );
};

export default VoiceAssistant;
