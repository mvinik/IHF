// NavBar.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './style.component.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ConfigProvider, Drawer } from 'antd';
import { useQuery } from 'react-query';
import { SlHandbag } from "react-icons/sl";
import { SiLanguagetool } from 'react-icons/si';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageContext';


const API_URL = process.env.REACT_APP_API_URL;




const NavBar = () => {
  const [Token,setToken] = useState (localStorage.getItem("JwtToken"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
const {locale} = useContext(LanguageContext)
  const { t, i18n } = useTranslation('navbar');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Home = (e) => {
    navigate(`${e}`)
  }

  const login = () => {
    navigate('/login')
  }

  const Signout = () => {
    localStorage.removeItem("JwtToken");
    localStorage.removeItem("UserId");
    localStorage.removeItem("User");
    localStorage.removeItem("EmailId");
    setTimeout(()=>{
      navigate("/", { replace: true });
    },1000)
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  useEffect(()=>{

  },[Token])

  // const Global = async() => {
  //   const response = await axios.get(`${API_URL}/api/global?locale=${locale}&populate[navigation][populate]=*`);
  //   return response.data.data.attributes.navigation.Links;
  // }
  // const {data:navLinks} = useQuery('Nav', Global);

// Declare this BEFORE useQuery
const fetchGlobalNav = async () => {
  const response = await axios.get(`${API_URL}/api/global?locale=${locale}&populate[navigation][populate]=*`);
  return response.data.data.attributes.navigation.Links;
};

// Now useQuery will refetch when locale changes
const { data: navLinks, isLoading, error } = useQuery(['Nav', locale], fetchGlobalNav);





  return (
    <>
   
    <nav className="  flex z-10 items-center justify-between mq450:justify-between py-1 mq1825:px-10 box-border mq450:px-5 text-center text-4xl text-darkslategray-200 font-cormorant-garamond text-lg bg-[#053576]">
    <div className="flex  items-center justify-start gap-8 max-w-full">
      <img className='h-16 py-2 w-auto' src='https://api.ihfbyjavedkhan.com/uploads/ihf_logo_590d48d82a.png'/>
    </div>

  <div className="menu menu-5 mq925:hidden flex items-center justify-center gap-8">
      {navLinks && navLinks.map((nav) => (
        <ul key={nav.id} className="relative shrink-0 hover:text-#44444C text-yellow ">
          <li>
          <a  onClick={() => { navigate(`${nav.href}`) }}>
            {nav.label}
          </a>
       
          </li> 
      
         
        </ul>
     
      ))}
          <LanguageToggle/>
           
    </div>

    {/* <div className="menu menu-5 mq925:hidden flex items-center justify-center gap-8">
    
        <ul className="relative flex gap-2 shrink-0 hover:text-#44444C text-yellow ">
  <li><a href="/">{t('home')}</a></li>
  <li><a href="/onlineCourse">{t('onlineCourses')}</a></li>
  <li><a href="/masterclass">{t('masterclass')}</a></li>
  <li><a href="/gallery">{t('gallery')}</a></li>
  <li><a href="/contact">{t('contact')}</a></li>
</ul>

  
            <LanguageToggle/>
    </div> */}


    <div className="mq925:hidden flex items-center justify-center gap-7">

    <div className='hover:cursor-pointer' onClick={()=>navigate('/checkout')}>
    <SlHandbag className='text-yellow text-3xl' />
        </div>

        <div>
        {!!Token ? (
  <button className='btn' onClick={Signout}>{t('logout')}</button>
) : (
  <button className='btn' onClick={login}>{t('login')}</button>
)}

        </div>


    </div>

    <div className="flex gap-5 items-center justify-end mq1825:hidden mq1250:hidden mq1826:hidden mq925:flex ">

    <div className='hover:cursor-pointer' onClick={()=>navigate('/checkout')}>
    <SlHandbag className='text-yellow text-5xl' />
        </div>

      {/* <button onClick={showDrawer} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={drawerVisible ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button> */}
            <div>
      {!!Token ?(
        <button className='btn' onClick={Signout}>Logout</button>
        ):(
          <button className='btn' onClick={login}>Login</button>
      )
    }
        </div>
    </div>


{/* <ConfigProvider 
   theme={{
    token:{
      colorPrimary: '#17191c',
      colorText: '#C5C6C7',
      colorIcon: '#C5C6C7',
    },
    components: {
      Drawer:{
        colorBgElevated:'#17191c',
        colorBgMask:'#000000',
        colorText:'#C5C6C7',
        colorIcon:'#000000',
        colorTextDescription:'#000000',
        colorTextActive:'#C5C6C7',
        colorBgTextHover:'#000000',

      }
    },
  }}>

    <Drawer
      placement="right"
      closable={false}
      width='250px'
      onClose={onClose}
      open={drawerVisible}
      className="text-white md:hidden  bg-gray1"
    >
          <div className="flex  items-center justify-start gap-8 max-w-full">
      <img className='h-16 py-4 w-auto' src='https://api.ihfbyjavedkhan.com/uploads/ihf_logo_590d48d82a.png'/>
    </div>
      {navLinks && navLinks.map((nav) => (
        <div key={nav.id} className="relative mb-3">
          <a className='text-white' onClick={() => { navigate(`${nav.href}`) }}>
            {nav.label}
          </a>
        </div>
      ))}
        
        <div>
      {!!Token ?(
        <button className='btn' onClick={Signout}>Logout</button>
        ):(
        <button className='btn' onClick={login}>Login</button>
      )
    }
        </div>
    </Drawer>
    </ConfigProvider> */}
  </nav>
  <div className="mq925:flex flex-wrap  mq1250:hidden mq1825:hidden mq1826:hidden  bg-blue">
      {navLinks && navLinks.map((nav) => (
        <ul key={nav.id} className=" my-1  list-none text-yellow ">
          <li>
          <a onClick={() => { navigate(`${nav.href}`) }}>
            {nav.label}
          </a>
          </li>
        </ul>
      ))}
           <LanguageToggle/>
    </div> 

    {/* <div className="mq925:flex flex-wrap  mq1250:hidden mq1825:hidden mq1826:hidden  bg-blue">
    
        <ul  className="my-1  list-none text-yellow ">
            <li><a href="/">{t('home')}</a></li>
  <li><a href="/onlineCourse">{t('onlineCourses')}</a></li>
  <li><a href="/masterclass">{t('masterclass')}</a></li>
  <li><a href="/gallery">{t('gallery')}</a></li>
  <li><a href="/contact">{t('contact')}</a></li>
        </ul>
    
        <LanguageToggle/>
    </div> */}
  </>
  );
}

export default NavBar;
