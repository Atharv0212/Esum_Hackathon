import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
try:
    genai.configure(api_key=os.environ['GEMINI_API_KEY'])
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content('Hello')
    print("Success: API call completed without error.")
except Exception as e:
    print(f"Error Type: {type(e).__name__}")
    print(f"Error details: {e}")
