import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './App/Pages/Home';
import LoginClient from './App/Pages/Client/LoginClient';
import Menu from './App/Pages/Shop/Menu';
import Lanchonete from './App/Pages/Shop/Lanchonete';
import Dashboard from './App/Pages/Client/Dashboard';
import Reviews from './App/Pages/Client/Reviews';
import ShopReviews from './App/Pages/Shop/ShopReviews';

export default function Router(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/loginClient" element={<LoginClient/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/reviews' element={<Reviews/>}/>

      <Route path="/menu" element={<Menu/>}/>
      <Route path="/lanchonete" element={<Lanchonete/>}/>
      <Route path="/avaliações" element={<ShopReviews/>}/>
    </Routes>
  );
};
