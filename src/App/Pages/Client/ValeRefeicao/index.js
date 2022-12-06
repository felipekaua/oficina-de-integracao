import React from "react";
import "./styles.scss";
import Navbar from "../../../Components/Navbar";
import { useEffect } from "react";
import { db, auth } from "../../../Firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import voucher from '../../../../assets/client/voucher.png';
import QRCode from "qrcode"

const Withdrawal = () => {

  const [vouchers, setVouchers] = useState(0);
  const [voucherQtd, setVoucherQtd] = useState(0);
  const [user, setUser] = useState("");
	const [qr, setQr] = useState(voucher);

  const getItems= async (user) => {
    setUser(user);
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (docSnap.exists()) {
      setVouchers(Number(data.vouchers));
      GenerateQRCode("v-"+user);
    } else {
      console.log("No such document!");
    }
  };

	const GenerateQRCode = (url) => {
		QRCode.toDataURL(url, (err, url) => {
			if (err) return console.error(err)
			setQr(url);
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
    if(voucherQtd>0){
      try{
        const submit = async()=>{
          await setDoc(doc(db, "users", user), {
            vouchers: voucherQtd+vouchers
          });
          getItems(user);
        }
        submit();
        document.getElementById("vouchers").value = 0;
        setVoucherQtd(0);
        toast.success('Vale(s) comprado(s) com sucesso!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }catch{
        toast.error('Algo de errado ocorreu...', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });}
    }else{
      toast.error('Não é possível comprar 0 vales!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

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
      <div className="pageContainerMobile">
      <Navbar/>
        <div className="generalContainerMobile-vale">
          <h1>Vale Refeição</h1>
          <div className="firstBlock">  
            <h2>Vales disponíveis</h2>
            <h3>{vouchers}</h3>
            <img src={qr} alt="" />
          </div>
          <div className="secondBlock">
            <h2>Comprar vales</h2>
            <div className="compra-vale">
              <button className="add-vale" onClick={()=>{setVoucherQtd(Number(voucherQtd)+1)}}></button>
              <input type="number" id="vouchers" value={voucherQtd} />
              <button className="remove-vale" onClick={()=>{if(voucherQtd>0){setVoucherQtd(Number(voucherQtd)-1)}}}></button>
            </div>
            <h3>Preço total: R$ {voucherQtd*3.5}</h3>
            <h2>Forma de Pagamento</h2>
            <div className="options">
              <div className="option-buy">
                <label htmlFor="pix">Pix</label>
                <input type="radio" id="pix" name="buyMethod" />
              </div>
              <div className="line-buy"></div>
              <div className="option-buy">
                <label htmlFor="cartao">Cartão</label>
                <input type="radio" id="cartao" name="buyMethod" />
              </div>
            </div>
            
            <button onClick={handleBuy}>Confirmar</button>
          </div>
          
        </div>
      </div>
      </>
    )
  }
  
  export default Withdrawal;