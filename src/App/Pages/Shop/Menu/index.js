import React, { useEffect, useState }  from "react";
import "./styles.scss";
import Sidebar from "../../../Components/Sidebar";
import { db } from "../../../Firebase/firebase-config";
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
import {Html5Qrcode} from "html5-qrcode"
import { AiOutlineQrcode } from "react-icons/ai";
import { BiQrScan } from "react-icons/bi";

const Menu = () => {
  const navigate = useNavigate();

    const menuCollectionRef = collection(db, "menu");
    const [menu, setMenu] = useState([]);
    const a = ["alm","jan"];
    const b = ["segunda", "terça", "quarta", "quinta", "sexta", "sabado"];
    const [qrMode, setQrMode] = useState(false);

    // qr code Scanner

    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState("");
    // Executa uma vez

    useEffect(()=>{

      const getMenu= async () => {
        const data = await getDocs(menuCollectionRef);
        setMenu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getMenu();

      Html5Qrcode.getCameras().then((items)=>{
       setDevices(devices.concat(items));
      })
      
    },[]);

    // Executa sempre que há movimentação

    useEffect(()=>{
      a.forEach(ref => {
        b.forEach(day => {
          const short = ref+"-"+day;
          menu.map((item)=>{
            if(item.id === short){
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

    function handleScan(text){
      const splitText = text.split('-');
      if(splitText[0]==="r"){
        const getItems= async () => {
          const docRef = collection(db, "users", splitText[1], "withdrawal");
          const docSnap = await getDocs(docRef);
          const data = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          data.map(item=>{
            if(item.qrcode===text){
              if(item.quantity>0){
                const update = async()=>{
                  const newDocRef = doc(db, "users", splitText[1], "withdrawal", item.id);
                  await updateDoc(newDocRef, {
                    quantity: Number(item.quantity)-1,
                  });
                }
                update();
              }else{
                const update = async()=>{
                  const newDocRef = doc(db, "users", splitText[1], "withdrawal", item.id);
                  await deleteDoc(newDocRef);
                }
                update();
              }
            }
          })
        };
        getItems();
        toast.success('Item escaneado com sucesso', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }else if(splitText[0]==="v"){
        const getItems= async () => {
          const docRef = doc(db, "users", splitText[1]);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          if(data.vouchers>0){
            await setDoc(docRef, {
              vouchers: Number(data.vouchers)-1,
            });
          toast.success('Vale escaneado com sucesso', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          }else{
            toast.error('Não há Vales', {
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
        };
        getItems();
      }else{}
    }

    function qr(){
      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
          const html5QrCode = new Html5Qrcode("reader");
          html5QrCode.start(
            selectedDevice, 
            {fps: 10},(decodedText, decodedResult) => {

              handleScan(decodedText);

              html5QrCode.stop().then((ignore) => {})
              .catch((err) => {
                toast.error(err, {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
              });
            },
            (errorMessage) => {})
          .catch((err) => {
            toast.error(err, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          });
        }
      }).catch(err => {
        toast.error(err, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      });
    }

    function toggle(){
      if(qrMode){
        document.getElementsByClassName('menuContainer')[0].style.display = "flex";
        document.getElementsByClassName('sidebar')[0].style.display = "flex";
        document.getElementsByClassName('wave')[0].style.display = "flex";
        document.getElementsByClassName('mobileMenu')[0].style.display = "none";
        setQrMode(false);
      }else{
        document.getElementsByClassName('menuContainer')[0].style.display = "none";
        document.getElementsByClassName('sidebar')[0].style.display = "none";
        document.getElementsByClassName('wave')[0].style.display = "none";
        document.getElementsByClassName('mobileMenu')[0].style.display = "flex";
        setQrMode(true);
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
        <div className="pageContainer">
          <Sidebar/>
          <div className="menuContainer">
            <div className="menuHeader">
              <h1>Bem vindo!</h1>
              <AiOutlineQrcode onClick={toggle}/>
            </div>
            <h2 className="subtitle">Altere o cardápio da semana</h2>
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
          <div className="mobileMenu">
            <div id="reader" className="reader"></div>
            <div>
              <select onChange={(e)=>{setSelectedDevice(e.target.value)}} name="selectedDevice" id="">
                <option>Selecione uma Câmera</option>
                {devices.map((device)=>{
                  return(
                    <>
                      <option value={device.id}>{device.label}</option>
                    </>
                  )
                })}
              </select>
              <button onClick={qr}><BiQrScan/></button>
            </div>
            <h2 onClick={toggle}>Voltar</h2>
          </div>
        </div>
      </>
    )
  }
  
  export default Menu;