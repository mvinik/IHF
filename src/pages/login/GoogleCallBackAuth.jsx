import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
// import {  } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;
const GoogleCallBackAuth = () => {

    // const [auth, setAuth] = useState()
  const [jwt, setJwt] = useState()
  const location = useLocation()
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!location) {
      return
    }
    },[location] )
    
    const { search } = location
  const Auth = async() =>{
    const response = await axios.get(`${API_URL}/api/auth/google/callback?${search}`)
    return response.data;
  }
  const {data:auth} = useQuery("Auth", Auth);
    // console.log(JSON.stringify(auth),'auth')
    localStorage.setItem('User',auth)
    const jwtToken = auth?.jwt
    localStorage.setItem('UserId',auth?.user.id)
    localStorage.setItem('EmailId',auth?.user.email)
    localStorage.setItem('JwtToken',jwtToken)
    console.log(jwtToken,'token');
    
    const redirectUrl = localStorage.getItem('redirectToCart');

    if(redirectUrl){
      setTimeout(() => {
        navigate(redirectUrl)
      },2000)
    }
    else{
      // setTimeout(() => {
        localStorage.setItem('redirectToHome','/')
        navigate('/');
      // },1000)
    }



  return (
    <div>GoogleCallBackAuth</div>
  )
}

export default GoogleCallBackAuth