import React, { useEffect, useState }  from "react";
import { db } from "../../../Firebase/firebase-config";
import { collection, doc, updateDoc, getDocs, getDoc, setDoc } from "firebase/firestore";
import Navbar from "../../../Components/Navbar";
import "./styles.scss";

const Dashboard = () => {
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
    return(
      <>
      <div className="pageContainerMobile">
        <Navbar/>
        <div className="generalContainerMobile">
          <div>
            <h1>Bem Vindo!</h1>
            <h2>Confira o cardápio da semana</h2>
          </div>
          <div className="menuContainerMobile">
            <div className="overflowWrapper">
              <div className="horizontalListingMobile">
                <h2>Segunda-Feira</h2>
                <h2>Terça-Feira</h2>
                <h2>Quarta-Feira</h2>
                <h2>Quinta-Feira</h2>
                <h2>Sexta-Feira</h2>
                <h2>Sábado</h2>
              </div>
              <div className="subtitle">
                <h2>Almoço</h2>
              </div>
              <div className="contentContainerMobile">
                <textarea readOnly rows="5" id="alm-segunda"></textarea>
                <textarea readOnly rows="5" id="alm-terça"></textarea>
                <textarea readOnly rows="5" id="alm-quarta"></textarea>
                <textarea readOnly rows="5" id="alm-quinta"></textarea>
                <textarea readOnly rows="5" id="alm-sexta"></textarea>
                <textarea readOnly rows="5" id="alm-sabado"></textarea>
              </div>
              <div className="subtitle">
                <h2>Jantar</h2>
              </div>
              <div className="contentContainerMobile">
                <textarea readOnly rows="5" id="jan-segunda"></textarea>
                <textarea readOnly rows="5" id="jan-terça"></textarea>
                <textarea readOnly rows="5" id="jan-quarta"></textarea>
                <textarea readOnly rows="5" id="jan-quinta"></textarea>
                <textarea readOnly rows="5" id="jan-sexta"></textarea>
                <textarea readOnly rows="5" id="jan-sabado"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  
  export default Dashboard;