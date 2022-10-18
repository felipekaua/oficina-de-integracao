import React from "react";
import "./styles.scss";
import container from "../../../assets/login/container.png";

const loginClient = () => {
    return(
      <>
        <div className="blackScreen"></div>
        <div className="background"></div>
        <div className="login">
          <img src={container} alt="container" />
          <div>
            <button>CLIENTE</button>
            <button>ESTABELECIMENTO</button>
          </div>
        </div>
      </>
    )
  }
  
  export default loginClient;