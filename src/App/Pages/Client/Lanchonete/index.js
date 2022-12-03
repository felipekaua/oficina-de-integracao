import React from "react";
import "./styles.scss";
import Navbar from "../../../Components/Navbar";
import { useEffect } from "react";
import { db, auth } from "../../../Firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs, getDoc, setDoc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineShoppingCart } from "react-icons/ai";
const LanchoneteCliente = () => {

  const itemCollectionRef = collection(db, "items");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('bebida');
  const [qtd, setQtd] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);
  const [cartCounter, setCartCounter] = useState(0);
  const [cart, setCart] = useState([]);


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
    document.getElementById('opt1').classList.add('selected');
    
  },[]);

  // Executa sempre que há movimentação

  useEffect(()=>{
    var buffer = 0;
    cart.map((item)=>{
      buffer = buffer + Number(item.qtd);
    })
    setCartCounter(buffer);
  })

  function resetModal(){
    document.getElementsByClassName("quantityModal")[0].style.display = 'none';
    document.getElementsByClassName("quantityContainer")[0].style.display = 'none';
    setId("");
    setQtd(0);
    setPrice(0);
  }

  function showModal(){
    document.getElementsByClassName("quantityModal")[0].style.display = 'flex';
    document.getElementsByClassName("quantityContainer")[0].style.display = 'flex';
    console.log(cart);
  }

  function addToCart(){
    if(id!=="" && qtd!=0){
      const itemToJson = {
        id: id,
        qtd: qtd,
        price: price
      }
      const arr = [itemToJson];
      setCart(cart.concat(arr));
    }
    resetModal();
  }

  function handleBuy(){
    if(cart!=[]){
    const user = auth.currentUser;
    var price=0;
    cart.map(item=>{
      price=price+(Number(item.price)*item.qtd);
    })
    cart.map(item=>{
      const submit = async()=>{
      await addDoc(collection(db, "users", user.uid, "withdrawal"),{
        itemId: item.id,
        quantity: item.qtd
      });
    }
    submit();
    })
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var dataAtual = dia + '/' + mes + '/' + ano;
    const submit = async()=>{
      await addDoc(collection(db, "users", user.uid, "historic"),{
        price: price,
        date: dataAtual
      });
    }
    submit();
    }
    setCart([]);
  }

  function handleFilter(parameter){
    switch(parameter){
      case 'bebida':
        setFilter("bebida");
        document.getElementById('opt1').classList.add('selected');
        document.getElementById('opt2').classList.remove('selected');
        document.getElementById('opt3').classList.remove('selected');
        break;
      case 'salgado':
        setFilter("salgado");
        document.getElementById('opt2').classList.add('selected');
        document.getElementById('opt1').classList.remove('selected');
        document.getElementById('opt3').classList.remove('selected');
        break;
      case 'doce':
        setFilter("doce");
        document.getElementById('opt3').classList.add('selected');
        document.getElementById('opt2').classList.remove('selected');
        document.getElementById('opt1').classList.remove('selected');
        break;
    }
  }

    return(
      <>
      <div className="pageContainerMobile">
        <Navbar/>
        <div className="generalContainerMobile">
            <div className="filterContainer">
              <h1>Lanchonete</h1>
              <div>
                <h2 id="opt1" onClick={()=>{handleFilter('bebida')}}>Bebidas</h2>
                <h2 id="opt2" onClick={()=>{handleFilter('salgado')}}>Salgados</h2>
                <h2 id="opt3" onClick={()=>{handleFilter('doce')}}>Doces</h2>
              </div>
            </div>
            <div className="itemListing">
              {items.filter(item => 
                  item.type === filter
                  ).map((item)=>{
                    return(
                      <>
                        <div onClick={()=>{showModal(); setId(item.id); setPrice(item.price); setSelectedItem(item.name)}} className="itemContainer">
                          <div>
                            <h4>{item.name}</h4>
                            <h5>R$ {item.price}</h5>
                          </div>
                        </div>
                      </> 
                    )
                  })}
            </div>
            <div className="checkoutContainer">
              <div className="cartCounter">
                  <AiOutlineShoppingCart/>
                  <h6>{cartCounter}</h6>
              </div>
              <button onClick={handleBuy}>Finalizar</button>
            </div>
        </div>
      </div>
      <div onClick={resetModal} className="quantityModal"></div>
      <div className="quantityContainer">
        <h2> Você selecionou: {selectedItem}</h2>
        <h2>Quantas unidades você deseja?</h2>
        <div>
          <button onClick={()=>{if(qtd>0){setQtd(Number(qtd)-1)}}}>-</button>
          <input type="number" value={qtd} onChange={(e)=>{setQtd(e.target.value)}} />
          <button onClick={()=>{setQtd(Number(qtd)+1)}}>+</button>
        </div>
        <button onClick={addToCart}>Confirmar</button>
      </div>
      </>
    )
  }
  
  export default LanchoneteCliente;