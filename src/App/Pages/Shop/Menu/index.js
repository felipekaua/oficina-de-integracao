import React from "react";
import "./styles.scss";
import Sidebar from "../../../Components/Sidebar";
import { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { db } from "../../../Firebase/firebase-config";
import { collection, doc, updateDoc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Menu = () => {

    const menuCollectionRef = collection(db, "menu");
    const [menu, setMenu] = useState([]);
    const a = ["alm","jan"];
    const b = ["segunda", "terça", "quarta", "quinta", "sexta", "sabado"];

    // Executa uma vez

    useEffect(()=>{

      const getMenu= async () => {
        const data = await getDocs(menuCollectionRef);
        setMenu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getMenu();
      
    },[]);

    // Executa sempre que há movimentação

    useEffect(()=>{
      a.forEach(ref => {
        b.forEach(day => {
          const short = ref+"-"+day;
          menu.map((item)=>{
            if(item.id == short){
              const textArea = document.getElementById(short);
              textArea.value = item.content;
            }
          })
          });  
      });
    })

    const submit = async(docRef, content)=>{
      await setDoc((docRef),{
        content: content,
      });
    }

    function updateMenu(){
      a.forEach(ref => {
        b.forEach(day => {
          const short = ref+"-"+day;
          const docRef = doc(db, "menu", short)
          const textArea = document.getElementById(short);
          submit(docRef, textArea.value);
        });  
      });
      toast.success('Cardápio Atualizado!', {
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
          <Sidebar/>
          <div className="menuContainer">
            <h1>Bem vindo!</h1>
            <h2 className="subtitle">Altere o cardápio da semana <div></div></h2>
            <div className="menuSheet">
              <div className="horizontalListing">
                <h3>Segunda-Feira</h3>
                <h3>Terça-Feira</h3>
                <h3>Quarta-Feira</h3>
                <h3>Quinta-Feira</h3>
                <h3>Sexta-Feira</h3>
                <h3>Sábado</h3>
              </div>
              <h2>Almoço</h2>
              <div className="contentContainer">
                <textarea rows="5" id="alm-segunda"></textarea>
                <textarea rows="5" id="alm-terça"></textarea>
                <textarea rows="5" id="alm-quarta"></textarea>
                <textarea rows="5" id="alm-quinta"></textarea>
                <textarea rows="5" id="alm-sexta"></textarea>
                <textarea rows="5" id="alm-sabado"></textarea>
              </div>
              <h2>Jantar</h2>
              <div className="contentContainer">
                <textarea rows="5" id="jan-segunda"></textarea>
                <textarea rows="5" id="jan-terça"></textarea>
                <textarea rows="5" id="jan-quarta"></textarea>
                <textarea rows="5" id="jan-quinta"></textarea>
                <textarea rows="5" id="jan-sexta"></textarea>
                <textarea rows="5" id="jan-sabado"></textarea>
              </div>
            </div> 
            <button onClick={updateMenu}>Salvar</button>
          </div>
        </div>
      </>
    )
  }
  
  export default Menu;