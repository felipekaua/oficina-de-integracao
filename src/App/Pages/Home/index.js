import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router";
import container from "../../../assets/login/container.png";

const Home = () => {

    const navigate = useNavigate();
    const [loginShop, setLoginShop] = useState(false);

    function navigateToLoginClient(){
      navigate("/loginClient");
    }

    return(
      <>
        <div className="blackScreen"></div>
        <div className="background"></div>
        <div className="login">
          <img src={container} alt="container" />
          <div>
            {loginShop ?
              <>
                <button>ADMIN</button>
                <button>FUNCIONÁRIO</button>
              </>
              :
              <>
                <button onClick={navigateToLoginClient}>CLIENTE</button>
                <button onClick={()=>{setLoginShop(true)}}>ESTABELECIMENTO</button>
                
              </>
            }
            
          </div>
        </div>
      </>
    )
  }
  
  export default Home;