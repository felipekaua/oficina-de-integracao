import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './App/Pages/Home/index';

export default function Router(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
  );
};
