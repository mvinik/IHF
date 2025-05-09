import axios from "axios"
import React from "react"
import { useMutation } from "react-query"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import NavBar from "../../components/NavBar"
import "./contact.css"
import { useTranslation } from "react-i18next"
const API_URL = process.env.REACT_APP_API_URL;

const Contact = () => {

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")  
 const { t } =useTranslation('contact')

  const useSendContact = () =>{
    return useMutation(async(sendContact) =>{
      const res = await axios.post(`${API_URL}/api/contact`)
      return res.data
    })
  }

const {mutate:contact} = useSendContact();

const handleSubmit = (e) =>{
  e.preventDefault();

  if(!name ||!email ||!subject ||!message){
    alert("All fields are required")
    return;
  }else{
    contact({
      name:name,
      email: email,
      subject:subject,
      message: message,
    })
    alert("Message sent successfully")
  }
  setName("")
  setEmail("")
  setSubject("")
  setMessage("")
}

  const map = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Land+Marvel+Residential+Flat+Owners+Associations+Ashok+Nagar+Chennai+600083" width="300" height="300" frameborder="0" style="border:0;'
  return (
    <>
    <NavBar/>
      <section className='contacts bg-liteBlue  px-14 py-14 flex gap-5 mq925:px-6 mq925:flex-col'>
          <div className='left flex w-[50%] mq925:w-full'>
            <iframe className="w-full " src={map}></iframe>
          </div>
          <div className=' right items-start text-gray1 justify-start w-[50%] mq925:w-full'>
            <h1>{t("Contact us")}</h1>
            <p>{t("We're open for any suggestion or just to have a chat")}</p>

            <div className='items grid2'>
              <div className='box'>
                <h4 className="text-gray1">{t("ADDRESS:")}</h4>
                <p>{t("xxx yyy zzz")}</p>
              </div>
              <div className='box'>
                <h4 className="text-gray1">{t("EMAIL:")}</h4>
                <p> ihfbyjavedkhan.1@gmail.com</p>
              </div>
              <div className='box'>
                <h4 className="text-gray1">{t("PHONE:")}</h4>
                <p>+91 9xxxx xxxx9</p>
              </div>
            </div>

            <form action=''>
              <div className='flexSB flex gap-4 w-[93%] mq925:flex-col mq925:w-full mq925:gap-0'>
                <input type='text' placeholder={t('Name')} onChange={(e)=>setName(e.target.value)} value={name}/>
                <input type='email' placeholder={t('Email')} onChange={(e)=>setEmail(e.target.value)}  value={email}/>
              </div>
              <input type='text' placeholder={t('Subject' )} onChange={(e)=>setSubject(e.target.value)} value={subject} />
              <textarea cols='30' rows='5' onChange={(e)=>setMessage(e.target.value)} value={message}>
                {t('Create a message here...')}
              </textarea>
              <button className='btn1' onClick={handleSubmit}>{t("SEND MESSAGE")}</button>
            </form>
          </div>
      </section>
      <Footer/>
    </>
  )
}

export default Contact
