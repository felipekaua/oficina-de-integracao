import React from "react";
import "./styles.scss";
import Sidebar from "../../../Components/Sidebar";
import { useEffect } from "react";
import { db } from "../../../Firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs, setDoc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

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
      const back0 = document.getElementById("back0");
      const back1 = document.getElementById("back1");
      const back2 = document.getElementById("back2");
      
      if(turnOn){
        page.classList.add("fade");
        modalC.style.display = "flex";
        buttonC.style.display = "none";
        back0.style.zIndex = -1;
        back1.style.zIndex = -1;
        back2.style.zIndex = -1;
        
      }else{
        page.classList.remove("fade");
        modalC.style.display = "none";
        buttonC.style.display = "flex";
        back0.style.zIndex = 0;
        back1.style.zIndex = 0;
        back2.style.zIndex = 0;
        
      }
    }
    function handleEditModal(turnOn, item){
      const page = document.getElementsByClassName("pageContainer")[0];
      const modalC = document.getElementsByClassName("editItemModal")[0];
      const buttonC = document.getElementById("addItem");
      const back0 = document.getElementById("back0");
      const back1 = document.getElementById("back1");
      const back2 = document.getElementById("back2");

      if(turnOn){
        page.classList.add("fade");
        modalC.style.display = "flex";
        buttonC.style.display = "none";
        back0.style.zIndex = -1;
        back1.style.zIndex = -1;
        back2.style.zIndex = -1;

        document.getElementById("nameEdit").value=item.name;
        document.getElementById("priceEdit").value=item.price;
        document.getElementById("quantityEdit").value=item.quantity;

        setItemId(item.id);
        setType(item.type);
      }else{
        page.classList.remove("fade");
        modalC.style.display = "none";
        buttonC.style.display = "flex";
        back0.style.zIndex = 0;
        back1.style.zIndex = 0;
        back2.style.zIndex = 0;

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
            <div className="editItems">
              <h2>Adicione ou edite o estoque da lanchonete </h2>
              <button id="addItem" onClick={()=>{handleModal(true)}}></button>
            </div>
            

            <div className="shopSheet">
              <div className="subtitle">
                <h2>Bebidas</h2>
                <h2>Salgados</h2>
                <h2>Doces</h2>
              </div>
              <div className="listing">
                <div className="itemList" id="back0">
                  {items.filter(item => 
                  item.type == "bebida"
                  ).map((item)=>{
                    return(
                      <>
                        <div className="itemContainer">
                          <div>
                            <div className="iconDrink"></div>
                            <div className="over">
                              <h4>{item.name}</h4>
                              <h5>R$ {item.price}</h5>
                            </div>
                          </div>
                          <div>
                            <h4 className="qtd">{item.quantity}</h4>
                            <div class="pencil" onClick={()=>{handleEditModal(true, item)}}></div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
                <div className="itemList" id="back1">
                  {items.filter(item => 
                  item.type === "salgado"
                  ).map((item)=>{
                    return(
                      <>
                        <div className="itemContainer">
                          <div>
                            <div className="iconFood"></div>
                            <div className="over">
                              <h4>{item.name}</h4>
                              <h5>R$ {item.price}</h5>
                            </div>
                          </div>
                          <div>
                            <h4 className="qtd">{item.quantity}</h4>
                            <div class="pencil" onClick={()=>{handleEditModal(true, item)}}></div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
                <div className="itemList" id="back2">
                  {items.filter(item => 
                  item.type == "doce"
                  ).map((item)=>{
                    return(
                      <>
                        <div className="itemContainer">
                          <div>
                            <div className="iconCandy"></div>
                            <div className="over">
                              <h4>{item.name}</h4>
                              <h5>R$ {item.price}</h5>
                            </div>
                          </div>
                          <div>
                            <h4 className="qtd">{item.quantity}</h4>
                            <div class="pencil" onClick={()=>{handleEditModal(true, item)}}></div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="newItemModal">
          <div className="header">
            <h2>Novo item</h2>
            <div onClick={()=>{handleModal(false)}} className="close"></div>
           
          </div>
          <div className="body">
            
            <input id="name" type="text" placeholder="Nome"/>
            <input id="price" type="number" placeholder="Preço" />
            <input id="quantity" type="number" placeholder="Quantidade" />
           
            <select id="type">
              <option value="bebida">Bebida</option>
              <option value="salgado">Salgado</option>
              <option value="doce">Doce</option>
            </select>
          </div>
          <div className="footer">
            <button className="red" onClick={()=>{handleModal(false); resetModal();}}>Cancelar</button>
            <button className="green" onClick={()=>{handleNewItem(); resetModal();}}>Salvar</button>
          </div>
        </div>
        <div className="editItemModal">
          <div className="header">
            <h2>Editando Item</h2>
            <div class="btHeader">
              <div onClick={handleDelete} className="trashcan"></div>
              <div onClick={()=>{handleEditModal(false,[])}} className="close"></div>
            </div>
            
          </div>
          <div className="body">
            <input id="nameEdit" type="text" placeholder="Nome" />
            <input id="priceEdit" type="number" placeholder="Preço"/>
            <input id="quantityEdit" type="number" placeholder="Quantidade"/>
          </div>
          <div className="footer">
        
              
              <button className="red" onClick={()=>{handleEditModal(false,[]); resetEditModal();}}>Cancelar</button>
    
            <button className="green" onClick={()=>{handleEditItem(); resetEditModal();}}>Salvar</button>
          </div>
        </div>
        
      </>
    )
  }
  
  export default Lanchonete;