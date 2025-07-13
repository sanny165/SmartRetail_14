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
    <div className="text-center mt-10 font-sans px-4">
      <h1 className="text-3xl font-bold mb-6">🧠 Jarvis Web Assistant</h1>

      {/* Speak Language Selector */}
      <label htmlFor="speakLang" className="font-semibold">🎙 Speak In Language:</label>
      <select
        id="speakLang"
        className="mx-2 px-3 py-2 border rounded"
        value={speakLang}
        onChange={(e) => setSpeakLang(e.target.value)}
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">Hindi</option>
        <option value="te-IN">Telugu</option>
      </select>

      {/* Jarvis Input */}
      <div className="mt-4">
        <input
          type="text"
          className="px-4 py-2 border rounded w-60"
          placeholder="Ask Jarvis..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="mt-2 space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => askJarvis()}>
            Send
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={startListening}>
            🎤 Speak
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={stopSpeaking}>
            🟥 Stop
          </button>
        </div>
        {isListening && <p className="text-red-600 font-semibold animate-pulse">🎙 Listening...</p>}
        <p className="mt-3">
          <strong>Jarvis:</strong> <span className="text-green-700">{responseText}</span>
        </p>
      </div>

      {/* Translator */}
      <h2 className="text-2xl font-semibold mt-10 mb-2">🌍 Translator</h2>
      <div className="mb-2">
        <select
          className="px-3 py-2 border rounded"
          value={fromLang}
          onChange={(e) => setFromLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
        </select>

        <select
          className="ml-4 px-3 py-2 border rounded"
          value={toLang}
          onChange={(e) => setToLang(e.target.value)}
        >
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
          <option value="en">English</option>
        </select>
      </div>
      <input
        type="text"
        className="px-4 py-2 border rounded w-60"
        placeholder="Type to translate..."
        value={translateInput}
        onChange={(e) => setTranslateInput(e.target.value)}
      />
      <div className="mt-2 space-x-2">
        <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={translateText}>
          Translate
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={startTranslateListening}>
          🎤 Speak
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={stopSpeaking}>
          🟥 Stop
        </button>
      </div>
      <p className="mt-3">
        <strong>Translation:</strong> <span className="text-green-700">{translateResult}</span>
      </p>
    </div>
  );
};

export default JarvisAssistant;
