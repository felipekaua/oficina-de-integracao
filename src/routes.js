import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './App/Pages/Home';
import Menu from './App/Pages/Shop/Menu';
import Lanchonete from './App/Pages/Shop/Lanchonete';
import Dashboard from './App/Pages/Client/Dashboard';
import Reviews from './App/Pages/Client/Reviews';
import ShopReviews from './App/Pages/Shop/ShopReviews';
import LanchoneteCliente from './App/Pages/Client/Lanchonete';
import { UserAuthContextProvider } from './App/context/UserAuthContext.js';
import ProtectedRoute from './App/context/ProtectedRoute.js';
import Historic from './App/Pages/Client/Historic';
import Withdrawal from './App/Pages/Client/Withdrawal';

export default function Router(){

  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/lanchonete-cliente" element={<ProtectedRoute><LanchoneteCliente/></ProtectedRoute>}/>
        <Route path="/historico" element={<ProtectedRoute><Historic/></ProtectedRoute>}/>
        <Route path="/retirada" element={<ProtectedRoute><Withdrawal/></ProtectedRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path='/reviews' element={<ProtectedRoute><Reviews/></ProtectedRoute>}/>

        <Route path="/menu" element={<ProtectedRoute><Menu/></ProtectedRoute>}/>
        <Route path="/lanchonete" element={<ProtectedRoute><Lanchonete/></ProtectedRoute>}/>
        <Route path="/avaliações" element={<ProtectedRoute><ShopReviews/></ProtectedRoute>}/>
      </Routes>
    </UserAuthContextProvider>
  );
};
