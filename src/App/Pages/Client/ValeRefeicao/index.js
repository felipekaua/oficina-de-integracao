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

  const [vouchers, setVouchers] = useState(0);
  const [voucherQtd, setVoucherQtd] = useState(0);
  const [user, setUser] = useState("");
	const [qr, setQr] = useState('');

  const getItems= async (user) => {
    setUser(user);
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (docSnap.exists()) {
      setVouchers(Number(data.vouchers));
      GenerateQRCode(user);
    } else {
      console.log("No such document!");
    }
  };

	const GenerateQRCode = (url) => {
		QRCode.toDataURL(url, (err, url) => {
			if (err) return console.error(err)
			setQr(url)
		})
	}

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if (user) {
        getItems(user.uid);
      } else {
        // User is signed out
        // ...
      }
    });
  },[]);

  function handleBuy(){
    const submit = async()=>{
      await setDoc(doc(db, "users", user), {
        vouchers: voucherQtd+vouchers
      });
      getItems(user);
    }
    submit();
    document.getElementById("vouchers").value = 0;
    setVoucherQtd(0);
  }

    return(
      <>
      <div className="pageContainerMobile">
      <Navbar/>
        <div className="generalContainerMobile">
          <div className="firstBlock">  
            <h2>Vales disponíveis</h2>
            <h3>{vouchers}</h3>
            <img src={qr} alt="" />
          </div>
          <div className="secondBlock">
            <h2>Comprar vales</h2>
            <div>
              <button onClick={()=>{if(voucherQtd>0){setVoucherQtd(Number(voucherQtd)-1)}}}>-</button>
              <input type="number" id="vouchers" value={voucherQtd} />
              <button onClick={()=>{setVoucherQtd(Number(voucherQtd)+1)}}>+</button>
            </div>
            <h2>Total: {voucherQtd*3.5}</h2>
            <h3>Forma de Pagamento</h3>
            <div>
              <input type="radio" id="pix" name="buyMethod" />
              <label htmlFor="pix">Pix</label>
            </div>
            <div>
              <input type="radio" id="cartao" name="buyMethod" />
              <label htmlFor="cartao">Cartão</label>
            </div>
            <button onClick={handleBuy}>Confirmar</button>
          </div>
          
        </div>
      </div>
      </>
    )
  }
  
  export default Withdrawal;