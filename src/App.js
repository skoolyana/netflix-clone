import React from 'react';
import './App.css';

import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';


function App() {

  //const user = {
    //name:"Sunny"
  //};

  const user = null;

  return (
    <div className="app">
        <Router>  
        {
        
        !user ?  (
          <LoginScreen></LoginScreen>
        ) : ( 
        
        <Routes>
        <Route exact path="/" 
          element={<> <HomeScreen></HomeScreen></>}>
        </Route>
        )       
        </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
