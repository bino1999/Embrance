from flask import Flask, request
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from scipy.special import softmax

app = Flask(__name__)

MODEL = "Hate-speech-CNERG/dehatebert-mono-english"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

@app.route("/classify", methods=["POST"])
def classify_message():
    message = request.json["message"]
    inputs = tokenizer.encode_plus(message, return_tensors='pt')
    outputs = model(**inputs)
    probs = softmax(outputs[0].detach().numpy(), axis=1)
    return {"hateSpeechProbability": float(probs[0][1])}

if __name__ == "__main__":
    app.run(port=6000)
