from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from lime.lime_text import LimeTextExplainer

import joblib
import os
import re
import io
import numpy as np

from dotenv import load_dotenv

from PIL import Image
import pytesseract

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = FastAPI()

load_dotenv()
FRONTEND_URL = os.getenv("FRONTEND_URL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model("lstm_model.h5")

tokenizer = joblib.load("tokenizer.pkl")

max_len = 200

class_names = ["FAKE", "REAL"]

lime_explainer = LimeTextExplainer(
    class_names=class_names
)

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z ]", "", text)
    text = re.sub(r"\s+", " ", text).strip()

    return text

def predict_proba_lime(texts):
    cleaned = [clean_text(t) for t in texts]
    sequences = tokenizer.texts_to_sequences(cleaned)

    padded = pad_sequences(
        sequences,
        maxlen=max_len,
        padding="post"
    )

    probs = model.predict(padded)

    return np.hstack([1 - probs, probs])

class NewsRequest(BaseModel):
    text: str

@app.post("/predict")
def predict(request: NewsRequest):

    try:
        text = clean_text(request.text)

        sequence = tokenizer.texts_to_sequences([text])

        padded = pad_sequences(
            sequence,
            maxlen=max_len,
            padding="post"
        )

        probability = float(model.predict(padded)[0][0])

        prediction = 1 if probability > 0.5 else 0

        result = "REAL" if prediction == 1 else "FAKE"

        lime_exp = lime_explainer.explain_instance(
            text,
            predict_proba_lime,
            num_features=10
        )

        lime_dict = dict(lime_exp.as_list())
        words = text.split()

        explanation = [
            {
                "word": w,
                "importance": float(lime_dict.get(w, 0))
            }
            for w in words
        ]

        return {
            "prediction": result,
            "confidence": round(probability * 100, 2),
            "explanation": explanation
        }

    except Exception as e:
        return {"error": str(e)}
        
pytesseract.pytesseract.tesseract_cmd = (
    r"Path to Tesseract OCR.exe file"
)

@app.post("/predict-image")
async def predict_image(
    text: str = Form(""),
    image: UploadFile = File(None)
):

    try:
        ocr_text = ""
        
        if image:
            contents = await image.read()
            img = Image.open(io.BytesIO(contents))
            ocr_text = pytesseract.image_to_string(img)

        final_text = clean_text(text + " " + ocr_text)

        sequence = tokenizer.texts_to_sequences([final_text])

        padded = pad_sequences(
            sequence,
            maxlen=max_len,
            padding="post"
        )

        probability = float(model.predict(padded)[0][0])

        prediction = 1 if probability > 0.5 else 0

        result = "REAL" if prediction == 1 else "FAKE"

        lime_exp = lime_explainer.explain_instance(
            final_text,
            predict_proba_lime,
            num_features=10
        )

        lime_dict = dict(lime_exp.as_list())
        words = final_text.split()

        explanation = [
            {
                "word": w,
                "importance": float(lime_dict.get(w, 0))
            }
            for w in words
        ]

        return {
            "prediction": result,
            "confidence": round(probability * 100, 2),
            "ocr_text": ocr_text,
            "final_text": final_text,
            "explanation": explanation
        }

    except Exception as e:
        return {"error": str(e)}
