import React from "react";
import {Route,Routes} from 'react-router-dom';
import Navbar from "./components/user/Navbar";
import SignIn from './components/auth/SignIn'
import SignUp from "./components/auth/SignUp";

import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import Home from "./components/Home";
import NotFound from "./components/NotFound";


export default function App(){
  return (
    <>
     <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth/SignIn' element={<SignIn/>} />
      <Route path='/auth/SignUp' element={<SignUp/>} />

      <Route path='/auth/verification' element={<EmailVerification/>} />
      <Route path='/auth/forget-password' element={<ForgetPassword/>} />
      <Route path='/auth/reset-password' element={<ConfirmPassword/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    </>
  )
}
