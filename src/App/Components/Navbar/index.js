import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router";
import { useState } from "react";
import { auth } from "../../Firebase/firebase-config";

const Navbar = ({selected}) => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  function openNavbar(){
    if(navbar){
      document.getElementById("nav-icon").classList.remove("open");
      document.getElementById("body").classList.remove("show");
      setNavbar(false);
    }else{
      document.getElementById("nav-icon").classList.add("open");
      document.getElementById("body").classList.add("show");
      setNavbar(true);
    }
  }
    return(
      <>
        <div className="headerBar">
          <div className="button"  onClick={openNavbar}>
            <div id="nav-icon">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>  
        <div className="bodyBar" id="body">
          <div>
            <h2 onClick={()=>{navigate("/dashboard"); openNavbar();}}>Início</h2>
            <h2>Vale Refeição</h2>
            <h2 onClick={()=>{navigate("/lanchonete-cliente"); openNavbar();}}>Lanchonete</h2>
            <h2 onClick={()=>{navigate("/retirada"); openNavbar();}}>Retirada</h2>
            <h2 onClick={()=>{navigate("/historico"); openNavbar();}}>Histórico</h2>
            <h2 onClick={()=>{navigate("/reviews"); openNavbar();}}>Avaliações</h2>
          </div>
          <div>
            <h2 onClick={()=>{auth.signOut().then(()=>{navigate("/");})}}>Sair</h2>
          </div>
        </div> 
      </>
    )
  }
  
  export default Navbar;