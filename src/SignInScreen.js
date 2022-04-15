import React, { useRef } from "react";
import "./SignInScreen.css";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        const dbuser = userCredential.user;

        console.log("dbuser in register");

        console.log(dbuser); 
      })
      .catch((error) => alert(error));

    
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailRef.current.value,
        passwordRef.current.value).then((userCredential)=> {

        const loginuser = userCredential.user;
  
        console.log("user12");
        console.log(loginuser);     
  
      }).catch(error => alert(error));
  };

  return (
    <div className="signinScreen">
      <form>
        <h1>SignIn</h1>
        <input ref={emailRef} placeholder="Email" type="Email"></input>
        <input ref={passwordRef} placeholder="Password" type="password"></input>
        <button type="submit" onClick={signIn}>
          {" "}
          Sign In
        </button>

        <h4>
          <span className="signinScreen_grey">New to Netflix? </span>
          <span className="signinScreen_link" onClick={register}>
            {" "}
            Signup now.
          </span>{" "}
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
