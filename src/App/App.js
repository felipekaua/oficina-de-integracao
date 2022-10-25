import React from 'react';
import Routes from '../routes.js';
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes/> 
      </BrowserRouter>
    </>
  );
}

