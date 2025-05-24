import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import './style.component.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/LanguageContext";
const API_URL = process.env.REACT_APP_API_URL;



const Slider = () => {

  const {locale} = useContext(LanguageContext)
const navigate = useNavigate();
const {t}=useTranslation('slider')
const [imgLoading,setImgLoading] = useState(true);

const fetchSliders = async ()=>{
  const {data}=await axios.get(
    `${API_URL}/api/sliders?locale=${locale}&populate=*`
  );
  return data.data;
}

const {data:slider=[],isLoading,error}=useQuery(
  ["sliders",locale],
  fetchSliders,{
    keepPreviousData:true,
  }
)
    
// const HomeSlider = async() => {
//         const response = await axios.get(`${API_URL}/api/sliders?populate=*`);
//         return response.data.data;
//       }
//       const {data:slider,isLoading,error} = useQuery('Slider',HomeSlider);
//       // if (isLoading) return <SkeletonAvatar active shape="square" size={30}/>
//       if (error) return <div>An error occurred: {error.message}</div>;


  return (
    <Swiper 
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper"
    >
{slider && slider.map((slide)=>(
    <SwiperSlide key={slide.id}>
        <div className="slide-content">
          <img src={`${API_URL}${slide.attributes.Image.data.attributes.url}`} className="kenburns-bottom bg-gradient-to-t from-blue" alt="Slider Image 1" />
          <div className="overlays">
          <div className="overlays-content">
            <h2 className="flicker-1">{slide.attributes.Title}<span className="text-lg text-white mt-1 mq450:hidden">(Educational Director)</span></h2>
            <p>{slide.attributes.Description}</p>
            <button className="btn bottom-4" onClick={()=>{navigate(`${slide.attributes.ButtonHref}`)}} >{slide.attributes.ButtonLabel}</button>
            <div class="iconSlider ">
            <a href=''> <i class="fa fa-facebook"></i></a>
            <a href=''> <i class="fa fa-instagram"></i></a>
            <a href=''> <i class="fa-brands fa-youtube"></i></a>
            {/* <a href=''> <i class="fa-brands fa-x-twitter"></i></a>
            <a href=''> <i class="fa fa-linkedin"></i></a> */}
            </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
))}
  </Swiper>
  )
}

export default Slider