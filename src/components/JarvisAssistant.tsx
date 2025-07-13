import React, { useState } from "react";

const JarvisAssistant: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [translateInput, setTranslateInput] = useState("");
  const [translateResult, setTranslateResult] = useState("");
  const [isListening, setIsListening] = useState(false);

  const [speakLang, setSpeakLang] = useState("hi-IN");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("hi");

  const [productInfo, setProductInfo] = useState<{
    name: string;
    location: string;
    price: string;
    stock: string;
  } | null>(null);

  const speakText = (text: string, langCode: string = "en-IN") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      langCode.startsWith("hi") ? "hi-IN" :
      langCode.startsWith("te") ? "te-IN" :
      "en-US";
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => speechSynthesis.cancel();

  const askJarvis = async (msg: string | null = null, lang: string | null = null) => {
    const question = msg || inputText;
    const selectedLang = lang || speakLang;
    if (!question) return;

    setIsListening(true);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      const data = await res.json();
      setResponseText(data.reply || "No response");
      speakText(data.reply, selectedLang);
    } catch (error) {
      setResponseText("Server error or no response.");
    } finally {
      setIsListening(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = speakLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      askJarvis(transcript, speakLang);
    };

    recognition.onerror = () => {
      setResponseText("Couldn't hear clearly.");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
  };

  const translateText = async () => {
    if (!translateInput) return;

    try {
      const res = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: translateInput, from: fromLang, to: toLang }),
      });

      const data = await res.json();
      setTranslateResult(data.result || "No result");
      speakText(data.result, `${toLang}-IN`);

      // Set dummy product info
      setProductInfo({
        name: data.result || "Translated Name",
        location: "Aisle 3, Section B",
        price: "$4.99/lb",
        stock: "In Stock",
      });
    } catch (error) {
      setTranslateResult("Translation failed.");
    }
  };

  const startTranslateListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = `${fromLang}-IN`;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setTranslateInput(speechText);
      translateText();
    };

    recognition.onerror = () => {
      setTranslateResult("Couldn't understand.");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
  };

  return (
  <div className="min-h-screen bg-gray-50 px-4 py-10 font-sans">
    <h1 className="text-4xl font-bold text-center mb-2">Product Information</h1>
    <p className="text-center text-gray-600 mb-10">
      Get product details using voice or text input with translation support
    </p>

    {/* Translator Panel */}
    <div className="bg-white max-w-3xl mx-auto rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Ask About a Product</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">From Language</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To Language</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
          >
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded w-full"
          placeholder="Ask about a product (e.g., 'Where are the apples?')"
          value={translateInput}
          onChange={(e) => setTranslateInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={startTranslateListening}
        >
          🎤
        </button>
      </div>

      <button
        className="bg-green-600 hover:bg-green-700 text-white mt-4 w-full py-2 rounded font-semibold flex items-center justify-center gap-2"
        onClick={translateText}
      >
        🌐 Translate & Get Info
      </button>
    </div>

    {/* Product Info Display */}
    {productInfo && (
      <div className="bg-white max-w-3xl mx-auto mt-8 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold text-blue-600 mb-4">📦 Product Information</h3>
        <p className="text-xl font-semibold mb-1">{productInfo.name}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-2">
          <div>
            <p className="font-semibold">📍 Location:</p>
            <p>{productInfo.location}</p>
          </div>
          <div>
            <p className="font-semibold">✅ Stock Status:</p>
            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
              {productInfo.stock}
            </span>
          </div>
          <div>
            <p className="font-semibold">💰 Price:</p>
            <p className="text-green-600 font-bold">{productInfo.price}</p>
          </div>
        </div>
      </div>
    )}

    {/* Jarvis General Q&A */}
    <div className="bg-white max-w-3xl mx-auto mt-12 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">🧠 Ask Jarvis Anything</h2>

      <label htmlFor="speakLang" className="block font-semibold mb-2">🎙 Speak In Language:</label>
      <select
        id="speakLang"
        className="mb-4 px-3 py-2 border rounded w-full"
        value={speakLang}
        onChange={(e) => setSpeakLang(e.target.value)}
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">Hindi</option>
        <option value="te-IN">Telugu</option>
      </select>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded w-full"
          placeholder="Ask Jarvis anything..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded" onClick={startListening}>
          🎤
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => askJarvis()}>
          Send
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={stopSpeaking}>
          🟥 Stop
        </button>
      </div>

      {isListening && (
        <p className="text-red-600 font-semibold mt-2 animate-pulse">🎙 Listening...</p>
      )}

      {responseText && (
        <p className="mt-4">
          <strong>Jarvis:</strong>{" "}
          <span className="text-green-700">{responseText}</span>
        </p>
      )}
    </div>
  </div>
);

};

export default JarvisAssistant;
