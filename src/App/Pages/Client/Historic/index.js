import React from "react";
import "./styles.scss";
import Navbar from "../../../Components/Navbar";
import { useEffect } from "react";
import { db, auth } from "../../../Firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { async } from "@firebase/util";

const Historic = () => {

  const [purchases, setPurchases] = useState([]);

  // Executa uma vez

  function refreshPurchases(user){
    const purchasesCollectionRef = collection(db, "users", user, "historic");
    const getPurchases= async () => {
      const data = await getDocs(purchasesCollectionRef);
      setPurchases(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPurchases();
  }

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        refreshPurchases(uid);
        console.log("is running the function")
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
        {purchases.map((item)=>{
          return(<>
            <div>
              <h2>Data: {item.date}</h2>
              <h2>Comprado: {item.buy}</h2>
              <h2>Preço total: R$ {item.price}</h2>
            </div>
          </>)
        })}
      </div>
      </div>
      </>
    )
  }
  
  export default Historic;