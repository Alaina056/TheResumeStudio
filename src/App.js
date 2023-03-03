import Navbar from "./Components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router,Switch,Route, Routes,Navigate } from "react-router-dom";

import { useContext } from "react";
import { themeContext } from "./Context";
import Body from './Components/Body/Body';
import Profile from './Components/Profile/Profile';
import MainPage from './Components/MainPage';
import EditProfile from "./Components/Profile/EditProfile";
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },

  {
    path: "resume",
    element: <Body/>,
  },

  {
    path: "profile",
    element: <Profile/>,
  },
  {
    path: "editprofile",
    element: <EditProfile/>,
  },
  {
    path: "signup",
    element: <Signup/>,
  },
  {
    path: "login",
    element: <Login/>,
  },

]);


function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="App"
    style={{
    background: darkMode ? "black" : "",
    color: darkMode ? "white" : "",
    }}
    >        
        <ToastContainer position="top-center"/>
        <RouterProvider router={router}/>
        

    
    </div>
  );
}

export default App;
