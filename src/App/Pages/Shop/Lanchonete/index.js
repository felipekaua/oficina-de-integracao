import React from "react";
import "./styles.scss";
import Sidebar from "../../../Components/Sidebar";
import { useEffect } from "react";
import { db } from "../../../Firebase/firebase-config";
import { collection, doc, updateDoc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Lanchonete = () => {

    // Executa uma vez

    useEffect(()=>{

      
    },[]);

    // Executa sempre que há movimentação

    useEffect(()=>{
      
    })
    
    return(
      <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
        <div className="pageContainer">
          <Sidebar selected="lanchonete"/>
          <div className="menuContainer">
            <h1>Lanchonete</h1>
            <h2 className="subtitle">Edite o estoque da lanchonete</h2>
            
          </div>
        </div>
      </>
    )
  }
  
  export default Lanchonete;