import React, { useState } from 'react';

function CSVUpload() {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setPredictions(result.predictions);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
      
      {predictions.length > 0 && (
        <div>
          <h2>Predictions:</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Type</th>
                <th>Payment Gateway</th>
                <th>State</th>
                <th>Amount</th>
                <th>Prediction</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, index) => (
                <tr key={index}>
                  <td>{pred.date}</td>
                  <td>{pred.transaction_type}</td>
                  <td>{pred.payment_gateway}</td>
                  <td>{pred.transaction_state}</td>
                  <td>{pred.transaction_amount}</td>
                  <td>{pred.Prediction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CSVUpload;

