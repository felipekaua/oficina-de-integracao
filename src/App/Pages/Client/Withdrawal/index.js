import React from "react";
import "./styles.scss";
import Navbar from "../../../Components/Navbar";
import { useEffect } from "react";
import { db, auth } from "../../../Firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import QRCode from "qrcode"

const Withdrawal = () => {

  const [vouchers, setVouchers] = useState([]);
	const [qr, setQr] = useState('');

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

  const GenerateQRCode = (url) => {
		QRCode.toDataURL(url, (err, url) => {
			if (err) return console.error(err)
			setQr(url)
		})
	}

  function handleModal(product){
    GenerateQRCode(product);
    document.getElementsByClassName("modalContainer")[0].style.display = "flex";
    document.getElementsByClassName("subModalContainer")[0].style.display = "flex";
  }

  function resetModal(){
    document.getElementsByClassName("modalContainer")[0].style.display = "none";
    document.getElementsByClassName("subModalContainer")[0].style.display = "none";

  }

    return(
      <>
      <div className="pageContainerMobile">
        <Navbar/>
        <div className="generalContainerMobile-retirada">
          <div className="voucherCointainer">
            <h1>Retirada</h1>
            {vouchers.map((item)=>{
              return(<>
                <div className="items-buy" onClick={()=>{handleModal(item.qrcode);}}>
                  <h2>Nome: {item.name}</h2>
                  <h2>Quantidade: {item.quantity}</h2>
                </div>
              </>)
            })}
          </div>
        </div>
      </div>
      <div onClick={resetModal} className="modalContainer"></div>
      <div className="subModalContainer">
        <img src={qr} alt="" />
      </div>
      </>
    )
  }
  
  export default Withdrawal;