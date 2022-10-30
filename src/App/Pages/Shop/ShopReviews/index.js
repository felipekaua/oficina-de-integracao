import React, { useEffect, useState }  from "react";
import { db } from "../../../Firebase/firebase-config";
import { collection, getDocs} from "firebase/firestore";
import Sidebar from "../../../Components/Sidebar";
import "./styles.scss";

const ShopReviews = () => {

  const reviewsCollectionRef = collection(db, "reviews");
  const [reviews, setReviews] = useState([]);

    // Executa uma vez

    useEffect(()=>{
      
      const getReviews= async () => {
        const data = await getDocs(reviewsCollectionRef);
        setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
  
      getReviews();

    },[]);

    // Executa sempre que há movimentação

    useEffect(()=>{
      
    });

    return(
      <>
      <div className="pageContainer">
          <Sidebar selected={"avaliações"}/>
          <div className="menuContainer">
            <h1>Avaliações</h1>
            <h2 className="subtitle">Veja comentários e sugestões</h2>
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
          </div>
        </div>
      </>
    )
  }
  
  export default ShopReviews;