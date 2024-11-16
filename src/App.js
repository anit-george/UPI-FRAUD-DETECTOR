import React from 'react';
import TransactionForm from './components/TransactionForm';
import CSVUpload from './components/CSVUpload';

function App() {
  return (
    <div className="App">
      <h1>Welcome to your own UPI Transaction Fraud Detector!</h1>
      <TransactionForm />
      <CSVUpload />
    </div>
  );
}

export default App;