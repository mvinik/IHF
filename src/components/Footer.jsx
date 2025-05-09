import React, { useEffect, useState } from 'react'
import './style.component.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL;

const Footer = () => {

  const navigate = useNavigate();
  const[ footer, setFooter] = useState([]);
  const[social ,setSocial] = useState([]);

  useEffect(()=>{
    Footer_API();
  },[]);
  
  
    const Footer_API = async() => {
      try{
        const response = await axios.get(`${API_URL}/api/global?populate[footer][populate]=*`);
        setFooter(response.data.data.attributes.footer[0].links);
        setSocial(response.data.data.attributes.footer[1].links)
      }catch(e){
        console.error(e);
      }
    }

  return (
    <footer className=" bg-blue relative">
    <div className=" px-6 py-8 ">
        <div className="fleX flex-col items-center text-center">
            <a href="/">
                <img className="w-auto h-20" src="https://api.ihfbyjavedkhan.com/uploads/ihf_logo_590d48d82a.png" alt=""/>
            </a>

            <div className="flex  gap-6 justify-center mt-6 -mx-4  mq925:m-0 ">
            {footer.map((foot) =>(
                <div className="mb-2 menu menu-5 cursor-pointer" key={foot.id}>
                <a className="gap-1 text-mini   text-white " onClick={()=>{navigate(`${foot.href}`)} }>
                  {foot.label}
                  </a>
                </div>
              ))}
            </div>
        </div>

        <hr className="my-6 mq925:my-3 w-[90%] border-t-[1px] border-white" />

        <div className="flex flex-row px-20 items-center mq925:flex-col  mq925:px-1 justify-between sm:flex-row sm:justify-between">
            <p className="text-sm  text-white">© Copyright 2024. All Rights Reserved.</p>

            <div className="flex -mx-2">
            <div className="icons">
            <a href=''> <i class="fa fa-facebook"></i></a>
            <a href=''> <i class="fa fa-instagram"></i></a>
            <a href=''> <i class="fa-brands fa-youtube"></i></a>
            {/* <a href=''> <i class="fa-brands fa-x-twitter"></i></a>
            <a href=''> <i class="fa fa-linkedin"></i></a> */}
            </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer