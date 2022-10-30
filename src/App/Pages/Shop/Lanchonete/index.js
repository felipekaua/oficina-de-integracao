import React from "react";
import "./styles.scss";
import Sidebar from "../../../Components/Sidebar";
import { useEffect } from "react";
import { db } from "../../../Firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BsCup, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { TbCandy } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Lanchonete = () => {

  const itemCollectionRef = collection(db, "items");
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [type, setType] = useState("");

    // Executa uma vez

    function refreshItems(){
      const getItems= async () => {
        const data = await getDocs(itemCollectionRef);
        setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      getItems();
    }

    useEffect(()=>{

      refreshItems();
      
    },[]);

    // Executa sempre que há movimentação

    useEffect(()=>{
      
      
    })

    function handleModal(turnOn){
      const page = document.getElementsByClassName("pageContainer")[0];
      const modalC = document.getElementsByClassName("newItemModal")[0];
      const buttonC = document.getElementById("addItem");
      if(turnOn){
        page.classList.add("fade");
        modalC.style.display = "flex";
        buttonC.style.display = "none";
      }else{
        page.classList.remove("fade");
        modalC.style.display = "none";
        buttonC.style.display = "flex";
      }
    }
    function handleEditModal(turnOn, item){
      const page = document.getElementsByClassName("pageContainer")[0];
      const modalC = document.getElementsByClassName("editItemModal")[0];
      const buttonC = document.getElementById("addItem");

      if(turnOn){
        page.classList.add("fade");
        modalC.style.display = "flex";
        buttonC.style.display = "none";

        document.getElementById("nameEdit").value=item.name;
        document.getElementById("priceEdit").value=item.price;
        document.getElementById("quantityEdit").value=item.quantity;

        setItemId(item.id);
        setType(item.type);
      }else{
        page.classList.remove("fade");
        modalC.style.display = "none";
        buttonC.style.display = "flex";

        resetEditModal();
      }
    }

    function resetModal(){
      document.getElementById("name").value="";
      document.getElementById("price").value="";
      document.getElementById("quantity").value="";
      document.getElementById("type").value="bebida";
    }
    function resetEditModal(){
      document.getElementById("name").value="";
      document.getElementById("price").value="";
      document.getElementById("quantity").value="";
      setItemId("");
      setType("");
    }

    function handleNewItem(){

      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const quantity = document.getElementById("quantity").value;
      const type = document.getElementById("type").value;

      if(name!=="" && price!=="" && quantity!=="" && type !==""){
      const submit = async()=>{
        await addDoc(collection(db, "items"),{
          name: name,
          price: Number(price),
          quantity: Number(quantity),
          type: type,
        });
      }
      submit();

      toast.success('Item adicionado com sucesso!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        refreshItems();
        handleModal(false);
      }else{
        toast.error('Há campos vazios!', {
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
    }
    function handleEditItem(){
      if(itemId!==""){
        const name = document.getElementById("nameEdit").value;
        const price = document.getElementById("priceEdit").value;
        const quantity = document.getElementById("quantityEdit").value;

        const docRef = doc(db, "items", itemId);
        
        const submit = async()=>{
          
          await setDoc((docRef),{
            name: name,
            price: Number(price),
            quantity: Number(quantity),
            type: type,
          });
        }
        submit();

        toast.success('Item atualizado com sucesso!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          refreshItems();
        }else{
          toast.error('Algo errado aconteceu :(', {
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
      handleEditModal(false,[]);
    }

    function handleDelete(){
      const itemDoc = doc(db, "items", itemId);
      const deleteI = async () => {
        await deleteDoc(itemDoc);
      }
      deleteI();
      toast.success('Item deletado com sucesso!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        refreshItems();
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
          <Sidebar selected="lanchonete"/>
          <div className="shopContainer">
            <h1>Lanchonete</h1>
            <h2>Edite o estoque da lanchonete</h2>
            <div className="shopSheet">
              <div className="subtitle">
                <h2>Bebidas</h2>
                <h2>Salgados</h2>
                <h2>Doces</h2>
              </div>
              <div className="listing">
                <div className="itemList">
                  {items.filter(item => 
                  item.type == "bebida"
                  ).map((item)=>{
                    return(
                      <>
                        <div className="itemContainer">
                          <div>
                            <BsCup/>
                            <div className="over">
                              <h4>{item.name}</h4>
                              <h5>R$ {item.price}</h5>
                            </div>
                          </div>
                          <div>
                            <h4>{item.quantity}</h4>
                            <BsFillPencilFill onClick={()=>{handleEditModal(true, item)}}/>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
                <div className="itemList">
                  {items.filter(item => 
                  item.type === "salgado"
                  ).map((item)=>{
                    return(
                      <>
                        <div className="itemContainer">
                          <div>
                            <FaHamburger />
                            <div className="over">
                              <h4>{item.name}</h4>
                              <h5>R$ {item.price}</h5>
                            </div>
                          </div>
                          <div>
                            <h4>{item.quantity}</h4>
                            <BsFillPencilFill onClick={()=>{handleEditModal(true, item)}}/>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
                <div className="itemList">
                  {items.filter(item => 
                  item.type == "doce"
                  ).map((item)=>{
                    return(
                      <>
                        <div className="itemContainer">
                          <div>
                            <TbCandy/>
                            <div className="over">
                              <h4>{item.name}</h4>
                              <h5>R$ {item.price}</h5>
                            </div>
                          </div>
                          <div>
                            <h4>{item.quantity}</h4>
                            <BsFillPencilFill onClick={()=>{handleEditModal(true, item)}}/>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
            <button id="addItem" onClick={()=>{handleModal(true)}}>Adicionar novo item</button>
          </div>
        </div>
        <div className="newItemModal">
          <div className="header">
            <h2>Adicionando Item</h2>
            <AiOutlineCloseCircle onClick={()=>{handleModal(false)}}/>
          </div>
          <div className="body">
            <h3>Nome</h3>
            <input id="name" type="text" />
            <h3>Preço</h3>
            <input id="price" type="number" />
            <h3>Quantidade</h3>
            <input id="quantity" type="number" />
            <h3>Tipo</h3>
            <select name="" id="type">
              <option value="bebida">Bebida</option>
              <option value="salgado">Salgado</option>
              <option value="doce">Doce</option>
            </select>
          </div>
          <div className="footer">
            <button className="red" onClick={()=>{handleModal(false); resetModal();}}>Descartar</button>
            <button className="green" onClick={()=>{handleNewItem(); resetModal();}}>Salvar</button>
          </div>
        </div>
        <div className="editItemModal">
          <div className="header">
            <h2>Editando Item</h2>
            <AiOutlineCloseCircle onClick={()=>{handleEditModal(false,[])}}/>
          </div>
          <div className="body">
            <h3>Nome</h3>
            <input id="nameEdit" type="text" />
            <h3>Preço</h3>
            <input id="priceEdit" type="number" />
            <h3>Quantidade</h3>
            <input id="quantityEdit" type="number" />
          </div>
          <div className="footer">
            <div>
              <BsFillTrashFill onClick={handleDelete} className="trashcan"/>
              <button className="red" onClick={()=>{handleEditModal(false,[]); resetEditModal();}}>Descartar</button>
            </div>
            <button className="green" onClick={()=>{handleEditItem(); resetEditModal();}}>Salvar</button>
          </div>
        </div>
        
      </>
    )
  }
  
  export default Lanchonete;