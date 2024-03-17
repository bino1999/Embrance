from transformers import T5Tokenizer, T5ForConditionalGeneration

# Load the fine-tuned model and tokenizer
model = T5ForConditionalGeneration.from_pretrained('C:/Users/chamo/Desktop/chatPlatformReBuild/fine_tuned_model.pth')
tokenizer = T5Tokenizer.from_pretrained('t5-base')

# Function to identify reasons
def identify_reasons(text):
    input_text = "reasons: " + text
    input_ids = tokenizer.encode(input_text, return_tensors='pt')
    outputs = model.generate(input_ids, max_length=200, num_beams=4, temperature=1.0)
    decoded_output = tokenizer.decode(outputs[0])
    return decoded_output

# Get text from the command line
text = input("Enter your text: ")

# Identify reasons and print the result
print(identify_reasons(text))
