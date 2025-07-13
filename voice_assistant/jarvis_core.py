import os
import re
import openai
from googletrans import Translator
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
openai.api_key = os.getenv("OPENROUTER_API_KEY")
openai.api_base = "https://openrouter.ai/api/v1"
llm_model = "meta-llama/llama-3-8b-instruct"

# Translator instance
translator = Translator()

# Detect the language of the input text
def detect_language(text: str) -> str:
    try:
        return translator.detect(text).lang
    except Exception as e:
        print("[Language Detection Error]", e)
        return "en"  # fallback

# Translate input to English
def translate_to_english(text: str) -> str:
    try:
        return translator.translate(text, dest="en").text
    except Exception as e:
        print("[Translate to English Error]", e)
        return text

# Translate LLM output back to user’s language
def translate_from_english(text: str, target_lang: str) -> str:
    try:
        return translator.translate(text, dest=target_lang).text
    except Exception as e:
        print("[Translate from English Error]", e)
        return text

# Clean up LLM output
def clean_text(text: str) -> str:
    return re.sub(r"[^\w\s.,!?-]", "", text)

# Full assistant logic: detect → translate → get response → retranslate
def ask_jarvis_multilingual(user_input: str) -> str:
    try:
        user_lang = detect_language(user_input)
        translated_input = translate_to_english(user_input)

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
        final_reply = translate_from_english(english_response, user_lang)
        return clean_text(final_reply)

    except Exception as e:
        print("[LLM Error]", e)
        return "Sorry, I couldn't process that."

# Direct translation between any two selected languages
def direct_translate(text: str, src_lang: str, target_lang: str) -> str:
    try:
        return translator.translate(text, src=src_lang, dest=target_lang).text
    except Exception as e:
        print("[Direct Translate Error]", e)
        return "Translation failed."
