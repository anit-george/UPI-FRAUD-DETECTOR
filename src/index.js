import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import custom CSS here (optional)
import App from './App';

// Importing Bootstrap CSS (you can also include this in the App component)
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
