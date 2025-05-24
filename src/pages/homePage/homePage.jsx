import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import DivetPbBlurbContent from './DivetPbBlurbContent'
import './homePage.css'
import Slider from '../../components/Slider'
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../context/LanguageContext'
import { useRef } from 'react';
const API_URL = process.env.REACT_APP_API_URL;



const HomePage = () => {

  const {locale}=useContext(LanguageContext)
  const navigate = useNavigate();
  const [cards , setCards] = useState([]);
  const [about , setAbout] = useState([]);
  const [benifits, setBenifits] = useState([]);
  const [benifitsImage, setBenifitsImage] = useState([]);
  const [description, setDescription] = useState([]);
  const [AbtDesc, setAbtDesc] = useState([]);
  const [abtCard, setAbtCard] = useState([]);
  const [abtImage, setAbtImage] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation('home');

var isValid = cards && about && benifits && description && AbtDesc && abtCard;
// console.log(isValid);

const Home = async() => {
  try{
    try{
      const response = await axios.get(`${API_URL}/api/pages/1?populate[0]=BenefitsOfIHF&populate[1]=BenefitsOfIHF.Image`);
      setBenifits(response.data.data.attributes.BenefitsOfIHF);
      setBenifitsImage(response.data.data.attributes.BenefitsOfIHF.Image.data.attributes.url);
      setDescription(response.data.data.attributes.BenefitsOfIHF.Description[0].children);
      // console.log(benifits,'benifits');
    }catch(e){
      console.error(e);
    }
    try{
      const response = await axios.get(`${API_URL}/api/pages?filters[Title][$eq]=homepage&locale=${locale}&populate[cards][populate]=*`);
      setCards(response.data.data[0].attributes.cards);
   //console.log(response.data,'Home');
    }catch(e){
      console.error(e);
    }

//     try{
//       const response = await axios.get(`${API_URL}/api/pages?filters[Title][$eq]=homepage&locale=${locale}&populate[blocks][populate]=*`);
//       const blockss=response.data.data[0].attributes.blocks

//         // Filter only shared.small-card components
//   const smallCards = blockss.reduce((acc, block) => {
//   if (block.__component === "shared.small-card") {
//     acc.push(block);
//   }
//   return acc;
// }, []);

// setAbtCard(smallCards);

//       setLoading(false);
//       setAbout(response.data.data.attributes.blocks[2]);
//       // setAbtCard(response.data.data[0].attributes.blocks);
//       setAbtImage(response.data.data.attributes.blocks[2].Image.data.attributes.url);
//       console.log(abtImage,'abtImage');
//       // setAbtCard(abtCard.slice(-3));
//       setAbtDesc(response.data.data.attributes.blocks[2].Description[0].children);
//       // console.log(abtCard,'Blocks');
//     }catch(e){
//       console.error(e);
//     }

try {
  const response = await axios.get(`${API_URL}/api/pages?filters[Title][$eq]=homepage&locale=${locale}&populate[blocks][populate]=*`);
  const blocks = response.data.data?.[0]?.attributes?.blocks || [];

  // Filter shared.small-card components
  const smallCards = blocks.filter(block => block.__component === "shared.small-card");
  setAbtCard(smallCards);

  // Find about-us block safely
  const aboutBlock = blocks.find(block => block.__component === "blocks.about-us");

  if (aboutBlock) {
    setAbout(aboutBlock);

    // Safely get image and description
    const imageUrl = aboutBlock.Image?.data?.attributes?.url || '';
    setAbtImage(imageUrl);

    const desc = aboutBlock.Description?.[0]?.children || [];
    setAbtDesc(desc);
  } else {
    console.warn("No 'blocks.about-us' component found.");
  }

  setLoading(false);
} catch (e) {
  console.error(e);
}

  }catch(err){
  }
}

useEffect(() => {
  Home();
}, [locale]);

  return (
    <>
      {loading?(
        <div className="loader">Loading
  <span></span>
</div>
      ):(
        <div className="overflow-x-hidden bg-liteBlue">
      <NavBar/>
    <Slider/> 
    <div className="self-stretch  flex flex-col items-center justify-start py-5  px-5  box-border gap-[1px] max-w-full z-[1] text-smi text-gray1">
           <div className="w-[751.1px] relative font-bold  flex items-center justify-center max-w-full shrink-0">
{t("Online Learning at IHF by Javed Khan for Hairdressers Empowering Your Salon Career with Affordable, Flexible Learning in Hindi")}  
</div>
         </div>
       <main className="frame-parent my-10 mq450:mx-4 mq925:mx-9 mq1825:px-[100px] mq1250:px-2 mq925:px-2 mq450:px-0">
       <section className="self-stretch flex flex-col mq925:px-0 items-center justify-center  pb-10 box-border max-w-full">
       {/* <div className=" flex flex-col items-center justify-center  box-border  max-w-full shrink-0 text-left text-6xl text-[#C5C6C7]  mq925:gap-[20px] mq925:pt-[42px] mq925:px-[25px] mq925:pb-[25px] mq925:box-border mq1350:pt-[65px] mq1350:px-[210px] mq1350:pb-[39px] mq1350:box-border"> */}
         <div className=" flex flex-row items-center  justify-evenly  mb-10 mq925:mb-0  mq925:px-2 mq925:flex mq925:flex-col  gap-11 max-w-full  ">
           <img
             className="h- flex-1  relative max-w-full bg-gradient-to-t from-black rounded-xl shadow-xl  drop-shadow-2xl overflow-hidden object-cover min-w-[400px] mq925:min-w-[300px]  "
             alt=""
             src={`${API_URL}${abtImage}`}
           />
           {/* <div className=" flex flex-col items-start justify-start gap-[15px] min-w-[498.7px] max-w-full  "> */}
             <div className="flex flex-col items-start gap-5 justify-start ">
               <h1 className="m-0 relative mq925:ml-0 uppercase  font-bold   mq450:text-xl">
                 {/* {about.Title} */}
                 {t('about us')}
               </h1>
   
               <div className=" flex flex-col text-justify gap-3 text-xl ">
                {/* {AbtDesc.map((abt)=>( */}
                   {/* ↦ {abt.children[0].text} */}
                {/* ))}  */}
                 <div className="relative list-none ">
                   <div className="">
                 {t("Welcome to IHF, the ultimate platform for online learning designed specifically for hairdressers by the renowned educator Javed Khan. Our mission is to make learning hairdressing accessible and affordable for everyone, especially for those who cannot afford to spend a lot on education. Whether you are an aspiring hairdresser looking to start your career or a seasoned stylist seeking to upgrade your skills, our courses are designed with you in mind.")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Our Mission:")}</span> {t("At IHF, we understand the financial and time constraints faced by many aspiring and professional hairdressers. Our mission is to provide high-quality, affordable education that fits into your busy schedule. We aim to empower hairdressers with the knowledge and skills they need to excel in their careers without breaking the bank.")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Courses Tailored for Hairdressers :")}</span> {t("Our beginner courses provide a solid foundation in hairdressing. Learn the basics of haircuts, blow-drying, styling, coloring, creative coloring, chemical treatments, hair spa and treatments, hair and scalp analysis, and the art of product selling. Each course is designed to be comprehensive and easy to understand.")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Upgrade Your Existing Skills:")}</span> {t("For experienced hairdressers, our advanced courses cover the latest techniques and trends in the industry. Stay ahead of the competition with up-to-date knowledge and practical skills that can be directly applied in your salon.")}
                   </div>
                 </div>
   
               </div>
             </div>
           </div>

           
         <div className="self-stretch flex flex-column items-start justify-center drop-shadow-2xl  mq925:px-0 py-11 box-border max-w-full shrink-0 z-[1] mt-[-0.1px] text-center text-lg text-yellow font-open-sans mq925:pb-[0px] mq925:box-border">
     <div className="w-auto grid grid-cols-3  gap-[5em] max-w-full mq450:pt-[60px] mq450:pb-[26px] mq450:box-border mq925:gap-[30px] mq925:justify-center mq925:grid-cols-[minmax(240px,_1fr)]">
       {abtCard.slice(-3).map((card) => (
         <div key={card.id} className=" transform transition duration-100 hover:scale-105 cursor-pointer h-[371px] backdrop-blur-sm shadow-lg shadow-black bg-blue rounded-b-xl  flex flex-row items-start justify-start  pb-5 box-border max-w-full">
           <div className="self-stretch flex-1 flex flex-col items-end justify-start pt-0 px-[0.2px] pb-2.5 gap-[30px] ">
             <img
               className="self-stretch flex-1 relative max-w-full bg-gradient-to-t from-black overflow-hidden max-h-full object-cover"
               alt=""
               onClick={()=>{navigate(`${card.href}`)}}
               src={`${API_URL}${card.Image.data.attributes.url}`}
             />
             <div className="self-stretch flex flex-row items-start justify-end py-0  mq450:pl-5 mq450:pr-5 mq450:box-border">
               <div className="flex-1 relative leading-[18px] uppercase  text-bgwhite">
                 {card.Title}
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>


   <div className=" flex flex-row items-center  justify-evenly  my-10 mq925:mt-10 mq1250:px-2  mq925:flex mq925:flex-col-reverse  gap-11 max-w-full  ">
           {/* <div className=" flex flex-col items-start justify-start gap-[15px] min-w-[498.7px] max-w-full  "> */}
             <div className="flex flex-col items-center gap-5 justify-center ">
               <div className=" flex flex-col text-justify gap-3 text-xl ">
               <h1 className="m-0 relative mq925:ml-0 uppercase font-bold mq450:text-xl">
              {t("BEnifits of ihf")}
               </h1>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Learning Made Simple Courses Available in Hindi:")}</span>{t("All our courses are available in Hindi, ensuring that language is never a barrier to your learning. This makes our courses accessible to a wider audience, allowing you to fully grasp the concepts and techniques being taught")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Pre-Recorded Video Lectures and Demonstrations:")}</span> {t("Our courses feature pre-recorded video lectures and demonstrations that you can access anytime, anywhere. This flexible learning approach allows you to learn at your own pace, balancing your education with your professional and personal commitments.")}
                   </div>
                 </div>
               </div>
             </div>
             <img
             className="h- flex-1 relative max-w-full rounded-xl drop-shadow-2xl shadow-xl bg-gradient-to-t from-black overflow-hidden object-cover min-w-[400px] mq925:min-w-[100%]  "
             alt=""
             src='https://api.ihfbyjavedkhan.com/uploads/DSC_6680_20a23ece48.JPG'
           />
           </div>

       {/* </div> */}
           </section>
           <div className=" flex flex-row items-center  justify-evenly  mb-10 mq925:mb-0 mq925:px-2 mq925:flex mq925:flex-col-reverse  gap-11 max-w-full  ">
           
           {/* <div className=" flex flex-col items-start justify-start gap-[15px] min-w-[498.7px] max-w-full  "> */}
             <div className="flex flex-col items-start gap-5 justify-start ">
               <h1 className="m-0 relative mq925:ml-0 uppercase font-bold mq450:text-xl">
            {t("Why Choose IHF for Your Hairdressing Education?")}
               </h1>
   
               <div className=" flex flex-col text-justify gap-3 text-xl ">
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Affordable Education:")}</span>{t("We believe that financial constraints should not hinder your education. Our courses are priced affordably to ensure that everyone has access to high-quality hairdressing education.")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Expert Instructor:")}</span> {t("Learn from Javed Khan, a distinguished educator with profound insights into the hairdressing industry and a passion for teaching.")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Comprehensive Curriculum:")}</span>{t("Our courses cover all aspects of hairdressing, including cuts, blow-drying, styling, coloring, chemical treatments, hair spa, hair and scalp analysis, and product selling.")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Flexible Learning:")}</span> {t("With our pre-recorded lessons available in Hindi, you have the freedom to learn at your own convenience, fitting your education around your busy schedule.")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Supportive Community:")}</span> {t("We provide extensive support through detailed study materials and interactive forums where you can connect with peers and instructors.")}
                   </div>
                 </div>
                 <div className="relative list-none ">
                   <div className="">
                  <span className='font-bold'>{t("Transform Your Career with IHF:")}</span>{t("Join IHF today and take the first step towards a successful career in the salon industry. Whether you are just starting out or looking to enhance your skills, our courses offer the perfect blend of theory and practical knowledge. Experience the convenience of online learning and the expertise of Javed Khan, all designed to help you achieve your professional goals.")}
                   </div>
                 </div>
                 {/* <div className="relative list-none ">
                   <div className="">Explore our range of hairdressing courses on our website and begin your journey to becoming a top-notch hairdresser in the Indian salon market. Elevate your skills, overcome challenges, and transform your career with IHF.
                   </div>
                 </div> */}
               </div>
             </div>
             <img
             className="h- flex-1  relative mb-10 max-w-full drop-shadow-2xl shadow-xl  rounded-xl bg-gradient-to-t from-black overflow-hidden object-cover min-w-[400px] mq925:min-w-[90%]  "
             alt=""
             src={`${API_URL}${benifitsImage}`}
           />
           </div>
       <section className="divet-pb-row-wrapper ">
         <div className="divet-pb-row ">
           {cards.map((card)=>(
             <div  className="divet-pb-blurb-content1 bg-blue rounded-b-xl shadow-lg shadow-black drop-shadow-2xl cursor-pointer transform transition duration-100 hover:scale-105" key={card.id}>
               <a onClick={()=>{navigate(`${card.href}`)} }>
             <img
               className="link-events-300x300png overflow-hidden bg-gradient-to-t from-black shadow-md"
               loading="lazy"
               alt=""
               src={`${API_URL}${card.Image.data.attributes.url}`}/>
             <div className="heading-4-link-masterclass-wrapper">
               <div className="heading-4-container">
                 <p className="masterclasses-online text-bgwhite py-4">{card.Title}</p>
               </div>
             </div>
           </a>
           </div>
           ))}
           </div>
       </section>
       </main>
       <Footer/>
     </div>
      )}
      </>
  )
}

export default HomePage