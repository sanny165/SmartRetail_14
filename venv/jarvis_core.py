import openai
import re
import os
import requests
from dotenv import load_dotenv

# Load API key
load_dotenv()
openai.api_key = os.getenv("OPENROUTER_API_KEY")
openai.api_base = "https://openrouter.ai/api/v1"
llm_model = "meta-llama/llama-3-8b-instruct"

# Clean unwanted characters
def clean_text(text):
    return re.sub(r"[^\w\s.,!?-]", "", text)

# Detect language using LLM
def detect_language(text):
    try:
        prompt = f"Detect the language of the following text: {text}. Reply with only the language code (like 'en', 'hi', 'te')."
        response = openai.ChatCompletion.create(
            model=llm_model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=10
        )
        detected_lang = response["choices"][0]["message"]["content"].strip().lower()
        return detected_lang if len(detected_lang) <= 5 else "en"
    except Exception as e:
        print("[Language Detection Error]", e)
        return "en"

# ✅ Translate using unofficial Google Translate endpoint
def translate(text, from_lang, to_lang):
    try:
        url = (
            f"https://translate.googleapis.com/translate_a/single?client=gtx"
            f"&sl={from_lang}&tl={to_lang}&dt=t&q={requests.utils.quote(text)}"
        )
        response = requests.get(url)
        data = response.json()
        translated = data[0][0][0]  # Extract translation
        return translated
    except Exception as e:
        print("[Google Translate Error]", e)
        return "Translation failed."

# Jarvis logic with multilingual support
def ask_jarvis_multilingual(user_input):
    try:
        user_lang = detect_language(user_input)
        print("Detected Language:", user_lang)

        translated_input = translate(user_input, user_lang, "en")
        print("Translated Input:", translated_input)

        response = openai.ChatCompletion.create(
            model=llm_model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": translated_input}
            ],
            temperature=0.7,
            max_tokens=800
        )
        english_response = response['choices'][0]['message']['content'].strip()
        final_reply = translate(english_response, "en", user_lang)
        return clean_text(final_reply)

    except Exception as e:
        print("[LLM Error]", e)
        return "Sorry, I couldn't process that."

# Translate directly from → to
def direct_translate(text, src_lang, target_lang):
    return translate(text, src_lang, target_lang)

# ✅ Optional test
if __name__ == "__main__":
    print(direct_translate("milk", "en", "hi"))  # should return दूध
