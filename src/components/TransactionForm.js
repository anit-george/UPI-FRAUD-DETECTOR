import React, { useState } from "react";

function TransactionForm() {
  const [formData, setFormData] = useState({
    transactionType: "Refund",
    paymentGateway: "SamplePay",
    transactionCity: "Durgapur",
    transactionState: "Chhattisgarh",
    transactionStatus: "Completed",
    deviceOS: "MacOS",
    transactionFrequency: 1,
    merchantCategory: "Brand Vouchers and OTT",
    transactionChannel: "In-store",
    transactionAmountDeviation: 0.0,
    daysSinceLastTransaction: 5,
    amount: 396.62,
    year: 2023,
    month: "Apr",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        setPrediction(result.prediction);
      } else {
        setErrorMessage(`Error: ${result.error}`);
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Error connecting to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Transaction Prediction Form</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {prediction && <p>Prediction: {prediction}</p>}

      <label>
        Transaction Type:
        <select name="transactionType" value={formData.transactionType} onChange={handleChange}>
          <option value="Refund">Refund</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Subscription">Subscription</option>
          <option value="Investment">Investment</option>
        </select>
      </label>

      <label>
        Payment Gateway:
        <select name="paymentGateway" value={formData.paymentGateway} onChange={handleChange}>
          <option value="SamplePay">SamplePay</option>
          <option value="UPI Pay">UPI Pay</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label>
        Transaction City:
        <input type="text" name="transactionCity" value={formData.transactionCity} onChange={handleChange} />
      </label>

      <label>
        Transaction State:
        <input type="text" name="transactionState" value={formData.transactionState} onChange={handleChange} />
      </label>

      <label>
        Transaction Status:
        <select name="transactionStatus" value={formData.transactionStatus} onChange={handleChange}>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </label>

      <label>
        Device OS:
        <select name="deviceOS" value={formData.deviceOS} onChange={handleChange}>
          <option value="MacOS">MacOS</option>
          <option value="Windows">Windows</option>
          <option value="Android">Android</option>
        </select>
      </label>

      <label>
        Transaction Frequency:
        <input type="number" name="transactionFrequency" value={formData.transactionFrequency} onChange={handleChange} />
      </label>

      <label>
        Merchant Category:
        <input type="text" name="merchantCategory" value={formData.merchantCategory} onChange={handleChange} />
      </label>

      <label>
        Transaction Channel:
        <select name="transactionChannel" value={formData.transactionChannel} onChange={handleChange}>
          <option value="In-store">In-store</option>
          <option value="Online">Online</option>
          <option value="Mobile">Mobile</option>
        </select>
      </label>

      <label>
        Transaction Amount Deviation:
        <input type="number" name="transactionAmountDeviation" value={formData.transactionAmountDeviation} onChange={handleChange} />
      </label>

      <label>
        Days Since Last Transaction:
        <input type="number" name="daysSinceLastTransaction" value={formData.daysSinceLastTransaction} onChange={handleChange} />
      </label>

      <label>
        Amount:
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
      </label>

      <label>
        Year:
        <input type="number" name="year" value={formData.year} onChange={handleChange} />
      </label>

      <label>
        Month:
        <select name="month" value={formData.month} onChange={handleChange}>
          <option value="Jan">Jan</option>
          <option value="Feb">Feb</option>
          <option value="Mar">Mar</option>
          <option value="Apr">Apr</option>
          <option value="May">May</option>
          <option value="Jun">Jun</option>
          <option value="Jul">Jul</option>
          <option value="Aug">Aug</option>
          <option value="Sep">Sep</option>
          <option value="Oct">Oct</option>
          <option value="Nov">Nov</option>
          <option value="Dec">Dec</option>
        </select>
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default TransactionForm;
