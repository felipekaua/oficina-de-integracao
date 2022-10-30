import React from "react";
import "./styles.scss";
import wave from "../../../assets/shop/wave.png";
import { useNavigate } from "react-router";

const Sidebar = ({selected}) => {
  const navigate = useNavigate();
    return(
      <>
          <div className="sidebar">
            <div>
                <h1 onClick={()=>{navigate("/menu");}}>Menu</h1>
                <div>
                  {selected==="vale"?<h2 className="selected">Vale refeição</h2>:<h2 id="vale">Vale refeição</h2>}
                  {selected==="lanchonete"?<h2 className="selected">Lanchonete</h2>:<h2 onClick={()=>{navigate("/lanchonete");}} id="lanchonete">Lanchonete</h2>}
                  {selected==="avaliações"?<h2 className="selected">Avaliações</h2>:<h2 id="avaliações">Avaliações</h2>}
                </div>
            </div>
            <h2 onClick={()=>{navigate("/");}}>Sair</h2>
          </div>
          <img className="wave" src={wave} alt="" />
      </>
    )
  }
  
  export default Sidebar;