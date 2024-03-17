from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer, GPT2LMHeadModel, GPT2Tokenizer
from threading import Thread
from flask_cors import CORS
from scipy.special import softmax

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load RoBERTa model and tokenizer
roberta_model = AutoModelForSequenceClassification.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")
tokenizer = AutoTokenizer.from_pretrained("cardiffnlp/twitter-roberta-base-sentiment")

# Load GPT-2 model and tokenizer for generating advice
gpt2_model = GPT2LMHeadModel.from_pretrained("gpt2")
gpt2_tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Load DehateBERT model and tokenizer
dehatebert_model = AutoModelForSequenceClassification.from_pretrained("Hate-speech-CNERG/dehatebert-mono-english")
dehatebert_tokenizer = AutoTokenizer.from_pretrained("Hate-speech-CNERG/dehatebert-mono-english")

def polarity_scores_roberta(text):
    # Perform sentiment analysis using the RoBERTa model
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = roberta_model(**inputs)
    probabilities = outputs.logits.softmax(dim=-1).squeeze().tolist()
    sentiment_labels = ["negative", "neutral", "positive"]
    sentiment_idx = probabilities.index(max(probabilities))
    sentiment = sentiment_labels[sentiment_idx]
    return {f'{sentiment}': max(probabilities)}

def generate_advice(prompt):
    input_ids = gpt2_tokenizer.encode(prompt, return_tensors="pt")
    output = gpt2_model.generate(
        input_ids,
        max_length=300,
        num_beams=5,
        no_repeat_ngram_size=2,
        top_k=50,
        top_p=0.95,
        temperature=0.7
    )
    generated_text = gpt2_tokenizer.decode(output[0], skip_special_tokens=True)
    return generated_text

def generate_advice_in_background(negative_reasons, advice_dict):
    for reason in negative_reasons:
        advice_prompt = f"How to cope with {reason.lower()} stress"
        advice_text = generate_advice(advice_prompt)
        advice_dict[reason] = advice_text

@app.route("/", methods=["GET"])
def index():
    return "Hello, World! This is the root endpoint."

@app.route("/analyze_sentiment", methods=["POST"])
def analyze_sentiment():
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"error": "Input text cannot be empty"}), 400

    roberta_result = polarity_scores_roberta(text)
    sentiment_category = max(roberta_result, key=roberta_result.get)

    if sentiment_category == 'negative':
        negative_reasons = []
        if "work" in text.lower():
            negative_reasons.append("Work-related stress")
        if "relationship" in text.lower():
            negative_reasons.append("Challenges in relationships")
        if negative_reasons:
            advice_dict = {}
            thread = Thread(target=generate_advice_in_background, args=(negative_reasons, advice_dict))
            thread.start()
            # Wait for the thread to complete
            thread.join()
            return jsonify({
                "sentiment": sentiment_category.capitalize(),
                "negative_reasons": negative_reasons,
                "advice": advice_dict
            })

    return jsonify({"sentiment": sentiment_category.capitalize()})

@app.route("/classify", methods=["POST"])
def classify_message():
    message = request.json["message"]
    inputs = dehatebert_tokenizer.encode_plus(message, return_tensors='pt')
    outputs = dehatebert_model(**inputs)
    probs = softmax(outputs[0].detach().numpy(), axis=1)
    return {"hateSpeechProbability": float(probs[0][1])}

if __name__ == "__main__":
    app.run(port=5000)
