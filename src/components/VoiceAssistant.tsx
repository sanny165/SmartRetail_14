import React, { useState } from "react";
// TypeScript support for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

declare var webkitSpeechRecognition: any;


const VoiceAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [translation, setTranslation] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("hi");
  const [textToTranslate, setTextToTranslate] = useState("");

  const speakText = (text: string, langCode = "en-IN") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode.startsWith("hi")
      ? "hi-IN"
      : langCode.startsWith("te")
      ? "te-IN"
      : "en-US";
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => speechSynthesis.cancel();

  const startListening = () => {
    // ✅ After
const recognition = new (window.SpeechRecognition || webkitSpeechRecognition)();

    recognition.lang = "en-IN"; // you can make this dynamic
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsListening(true);

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      askJarvis(transcript, "en-IN");
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setReply("Could not understand");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
  };

  const askJarvis = async (message: string, lang = "en-IN") => {
    try {
      console.log("Received message:", askJarvis)
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        
      });
      const data = await res.json();
      setReply(data.reply);
      speakText(data.reply, lang);
    } catch (err) {
      setReply("Error connecting to Jarvis.");
    }
  };

  const translateText = async () => {
    try {
      const res = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTranslate,
          from: fromLang,
          to: toLang,
        }),
      });
      const data = await res.json();
      setTranslation(data.result);
      speakText(data.result, toLang + "-IN");
    } catch (err) {
      setTranslation("Translation failed.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">🎤 Jarvis Voice Assistant</h2>

      {/* Input box for voice/text */}
      <input
        className="border p-2 w-full mb-3"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Jarvis..."
      />

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => askJarvis(input, "en-IN")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
        <button
          onClick={startListening}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          🎤 Speak
        </button>
        <button
          onClick={stopSpeaking}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          🟥 Stop
        </button>
      </div>

      <p className="text-lg">
        <strong>Jarvis:</strong> {reply}
      </p>

      {isListening && (
        <p className="text-red-500 font-bold mt-2">🎙 Listening...</p>
      )}

      <hr className="my-6" />

      {/* Translator UI */}
      <h3 className="text-xl font-semibold mb-2">🌍 Translator</h3>
      <div className="flex gap-2 mb-2">
        <input
          className="border p-2 flex-1"
          type="text"
          placeholder="Type to translate..."
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
        />
        <select
          className="border p-2"
          value={fromLang}
          onChange={(e) => setFromLang(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="te">TE</option>
          <option value="ta">TA</option>
          <option value="es">ES</option>
        </select>
        <span>→</span>
        <select
          className="border p-2"
          value={toLang}
          onChange={(e) => setToLang(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="te">TE</option>
          <option value="ta">TA</option>
          <option value="es">ES</option>
        </select>
        <button
          onClick={translateText}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Translate
        </button>
      </div>

      <p className="text-lg">
        <strong>Translation:</strong> {translation}
      </p>
    </div>
  );
};

export default VoiceAssistant;
