import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import './onlineCourse.css'
import { useTranslation } from 'react-i18next'

const API_URL = process.env.REACT_APP_API_URL
let JWT = localStorage.getItem('JwtToken')
let userId = localStorage.getItem('UserId')

const OnlineCourse = () => {

  if(localStorage.getItem('redirectToCart')){
    localStorage.removeItem('redirectToCart')
    window.location.reload();
  }
  const {t}=useTranslation('onlineCourse')
  const queryClient = useQueryClient();
  const [faq, setFaq] = useState([])
  const [courseCard, setCourseCard] = useState([])
  const [courseCardContent, setCourseCardContent] = useState([])
  const [headerBottom, setHeaderBottom] = useState([])
  const [combo,setCombo]= useState(false);
  const navigate = useNavigate()

  const option1 = {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  }

  const Online = async () => {
    const response = await axios.get(
      `${API_URL}/api/categories?populate[courses][populate]=*`
    )
    return response.data.data
  }

  const { data: categories, isLoading, error } = useQuery('Online', Online)

  const getCartId = async () => {
    const response = await axios.get(
      `${API_URL}/api/users/${userId}?populate=*`
    )
    console.log(response?.data?.cart?.id,'response?.data')
    return response?.data?.cart?.id
  }

  const { data: cartId } = useQuery('cartId', getCartId)

  const getCart = async () => {
    const response = await axios.get(
      `${API_URL}/api/carts/${Number(cartId)}?populate=combo_package.ComboImage,course_contents.content,course_contents.content.Cover`
    )
    console.log(response?.data?.data,'response?.data?.data');
    setCombo(response?.data?.data?.attributes?.combo_package?.data)
    return response?.data?.data
  }

  const {
    data: carts,
  } = useQuery('cartData', getCart, {
    enabled: !!cartId,
  });
  console.log(carts,'Carts')

  const mutation = useMutation({

    mutationFn: async () => {
      if(JWT){
        if(carts){
          try{
            const res= await axios.post(`${API_URL}/api/cart/course/1/combo-course`, {}, option1);
            console.log(res,'Res')
            return res;
          }
          catch(error) {
            console.error(error);
          }
        }else{
          try {
            const response = await axios.post(`${API_URL}/api/carts`, {
              data: {
                combo_package:1,
                user: userId,
              },
            });
            queryClient.invalidateQueries("Cart");
            // console.log(response, "cartCreated");
          } catch (err) {
            console.error(err);
          }
        }
      }else{
          localStorage.setItem("redirectToCart", window.location.pathname);
          navigate("/login");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cartData']); // ✅ force re-fetch fresh cart data
    },
    onError: (err) => {
      console.error('Error adding to cart', err);
    },
  });

  const handleAddToCart = () => {
    // If cart already has the combo package, navigate directly
    if (combo) {
      navigate('/checkout'); // ✅ Your cart page route
    } else {
      mutation.mutate(); // ✅ Add to cart
      queryClient.invalidateQueries(['cartData']);
    }
  };

  const FAQ = async () => {
    const response = await axios.get(`${API_URL}/api/faqs/1?populate=*`)
    return response.data.data.attributes.Faq
  }

  const { data: faqs } = useQuery('faq', FAQ)

  if (isLoading) return <div className="loader">Loading..<span></span></div>
  if (error) return <div>An error occurred: {error.message}</div>

  return (
    <div className="overflow-x-hidden bg-liteBlue">
      <NavBar />
      <div className="divet-pb-module-wrapper">
        <div className="divet-pb-module">
          <div className="divet-pb-slide bg-gradient-to-bl to-blue from-black">
            <div className="py-20 w-[35rem] mq450:w-[20rem]">
              <span className="">
                <h1 className="text-[60px] mq925:text-[20px] uppercase text-yellow drop-shadow-2xl">
                 {t("Online Courses for Hairdressers")}
                </h1>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch flex flex-col items-center justify-start py-1 px-5 box-border gap-[1px] max-w-full z-[1] text-smi text-gray1">
        <div className="relative font-bold flex items-center justify-center max-w-full shrink-0">
{t("Learn the newest techniques from the Godfather of Hair Design himself. Get 25 years of experience packed into the ultimate online masterclass!")}
        </div>
      </div>

      <div className="bg-blue mt-5 p-3 h-max text-white mq925:mx-5 mx-20">
        <div className='flex mq925:flex-col justify-between mq925:items-start items-center px-2'>
          <h2 className="uppercase flex mq925:flex-col mq925:items-start gap-2 justify-center items-center">
        {t("You can buy all the below courses:")}
            <span>
              <h4 className='p-0 m-0 line-through opacity-40'>Rs.15,000.00</h4>
            </span>
            <span>
              <h3 className='p-0 m-0 text-yellow'>@ Rs.9,999.00</h3>
            </span>
          </h2>
          <button
          className="btn my-2"
          onClick={handleAddToCart}
          disabled={mutation.isLoading}
        >
          {!combo
            ? t("Add to Cart")
            : mutation.isLoading
            ? t("Adding...")
            : t("View Cart")}
        </button>
        </div>
      </div>

      <div className="flex mq925:px-2 px-20 flex-col gap-5 relative">
        {categories &&
          categories.map((Type, index) => (
            <section
              key={index}
              className="relative flex flex-col items-start justify-start pt-0 px-0 box-border max-w-full shrink-0 mq975:pb-[23px] mq975:box-border mq1500:pb-9 mq1500:box-border"
            >
              <h1 className="ml-3">{Type.attributes.Type}</h1>
              <div className="flex flex-row mq925:flex-col flex-wrap items-start justify-start py-1 mq450:px-5 gap-[20px] mq975:py-[57px] mq975:px-[10px] mq975:box-border">
                <>
                  {Type.attributes.courses &&
                    Type.attributes.courses.data.map((card, index) => (
                      <Link
                        to={`/individualCourse/${card.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="no-underline transform transition duration-100 hover:scale-105"
                        key={card.id}
                      >
                        <div className="w-[400px] h-[350px] mq925:w-[100%] mq925:h-auto backdrop-blur-xl shadow-lg shadow-black rounded-xl bg-opacity-90 bg-blue drop-shadow-2xl backdrop-filter flex flex-col items-start justify-start pt-0 px-0 pb-[17.9px] box-border gap-5 text-left text-base text-gray1 font-open-sans">
                          <img
                            className="self-stretch h-[250px] rounded-t-xl bg-gradient-to-t from-black relative max-w-full overflow-hidden shrink-0 object-cover"
                            alt=""
                            src={`${API_URL}${card.attributes.CourseImage.data.attributes.url}`}
                          />
                          <div className="absolute flex top-2 px-2 py-1 left-0 rounded-r-md z-50 bg-yellow text-blue gap-1 justify-center items-center text-center">
                            <div className="justify-center items-center text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="font-semibold justify-center items-center mb-1 text-center">
                              {card.attributes.Price}
                            </div>
                          </div>
                          <div className="flex flex-row text-bgwhite items-start justify-between py-0 px-5">
                            <div className="flex flex-col items-start justify-start gap-[1px]">
                              <div className="relative font-bold uppercase">
                                {card.attributes.CourseName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </>
              </div>
            </section>
          ))}
      </div>

      <div className="relative flex flex-col items-start justify-start px-20 mt-5 mq925:px-6 pb-[60.2px] box-border  shrink-0 max-w-full z-[1] text-white">
        <h2 className="text-[3rem] text-blue">{t("Frequently Asked Questions")}</h2>
        <div className="w-full">
          {console.log(faqs,'FAQS')}
          {faqs &&
            faqs.map((qna, index) => (
              <details  key={index} className="text-blue text-2xl mb-4">
                <summary className="font-bold my-0 mb-2">{qna.Question}</summary>
                <p className="text-lg my-0">{qna.Answer}</p>
              </details>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default OnlineCourse
