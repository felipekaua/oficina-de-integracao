import React, { useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router";
import container from "../../../assets/login/container.png";
import 
{ 
   getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signInAnonymously, 
  setPersistence, browserSessionPersistence, db
} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';


const Home = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();

    function navigateToLoginClient(){
      navigate("/dashboard");
    }
    function navigateToLoginShop(){
      navigate("/menu");
    }

    function resetModal(){
      document.getElementsByClassName("loginModal")[0].style.display = "none";
      document.getElementsByClassName("loginModalContainer")[0].style.display = "none";
      setEmail("");
      setPassword("");
      document.getElementById("email").value="";
      document.getElementById("password").value="";
    }

    function Register(event){
      event.preventDefault();
      setPersistence(auth, browserSessionPersistence);
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setLoggedIn(true);
        resetModal();
      })
      .catch(()=>{
        toast.error('Essa conta já Existe!', {
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

    function Login(event){
      event.preventDefault();
      setPersistence(auth, browserSessionPersistence).then(()=>{
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        // Signed in 
        setLoggedIn(true);
        resetModal();
      })
      .catch(()=>{
        toast.error('Certifique-se que seu email e senha estão corretos!', {
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

    function Anonimo(){
      signInAnonymously(auth)
      .then(() => {
        // Signed in..
        setLoggedIn(true);
        resetModal();
      })
      .catch();
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
        <div className="blackScreen"></div>
        <div className="background"></div>
        <div className="login">
          <img src={container} alt="container" />
          <div>
            {!loggedIn && <>
            <button 
            onClick={()=>{
              document.getElementsByClassName("loginModal")[0].style.display = "flex";
              document.getElementsByClassName("loginModalContainer")[0].style.display = "flex";
            }}>
            Entrar
            </button>
            <button onClick={Anonimo}>Debug Login</button>
            </>}
            {loggedIn && <>
            <button onClick={navigateToLoginShop}>Loja</button>
            <button onClick={navigateToLoginClient}>Cliente</button>
            </>}
          </div>
        </div>
        <div className="loginModal"
          onClick={resetModal}>
        </div>
        <div className="loginModalContainer">
          <div>
            <input id="email" placeholder="email" type="text" onChange={(e)=>{setEmail(e.target.value)}} />
            <input id="password" placeholder="senha" type="text" onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <div>
            <button onClick={Login}>Login</button>
            <button onClick={Register}>Cadastrar</button>
          </div>
        </div>
      </>
    )
  }
  
  export default Home;