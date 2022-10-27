import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './App/Pages/Home';
import LoginClient from './App/Pages/Client/LoginClient';
import Menu from './App/Pages/Shop/Menu';
import Lanchonete from './App/Pages/Shop/Lanchonete';
import Dashboard from './App/Pages/Client/Dashboard';

export default function Router(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/loginClient" element={<LoginClient/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>

      <Route path="/menu" element={<Menu/>}/>
      <Route path="/lanchonete" element={<Lanchonete/>}/>
    </Routes>
  );
};
