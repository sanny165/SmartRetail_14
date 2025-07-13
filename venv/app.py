from flask import Flask, request, jsonify
from flask_cors import CORS
from jarvis_core import ask_jarvis_multilingual, direct_translate

app = Flask(__name__)

# ✅ Allow only frontend origin explicitly for safety
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    user_input = data.get("message", "")
    response = ask_jarvis_multilingual(user_input)
    return jsonify({"reply": response})

@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    text = data.get("text", "")
    src = data.get("from", "auto")
    dest = data.get("to", "en")
    translated = direct_translate(text, src, dest)
    return jsonify({"result": translated})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
