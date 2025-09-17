# File: calibrate_deed.py
import os
from PIL import Image
import pytesseract
import cv2
import numpy as np

# --- Configuration ---
# 1. Set the path to your Tesseract installation
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

# 2. Set the path to your sample deed image file
# IMPORTANT: Replace this with the actual path to your deed image
image_path = r"C:\\Users\\USER\\Desktop\\Manal\\deed.jpg"

# --- Helper Function (Copied from server.py) ---
def preprocess_image_for_ocr(img_path):
    """
    Loads and cleans an image file from a path to improve OCR accuracy.
    """
    try:
        image = cv2.imread(img_path)
        if image is None:
            raise FileNotFoundError("Image not found or could not be read.")
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        denoised = cv2.medianBlur(binary, 3)
        return denoised
    except Exception as e:
        print(f"Error during image preprocessing: {e}")
        return None

# --- Main Execution ---
def main():
    """
    Main function to run the calibration test.
    """
    if not os.path.exists(image_path):
        print(f"ERROR: The file was not found at the path: {image_path}")
        print("Please check that the file path in the script is correct and try again.")
        return

    print("--- Starting Deed Calibration ---")
    print(f"Processing image: {image_path}")
    
    try:
        # Preprocess the image to improve OCR results
        cleaned_image = preprocess_image_for_ocr(image_path)
        
        if cleaned_image is not None:
            # Run OCR on the cleaned image
            text_output = pytesseract.image_to_string(cleaned_image)
            
            # Print the entire raw text extracted from the document
            print("\n----------- RAW OCR TEXT OUTPUT -----------")
            print(text_output)
            print("-----------------------------------------")
            print("\nPlease copy all the text between the two lines above and paste it in the chat.")
            print("This will allow me to perfectly calibrate the server's validation logic.")
        else:
            print("Failed to preprocess the image.")

    except Exception as e:
        print(f"\nAn error occurred during OCR processing: {e}")
        print("Please ensure Tesseract is installed correctly and the path is set.")

if __name__ == '__main__':
    main()
