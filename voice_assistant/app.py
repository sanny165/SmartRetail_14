from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from jarvis_core import ask_jarvis_multilingual, direct_translate

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication (localhost:5173 etc.)

# Optional: Main page route if using templates
@app.route("/")
def index():
    return render_template("index.html")

# Route to handle Jarvis question-answer
@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    user_input = data.get("message", "")
    response = ask_jarvis_multilingual(user_input)
    return jsonify({"reply": response})

# Route to handle translation
@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    text = data.get("text", "")
    src = data.get("from", "auto")
    dest = data.get("to", "en")
    translated = direct_translate(text, src, dest)
    return jsonify({"result": translated})

if __name__ == "__main__":
    app.run(debug=True)
