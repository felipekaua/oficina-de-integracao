import React, { useEffect, useState }  from "react";
import { db } from "../../../Firebase/firebase-config";
import { collection, addDoc, getDocs} from "firebase/firestore";
import Navbar from "../../../Components/Navbar";
import { BsArrowRightCircle } from "react-icons/bs";
import "./styles.scss";
import { ToastContainer, toast } from 'react-toastify';

const Reviews = () => {

  const reviewsCollectionRef = collection(db, "reviews");
  const [reviews, setReviews] = useState([]);

  function refreshReviews(){
    const getReviews= async () => {
      const data = await getDocs(reviewsCollectionRef);
      setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getReviews();
  }

    // Executa uma vez

    useEffect(()=>{
      
      refreshReviews();
      
    },[]);

    // Executa sempre que há movimentação

    useEffect(()=>{
      
    });

    function handleReview(){
      const text = document.getElementById("review").value;
      if(text!==""){
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        console.log(date);

        const submit = async()=>{
          await addDoc(collection(db, "reviews"),{
            date: date,
            text: text,
          });
        }
        submit();
        toast.success('Avaliação enviada!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          refreshReviews();
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
        <div className="generalContainerMobileReview">
          <h1>Avaliações</h1>
          <div className="reviewsContainer">
            {reviews.map((review)=>{
              return(
              <>
                <div className="review">
                  <h3>{review.date}</h3>
                  <h3>{review.text}</h3>
                </div>
              </>
              )
            })}
          </div>
          <div className="submit">
            <input id="review" placeholder="Deixe um comentário..."></input>
            <button onClick={handleReview}> <div className="arrow"></div> </button>
          </div>
        </div>
      </div>
      </>
    )
  }
  
  export default Reviews;