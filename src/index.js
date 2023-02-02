import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB5WDLaDNDXlT4vbkNiq0-PzjMbkwZ9pww",
  authDomain: "react-chat-web-friends.firebaseapp.com",
  projectId: "react-chat-web-friends",
  storageBucket: "react-chat-web-friends.appspot.com",
  messagingSenderId: "520000337696",
  appId: "1:520000337696:web:f0ab95d74b210aba9ac945"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
