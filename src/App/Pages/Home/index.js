import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router";
import container from "../../../assets/login/container.png";

const Home = () => {

    const navigate = useNavigate();

    function navigateToLoginClient(){
      navigate("/loginClient");
    }
    function navigateToLoginShop(){
      navigate("/menu");
    }

    return(
      <>
        <div className="blackScreen"></div>
        <div className="background"></div>
        <div className="login">
          <img src={container} alt="container" />
          <div>
            <button onClick={navigateToLoginClient}>ADMIN</button>
            <button onClick={navigateToLoginShop}>FUNCIONÁRIO</button>
          </div>
        </div>
      </>
    )
  }
  
  export default Home;