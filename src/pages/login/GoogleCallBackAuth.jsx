import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
    // <div>GoogleCallBackAuth</div>
    <Container></Container>
  )
}

export default GoogleCallBackAuth

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh );
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-color:transparent; 
    background-image: url("https://api.ihfbyjavedkhan.com/uploads/DSC_6591_c29ce19f4d.JPG");

    @media (max-width:756px) {
      background-image: url("https://api.ihfbyjavedkhan.com/uploads/DSC_6591_c29ce19f4d.JPG");
    }
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    
  }
`;