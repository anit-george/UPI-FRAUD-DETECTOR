from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained Random Forest model and label encoders
try:
    model = joblib.load('model1.pkl')
    label_encoders = joblib.load('label_encoders.pkl')
except Exception as e:
    app.logger.error(f"Error loading the model or label encoders: {str(e)}")
    model = None
    label_encoders = {}

app.logger.info(f"Label Encoders Loaded: {label_encoders.keys()}")

# Encode categorical input features with validation
def encode_input(input_data):
    encoded_data = {}

    # List of expected keys (categorical features first)
    expected_keys = [
        'transactionType', 'paymentGateway', 'transactionCity', 'transactionState',
        'transactionStatus', 'deviceOS', 'merchantCategory', 'transactionChannel', 
        'year', 'month',  # these two can be categorical or numeric based on your data
        'transactionFrequency', 'transactionAmountDeviation', 
        'daysSinceLastTransaction', 'amount'
    ]
    
    for column in expected_keys:
        if column in input_data:
            try:
                if column in label_encoders:
                    # Ensure value exists in encoder classes to avoid transformation errors
                    if input_data[column] not in label_encoders[column].classes_:
                        raise ValueError(f"Invalid value for {column}: {input_data[column]}")
                    # Categorical features: Use label encoders to transform them
                    encoded_data[column] = label_encoders[column].transform([input_data[column]])[0]
                else:
                    # Numeric features: Convert to float
                    encoded_data[column] = float(input_data[column])
            except ValueError as ve:
                app.logger.error(f"Value error when encoding {column}: {ve}")
                raise ValueError(f"Invalid value for {column}: {input_data[column]}")
            except Exception as e:
                app.logger.error(f"Error encoding {column}: {str(e)}")
                raise Exception(f"Error encoding {column}: {str(e)}")
        else:
            app.logger.error(f"Missing key: {column}")  # Log missing keys
            raise KeyError(f"Missing key: {column}")

    return encoded_data

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        app.logger.info(f"Received input data: {input_data}")  # Log incoming data

        # Encode the input data
        encoded_data = encode_input(input_data)

        # Prepare features for the model
        features = np.array([[encoded_data[key] for key in encoded_data]])

        # Check if the model is loaded
        if model is None:
            raise ValueError("Model not loaded successfully.")

        # Perform prediction using the model
        prediction = model.predict(features)

        # Map prediction to human-readable result
        prediction_result = 'Fraudulent' if prediction[0] == 1 else 'Legitimate'

        return jsonify({"prediction": prediction_result})

    except ValueError as ve:
        app.logger.error(f"Value error during prediction: {str(ve)}")
        return jsonify({"error": str(ve)}), 400
    except KeyError as ke:
        app.logger.error(f"Missing key error: {str(ke)}")
        return jsonify({"error": f"Missing key: {str(ke)}"}), 400
    except Exception as e:
        app.logger.error(f"Error during prediction: {str(e)}")
        return jsonify({"error": "Internal server error. Please try again later."}), 500

if __name__ == '__main__':
    app.run(debug=True)
