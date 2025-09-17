import hashlib
import json
import re
import os
import tempfile
from PIL import Image
import pytesseract
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import cv2
import numpy as np

# --- Initialize ---
load_dotenv()
app = Flask(__name__)
CORS(app)

# --- Configuration ---
# Ensure this path points to your Tesseract installation
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
PINATA_API_KEY = os.getenv("PINATA_API_KEY")
PINATA_API_SECRET = os.getenv("PINATA_API_SECRET")
PINATA_API_URL = "https://api.pinata.cloud/pinning/"

# --- HELPER FUNCTION FOR IMAGE CLEANING ---
def preprocess_image_for_ocr(image_file):
    """
    Cleans an image file to improve OCR accuracy.
    """
    image_stream = image_file.read()
    image_file.seek(0)
    npimg = np.frombuffer(image_stream, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    denoised = cv2.medianBlur(binary, 3)
    return denoised

# --- Helper Functions ---
def standardize_data(data):
    """Cleans and standardizes the extracted data for consistent hashing."""
    cleaned_data = {}
    for key, value in data.items():
        cleaned_value = str(value).lower().strip()
        cleaned_value = re.sub(r'\s+', ' ', cleaned_value)
        cleaned_data[key] = cleaned_value
    return cleaned_data

def upload_file_to_pinata(file_path, file_name):
    """Helper function to upload a single file to Pinata."""
    url = f"{PINATA_API_URL}pinFileToIPFS"
    headers = {"pinata_api_key": PINATA_API_KEY, "pinata_secret_api_key": PINATA_API_SECRET}
    with open(file_path, 'rb') as f:
        response = requests.post(url, files={"file": (file_name, f)}, headers=headers)
    response.raise_for_status()
    return response.json()["IpfsHash"]

def upload_json_to_pinata(json_data, file_name="nrc_references.json"):
    """Helper function to upload JSON data to Pinata."""
    url = f"{PINATA_API_URL}pinJSONToIPFS"
    headers = {"pinata_api_key": PINATA_API_KEY, "pinata_secret_api_key": PINATA_API_SECRET}
    payload = {"pinataMetadata": {"name": file_name}, "pinataContent": json_data}
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()["IpfsHash"]
    except requests.exceptions.HTTPError as err:
        print(f"Pinata JSON upload failed! Status Code: {err.response.status_code}, Response: {err.response.text}")
        raise

# --- DEED PROCESSING LOGIC (NOW CALIBRATED) ---
def generate_deed_hash(image_file):
    """
    Validates, extracts, standardizes, and hashes key information from a title deed image.
    """
    try:
        cleaned_image = preprocess_image_for_ocr(image_file)
        text = pytesseract.image_to_string(cleaned_image)
        text_lower = text.lower()

        # --- UPDATED: CALIBRATED VALIDATION ---
        # Checks for keywords that are reliably read from your sample deed
        required_keywords = ["land", "registration", "act", "certify"]
        if not all(keyword in text_lower for keyword in required_keywords):
            print("--- OCR Text for Debugging ---")
            print(text_lower)
            print("------------------------------")
            raise ValueError("The uploaded file does not appear to be a valid Title Deed. Key identifiers are missing.")
        
        print("Title Deed Validated.")
        # --- END OF VALIDATION STEP ---

        # --- UPDATED: CALIBRATED REGEX ---
        # These are now more flexible to handle OCR errors like "Toth Roni" and "certify thot"
        title_number_match = re.search(r"(?:title number|toth roni)\s+([^\n]+)", text, re.IGNORECASE)
        owner_match = re.search(r"certify th.t\s+([^\n]+)", text, re.IGNORECASE) # Handles "that" and "thot"
        area_match = re.search(r"(?:approximate area|asprosimate vea)\.+\s*([^\n]+)", text, re.IGNORECASE)
        
        if not all([title_number_match, owner_match, area_match]):
            # If parsing fails, fall back to hashing the raw text as a safety measure
            raw_text_for_hashing = re.sub(r'\s+', '', text).lower()
            return "0x" + hashlib.sha256(raw_text_for_hashing.encode('utf-8')).hexdigest()
            
        raw_data = {
            "title_number": title_number_match.group(1), 
            "owner": owner_match.group(1), 
            "area": area_match.group(1)
        }
        canonical_data = standardize_data(raw_data)
        canonical_string = json.dumps(canonical_data, sort_keys=True, separators=(',', ':'))
        return "0x" + hashlib.sha256(canonical_string.encode('utf-8')).hexdigest()

    except Exception as e:
        print(f"Error in generate_deed_hash: {e}")
        raise

# --- NRC PROCESSING LOGIC ---
def process_nrc_sides(front_file, back_file):
    """
    Validates NRC front and back images, uploads both, and returns a single IPFS hash of a JSON manifest.
    """
    front_path, back_path = None, None
    try:
        cleaned_front = preprocess_image_for_ocr(front_file)
        front_text = pytesseract.image_to_string(cleaned_front).lower()
        print("--- OCR Extracted NRC Front Text ---")
        print(front_text)
        print("------------------------------------")
        
        has_republic = "republic" in front_text
        has_id_word = "national" in front_text or "registration" in front_text

        if not (has_republic and has_id_word):
            raise ValueError("Front image does not appear to be a valid NRC. Key keywords not found.")
        print("NRC Front Validated.")

        cleaned_back = preprocess_image_for_ocr(back_file)
        back_text = pytesseract.image_to_string(cleaned_back).lower()
        print("--- OCR Extracted NRC Back Text ---")
        print(back_text)
        print("-----------------------------------")
        if len(back_text.strip()) < 10:
             raise ValueError("Back image appears to be blank or invalid.")
        print("NRC Back Validated.")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp_front:
            front_file.seek(0)
            tmp_front.write(front_file.read())
            front_path = tmp_front.name
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp_back:
            back_file.seek(0)
            tmp_back.write(back_file.read())
            back_path = tmp_back.name

        front_hash = upload_file_to_pinata(front_path, "nrc_front.png")
        print(f"Uploaded NRC Front, Hash: {front_hash}")
        back_hash = upload_file_to_pinata(back_path, "nrc_back.png")
        print(f"Uploaded NRC Back, Hash: {back_hash}")

        nrc_manifest = {
            "description": "NRC Documents for Verification",
            "image_front": f"ipfs://{front_hash}",
            "image_back": f"ipfs://{back_hash}"
        }
        manifest_hash = upload_json_to_pinata(nrc_manifest)
        print(f"Uploaded Manifest JSON, Hash: {manifest_hash}")

        return manifest_hash

    finally:
        if front_path and os.path.exists(front_path): os.remove(front_path)
        if back_path and os.path.exists(back_path): os.remove(back_path)

# --- API Endpoints ---
@app.route('/process-deed', methods=['POST'])
def process_deed_endpoint():
    if 'deedFile' not in request.files: return jsonify({"error": "No file part"}), 400
    file = request.files['deedFile']
    if file.filename == '': return jsonify({"error": "No file selected"}), 400
    try:
        return jsonify({"deedHash": generate_deed_hash(file)})
    except Exception as e:
        return jsonify({"error": f"Failed to process image: {str(e)}"}), 500

@app.route('/process-nrc', methods=['POST'])
def process_nrc_endpoint():
    if 'nrcFrontFile' not in request.files or 'nrcBackFile' not in request.files:
        return jsonify({"error": "Both front and back NRC files are required."}), 400
    front_file, back_file = request.files['nrcFrontFile'], request.files['nrcBackFile']
    if front_file.filename == '' or back_file.filename == '':
        return jsonify({"error": "Please select both files."}), 400
    try:
        return jsonify({"ipfsHash": process_nrc_sides(front_file, back_file)})
    except Exception as e:
        return jsonify({"error": f"Failed to process NRCs: {str(e)}"}), 500

# --- NRC DOCUMENT VIEWER ENDPOINT ---
@app.route('/view-nrc/<ipfs_hash>')
def view_nrc_document(ipfs_hash):
    html_template = f"""
    <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>NRC Document Viewer</title><style>body{{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;margin:0;background-color:#f0f2f5;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;box-sizing:border-box}}.container{{background-color:white;padding:30px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);text-align:center;max-width:95%;width:1000px}}h1{{color:#333;margin-top:0}}p{{word-break:break-all}}#image-container{{display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-top:20px}}.image-wrapper{{border:1px solid #ddd;border-radius:8px;padding:10px;flex:1;min-width:300px}}.image-wrapper h2{{font-size:1.2em;margin:0 0 10px 0;color:#555}}img{{max-width:100%;height:auto;max-height:400px;border-radius:4px}}#loading,#error{{font-size:1.2em;color:#888;padding:40px}}</style></head><body><div class="container"><h1>NRC Document Viewer</h1><p><strong>Manifest Hash:</strong> {ipfs_hash}</p><div id="image-container"><div id="loading">Loading images from IPFS...</div><div id="error" style="display:none;color:red"></div></div></div><script>async function fetchAndDisplayImages(){{const e="{ipfs_hash}",t=`https://ipfs.io/ipfs/${{e}}`,n=document.getElementById("image-container"),a=document.getElementById("loading"),o=document.getElementById("error");try{{const i=await fetch(t);if(!i.ok)throw new Error(`Failed to fetch manifest. Status: ${{i.status}}`);const r=await i.json();if(!r.image_front||!r.image_back)throw new Error("Manifest JSON is missing image hashes.");const d=r.image_front.replace("ipfs://",""),s=r.image_back.replace("ipfs://","");a.style.display="none",n.innerHTML=`<div class="image-wrapper"><h2>NRC Front</h2><img src="https://ipfs.io/ipfs/${{d}}" alt="NRC Front Image"></div><div class="image-wrapper"><h2>NRC Back</h2><img src="https://ipfs.io/ipfs/${{s}}" alt="NRC Back Image"></div>`}}catch(c){{a.style.display="none",o.textContent=`Error: ${{c.message}}`,o.style.display="block"}}}}window.onload=fetchAndDisplayImages;</script></body></html>
    """
    return html_template

# --- Run the Server ---
if __name__ == '__main__':
    if not all([PINATA_API_KEY, PINATA_API_SECRET]):
        print("FATAL ERROR: PINATA_API_KEY and PINATA_API_SECRET must be set in your .env file.")
    else:
        print("Server is ready and configured with Pinata keys.")
        app.run(debug=True, port=5000)

