import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './App/Pages/Home/index';
import LoginClient from './App/Pages/Client/LoginClient/index';
import Menu from './App/Pages/Shop/Menu/index';
import Lanchonete from './App/Pages/Shop/Lanchonete';

export default function Router(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/loginClient" element={<LoginClient/>}/>
      <Route path="/menu" element={<Menu/>}/>
      <Route path="/lanchonete" element={<Lanchonete/>}/>
    </Routes>
  );
};
