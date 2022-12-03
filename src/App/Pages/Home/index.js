import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router";
import container from "../../../assets/login/container.png";
import 
{ 
  auth, getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signInAnonymously, 
  setPersistence, browserSessionPersistence, db
} from "firebase/auth";


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
        alert("conta criada");
        setLoggedIn(true);
        resetModal();
      })
      .catch();
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
      .catch();
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
            Entrar com conta
            </button>
            <button onClick={Anonimo}>Entrar como convidado</button>
            </>}
            {loggedIn && <>
            <button onClick={navigateToLoginShop}>LOGIN</button>
            <button onClick={navigateToLoginClient}>MOBILE</button>
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