import React from "react";
import "./styles.scss";
import Navbar from "../../../Components/Navbar";
import { useEffect } from "react";
import { db, auth } from "../../../Firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { async } from "@firebase/util";

const Withdrawal = () => {

  const [vouchers, setVouchers] = useState([]);

  // Executa uma vez

  function refreshVouchers(){
    const user = auth.currentUser;
    const vouchersCollectionRef = collection(db, "users", user.uid, "withdrawal");
    const getVouchers= async () => {
      const data = await getDocs(vouchersCollectionRef);
      setVouchers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getVouchers();
  }

  useEffect(()=>{

  },[]);

  // Executa sempre que há movimentação

  useEffect(()=>{

  })

    return(
      <>
      <div className="pageContainerMobile">
      <Navbar/>
        <div className="generalContainerMobile">
        <button id="refresh" 
        onClick={()=>{refreshVouchers(); document.getElementById('refresh').style.display='none' }}>
        Carregar Vouchers
        </button>
        {vouchers.map((item)=>{
          return(<>
            <div>
              <h2>Id: {item.id}</h2>
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