import React from 'react'
import './login.css'
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
const API_URL = process.env.REACT_APP_API_URL;
const Login = () => {
  const { t } =useTranslation('navbar')
  return (
    <Container className=''>
    <div style={{top: 0,left: 0,width: "100%",height: "100%",position: "absolute",zIndex: -1,backgroundColor: "rgba(0, 0, 0, 0.6)"}}></div>
    <CTA>
      <CTALogoOne src="https://api.ihfbyjavedkhan.com/uploads/ihf_logo_590d48d82a.png" alt="" />
      {/* <h1 className='text-[60px] text-white items-center justify-center m-0 p-0'>IHF by Javed khan</h1> */}
      <SignUp  onClick={() =>
        (window.location =`${API_URL}/api/connect/google`)}>{t('LOGIN')}</SignUp>
      <Description>
     {t('From training thousands of hair designers on his ingenious techniques to transforming the looks and unleashing incredible beauty in the exclusive clients that travel far and wide to see him, Mounir is the creative originator spreading his innovative methods and products around the globe.')}
      </Description>
    </CTA>
  </Container>
  )
}

export default Login;


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
const CTA = styled.div`
  max-width: 650px;
  width: 90%;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.8);
  backdrop-filter: saturate(180%) blur(10px);
`;

const CTALogoOne = styled.img`
height:150px;
display-flex;
align-items: center;
justify-content: center;
`;

const SignUp = styled.a`
  cursor: pointer;
  width: 50%;
  background-color: #17191c;
  font-weight: bold;
  padding: 10px 0;
  color: #C5C6C7;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
  transition: all 250ms;
  letter-spacing: 1.5px;
  margin-top: 8px;
  margin-bottom: 12px;
  &:hover {
    background: #C5C6C7;
    color: #0B0C10;
  }
  @media(max-width:756px){
    padding 8px 0;
  }
`;

const Description = styled.p`
  letter-spacing: 1.5px;
  font-size: 11px;
  text-align: center;
  line-height: 1.5;
  color:#C5C6C7;
`;

const CTALogoTwo = styled.img`
  width: 90%;
  padding-left: 30px;
`