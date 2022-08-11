import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// BrowserRouter 没有
// import { BrowserRouter } from "react-router-dom";

const root = document.getElementById('root');

const element = (
    <App />
);

ReactDOM.hydrateRoot(root, element);
