# File: run_ocr.py

from PIL import Image
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

image_path = "C:\\Users\\USER\\Desktop\\Manal\\deed.jpg"

try:
    # This will run OCR on your image
    text_output = pytesseract.image_to_string(Image.open(image_path))
    
    # Print the entire raw text extracted from the document
    print("----------- RAW OCR TEXT OUTPUT -----------")
    print(text_output)
    print("-----------------------------------------")
    print("\nCopy everything between the two lines above and paste it in the chat.")

except FileNotFoundError:
    print(f"ERROR: The file was not found at the path: {image_path}")
    print("Please check that the file path is correct and try again.")
except Exception as e:
    print(f"An error occurred: {e}")
    print("Please ensure Tesseract is installed correctly.")