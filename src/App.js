import React, { useEffect } from "react";
import "./App.css";

import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userauth) => {
      if (userauth) {
        // user is logged in

        dispatch(
          login({
            email: userauth.email,
            uid: userauth.uid,

          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  //const user = {
  //name:"Sunny"
  //};

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen></LoginScreen>
        ) : (
          <Routes>
          <Route
              exact
              path="/profile"
              element={
                <>
                  {" "}
                  <ProfileScreen></ProfileScreen>
                </>
              }
            ></Route>



            <Route
              exact
              path="/"
              element={
                <>
                  {" "}
                  <HomeScreen></HomeScreen>
                </>
              }
            ></Route>
            )
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
