import React from "react";
import "./styles.scss";
import Navbar from "../../../Components/Navbar";
import { useEffect } from "react";
import { db, auth } from "../../../Firebase/firebase-config";
import { collection, doc, deleteDoc, getDocs, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router";

const LanchoneteCliente = () => {
  
  const navigate = useNavigate();

  const itemCollectionRef = collection(db, "items");
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('bebida');
  const [qtd, setQtd] = useState(0);
  const [id, setId] = useState("")
  const [name, setName] = useState("");
  const [buy, setBuy] = useState([]);
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
    document.getElementById('opt1').classList.add('selected-buy');
    
    
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
    setName("");
    setQtd(0);
    setPrice(0);
  }

  function showModal(){
    document.getElementsByClassName("quantityModal")[0].style.display = 'flex';
    document.getElementsByClassName("quantityContainer")[0].style.display = 'flex';
  }

  function addToCart(){
    if(id!=="" && qtd!==0){
      const submitDeduct = async()=>{
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        var newQtd = Number(data.quantity) - Number(qtd);
        if(newQtd>=0){
          const itemToJson = {
            id: id,
            name: name,
            qtd: qtd,
            price: price
          }
          const arr = [itemToJson];
          setBuy(buy.concat(name+"; "));
          setCart(cart.concat(arr));
          toast.success('Item(s) adicionado(s) no carrinho!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }else{
          toast.error('Não existem unidades suficientes!', {
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
      submitDeduct();
      resetModal();
    }
  }

  function handleBuy(){
    if(cart!==[]){
    const user = auth.currentUser;
    var price=0;
    cart.map(item=>{
      price=price+(Number(item.price)*item.qtd);
    })
    cart.map(item=>{
      const qr = "r-"+user.uid+"-"+item.id;
      const submit = async()=>{
      await addDoc(collection(db, "users", user.uid, "withdrawal"),{
        name: item.name,
        quantity: item.qtd,
        qrcode: qr
      })}
    submit()
    const submitDeduct = async()=>{
      const docRef = doc(db, "items", item.id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      var newQtd = data.quantity - item.qtd;
      if(newQtd<=0){
        await deleteDoc(docRef);
      }else{
        await updateDoc(docRef,{
          quantity: newQtd
        });
      }
      
    }
    submitDeduct();
    
    })
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var dataAtual = dia + '/' + mes + '/' + ano;
    const submit = async()=>{
      await addDoc(collection(db, "users", user.uid, "historic"),{
        price: price,
        buy: buy,
        date: dataAtual
      });
    }
    submit();
    }
    setCart([]);

    navigate("/retirada");
  }

  function handleFilter(parameter){
    switch(parameter){
      case 'bebida':
        setFilter("bebida");
        document.getElementById('opt1').classList.add('selected-buy');
        document.getElementById('opt2').classList.remove('selected-buy');
        document.getElementById('opt3').classList.remove('selected-buy');
        break;
      case 'salgado':
        setFilter("salgado");
        document.getElementById('opt2').classList.add('selected-buy');
        document.getElementById('opt1').classList.remove('selected-buy');
        document.getElementById('opt3').classList.remove('selected-buy');
        break;
      case 'doce':
        setFilter("doce");
        document.getElementById('opt3').classList.add('selected-buy');
        document.getElementById('opt2').classList.remove('selected-buy');
        document.getElementById('opt1').classList.remove('selected-buy');
        break;
      default:
        toast.error('Um erro inesperado ocorreu...', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        break;
    }
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
      <div className="pageContainerMobile">
        <Navbar/>
        <div className="generalContainerMobile-lanchonete">
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
                        <div className="itemContainer">
                          <div className="over">
                            <h4>{item.name}</h4>
                            <h5>R$ {item.price}</h5>
                            <h6>Estoque: {item.quantity}</h6>
                          </div>
                          <div className="buy">
                            <button onClick={()=>{showModal(); setId(item.id); setName(item.name); setPrice(item.price); }}></button>
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
        <div className="modal-open">
          <div className="title-buy">
            <h1> Quantos deseja comprar? </h1>
            <h2>Item selecionado: {name}</h2>
          </div>
          <div className="compra">
              <button className="button-remove" onClick={()=>{if(qtd>0){setQtd(Number(qtd)-1)}}}></button>
              <input type="number" value={qtd} onChange={(e)=>{setQtd(e.target.value)}} />
              <button className="button-add" onClick={()=>{setQtd(Number(qtd)+1)}}></button>
          </div>
          <div className="button-buy">
            <button className="add-item" onClick={addToCart}>Confirmar</button>
          </div>
          
        </div>
      </div>
      </>
    )
  }
  
  export default LanchoneteCliente;