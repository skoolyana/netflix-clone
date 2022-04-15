
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import './PlanScreen.css';
import {loadStripe} from '@stripe/stripe-js';




function PlanScreen() {

    const [products,setProducts] = useState([]);

    const user = useSelector(selectUser);

    const [subscription, setSubscription] = useState(null);


    useEffect( () => {


      const docRef =  collection(db, `customers/${user.uid}/subscriptions`);


//      const custRef = collection(db, "customers");
  //    const docRef =  getDoc(custRef,user.uid);

    //  const subscriptions = collection(docRef,"subscriptions");

      //const queryConst = query(subscriptions);

      onSnapshot(docRef, (snapshot) => {
      
        snapshot.forEach(

          async subscription => {

            setSubscription(
              {
                role: subscription.data().role,
                current_period_end:subscription.data().current_period_end.seconds,
                current_period_start:subscription.data().current_period_start.seconds,
                
              }
            )

          }

        )

      });

    },[user.uid]);

       // Piece of Code which runs based on a Condition
       useEffect(() => {

        const queryConst = query(collection(db, "products"), where("active", "==", true));

        onSnapshot(queryConst, (snapshot) => {
           
          const products = {};
          snapshot.forEach(
            async (productDoc) => {

              
              products[productDoc.id] = productDoc.data();
              

              const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

              priceSnap.docs.forEach((price)=> {
                products[productDoc.id].prices = {
                  priceId: price.id,
                  priceData: price.data(),
                }
              })

            }

          )

          setProducts(products);
        });

      }, []);

    //console.log(products);

    console.log(subscription);

    const loadCheckOut = async (priceId) => {

      console.log(priceId);

      //const docRef = collection(db, "customers");
      //const docSnap = await getDoc(docRef,user.uid);

      //const AdddocRef = await  addDoc(collection(docSnap,"checkout_sessions"), {
        //price: priceId,
        //success_url: window.location.origin,
        //cancel_url: window.location.origin,
      //});

      // https://stackoverflow.com/questions/70104566/implement-stripe-subscription-with-firebase-js-sdk-version-9



      const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      onSnapshot(docRef, async (snapshot) => {
        console.log(snapshot.data());
        const {error, sessionId} = snapshot.data();

        if(error)
        {
          alert(`An error occurred:  ${error.message}`);
        }

        if(sessionId)
        {
          const stripe = await loadStripe("pk_test_51KmmcuA3kyfhb5qTzmTTY1ojOzqpa1wzOPD026Y3dudLLg8uvgtRFPaUygguduQr9j6bIk2eQDP7bz0kUGM2zlVH00uSLPCHGw");

          stripe.redirectToCheckout({
            sessionId
          });
        }

      });
    }
  
  return (
    <div className='planScreen'>

    { subscription && <p> Renewal Date : {
      new Date(subscription?.current_period_end * 1000).toLocaleDateString()
    }
      </p>
    }

      
      {Object.entries(products).map(([productId, productData]) => {

        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

        console.log(isCurrentPackage);
        return (
          <div key={productId} className={`${
            isCurrentPackage && "plansScreen_plan--disabled"
          } plansScreen_plan`}>

          <div className='plansScreen_info'>

          <h5>{productData.name}</h5>

          <h6>{productData.description}</h6>

          </div>

          <button onClick={ () => !isCurrentPackage && loadCheckOut(productData.prices.priceId)}>  
            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
          </button>

          </div>
        
        
        
          );

        
      })}
      
      
      
      
      </div>
  )
}

export default PlanScreen