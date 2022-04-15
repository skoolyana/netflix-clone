import React,{useState,useEffect} from 'react';
import './Nav.css';

import { useNavigate } from "react-router-dom";

function Nav() {

    const history = useNavigate();

    const[show,handleShow] = useState(false); 

    const transitionNavBar = () => {
        if(window.scrollY > 100){
            handleShow(true);
        }
        else {
            handleShow(false);
        }
    }

    useEffect(() => {

        window.addEventListener("scroll",transitionNavBar);
        return () => window.removeEventListener("scroll",transitionNavBar);
        
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>

            <div className='nav_contents'>
           
           <img  onClick={()=> history('/')} className='nav_logo' src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt=''></img>

           <img 
           onClick={()=> history('/profile')}
           
           
           className='nav_avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt=''></img>
           </div>

        </div>
    )
}

export default Nav
