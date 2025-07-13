import os
import openai
from googletrans import Translator
import re
from dotenv import load_dotenv

# Load API key
load_dotenv()
openai.api_key = os.getenv("OPENROUTER_API_KEY")
openai.api_base = "https://openrouter.ai/api/v1"
llm_model = "meta-llama/llama-3-8b-instruct"

# Translator object
translator = Translator()

# Detect spoken/written language
def detect_language(text):
    try:
        detected = translator.detect(text).lang
        return detected
    except Exception as e:
        print("[Language Detection Error]", e)
        return "en"  # Default fallback

# Translate to English (for LLM to understand)
def translate_to_english(text):
    try:
        return translator.translate(text, dest="en").text
    except Exception as e:
        print("[Translate to English Error]", e)
        return text

# Translate from English (LLM output to user's language)
def translate_from_english(text, target_lang):
    try:
        return translator.translate(text, dest=target_lang).text
    except Exception as e:
        print("[Translate from English Error]", e)
        return text

# Clean output to remove unreadable characters
def clean_text(text):
    return re.sub(r"[^\w\s.,!?-]", "", text)

# Main assistant logic with auto language detect
def ask_jarvis_multilingual(user_input):
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

# Direct translation for Translate Mode (From → To)
def direct_translate(text, src_lang, target_lang):
    try:
        result = translator.translate(text, src=src_lang, dest=target_lang)
        return result.text
    except Exception as e:
        print("[Direct Translate Error]", e)
        return "Translation failed."    
