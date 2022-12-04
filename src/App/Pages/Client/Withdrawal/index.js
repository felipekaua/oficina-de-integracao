import React from "react";
import "./styles.scss";
import Navbar from "../../../Components/Navbar";
import { useEffect } from "react";
import { db, auth } from "../../../Firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Withdrawal = () => {

  const [vouchers, setVouchers] = useState([]);

  // Executa uma vez

  function refreshVouchers(user){
    const vouchersCollectionRef = collection(db, "users", user, "withdrawal");
    const getVouchers= async () => {
      const data = await getDocs(vouchersCollectionRef);
      setVouchers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getVouchers();
  }

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        refreshVouchers(uid);
      } else {
        // User is signed out
        // ...
      }
    });

  },[]);

  // Executa sempre que há movimentação

  useEffect(()=>{

  })

    return(
      <>
      <div className="pageContainerMobile">
      <Navbar/>
        <div className="generalContainerMobile">
        {vouchers.map((item)=>{
          return(<>
            <div>
              <h2>Nome: {item.name}</h2>
              <h2>Quantidade: {item.quantity}</h2>
            </div>
          </>)
        })}
          
        </div>
      </div>
      </>
    )
  }
  
  export default Withdrawal;