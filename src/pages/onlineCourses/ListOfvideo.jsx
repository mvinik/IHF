import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { useTranslation } from 'react-i18next';
const API_URL = process.env.REACT_APP_API_URL;
let JWT  = localStorage.getItem("JwtToken"); ;
const userId = localStorage.getItem("UserId");


const ListOfvideo = () => {


  if(localStorage.getItem('redirectToCart')){
    localStorage.removeItem('redirectToCart')
    window.location.reload();
  }
 const {t}=useTranslation('onlineCourse')
  const queryClient = useQueryClient();
    const { id } = useParams();
    const [CourseData, setCourseData] = useState(null);
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/api/courses/${id}?populate=*`
          );
          setCourseData(response.data.data);
          return response.data.data;
        } catch (err) {
          console.error(err);
        }
      };

      useEffect(() => {
        fetchData();
      },[id])

// console.log(CourseData);

const option1 = {
  headers: {
  'Authorization':`Bearer ${JWT}`
  },
}

const getCartId = async () => {
  const response = await axios.get(`${API_URL}/api/users/${userId}?populate=*`);
  return response?.data?.cart?.id;
};

const {
  data: cartId
} = useQuery("cartId", getCartId);

const getCart = async () => {
  const response = await axios.get(
    `${API_URL}/api/carts/${Number(cartId)}?populate=combo_package.ComboImage,course_contents.content,course_contents.content.Cover,courses.CourseImage`
  );
  return response?.data?.data;
};

const {
  data: carts,
  refetch,
} = useQuery("cartData", getCart, {
  enabled: !!cartId,
});
console.log(carts,'Cartdata')


const mutation = useMutation({
  mutationFn: async () => {
    if(JWT){
      if(carts){
        try {
          const res =  await axios.put(`${API_URL}/api/carts/${cartId}`,{
           data: {
             courses: {
               connect: [id],
             },
           },
          },option1);
           console.log(res, 'response of add to cart');
         } catch (error) {
           console.error(error);
         }
      } else {
        try {
          const response = await axios.post(`${API_URL}/api/carts`, {
            data: {
              courses: {
                connect: [id],
              },
              user: userId,
            },
          });
          queryClient.invalidateQueries("Cart");
          // console.log(response, "cartCreated");
        } catch (err) {
          console.error(err);
        }
      }
    }else {
      localStorage.setItem("redirectToCart", window.location.pathname);
      navigate("/login");
    }
   
  },
})

const isCourseInCart = carts?.attributes?.courses?.data?.some(item => item.id == id);
// console.log(isCourseInCart,'isCourseInCart')

useEffect(() => {
}, [isCourseInCart,carts]);


const handleAddToCart = () => {
    mutation.mutate(); // ✅ Add to cart
    queryClient.invalidateQueries(['cartData']);
};

const LessonPlan = async() =>{
  const response = await axios.get(`${API_URL}/api/courses/${id}?populate[course_contents][populate][content][populate][Cover]=*`);
    return response.data.data.attributes.course_contents.data;
  }
  const { data: lessonPlan,isLoading } = useQuery(
    "LessonPlan",
    LessonPlan
  );

  if(isLoading) return <div class="loader">Loading<span></span></div>;
  console.log(lessonPlan, "LessonPlan");

  return (
    <div className=' overflow-x-hidden bg-liteBlue'>
    <NavBar/>
    <div className="divet-pb-module-wrapper">
  <div className="divet-pb-module">
    <div className="divet-pb-slide bg-gradient-to-bl to-blue from-black">
    <div className="py-20 w-[35rem] mq450:w-[20rem]">
        <span className="">
          <h1 className="text-[40px] mq925:text-[20px] uppercase text-yellow drop-shadow-2xl">
          {CourseData?.attributes?.CourseName}
          </h1>
        </span>
      </div>
    </div>
  </div>
</div>

       <div className='flex flex-col gap-5 relative'>


<section className='flex flex-row mq925:flex-col-reverse p-10 mq925:p-4 '>
    <div className="flex flex-row w-3/4 justify-start mq925:w-full  flex-wrap gap-8">
      <>
        {lessonPlan && lessonPlan.map((card, index) => (
          <Link 
            to={'/details/course/' + card.id} 
            // onClick={() => { handleOnclick('/details/course/' + card.id) }} 
            className='no-underline transform transition duration-100 hover:scale-105 '
            key={index} // Move key here to the Link element
          >
            <div className="w-[300px] min-h- h-auto mq925:w-[100%] mq925:h-auto backdrop-blur-xl shadow-lg shadow-black rounded-xl bg-opacity-90 bg-blue drop-shadow-2xl backdrop-filter flex flex-col items-start justify-start pt-0 pb-3 px-0  box-border gap-2 text-left text-base text-gray1 font-open-sans">
              <img
                className="self-stretch h-[150px] rounded-t-xl bg-gradient-to-t from-black relative max-w-full overflow-hidden shrink-0 object-cover"
                alt=""
                src={`${API_URL}${card?.attributes?.content?.Cover?.data.attributes.url}`}
              />
              <div className="absolute flex top-2 px-2 py-1 left-0 rounded-r-md z-50 bg-yellow text-blue gap-1 justify-center items-center text-center"> 
                <div className="justify-center items-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="font-semibold text-[13px]  justify-center items-center mb-1 text-center">
                  {card?.attributes?.content?.Price}
                </div>
              </div>
              <div className="flex flex-row text-bgwhite items-start justify-between py-0 px-3">
                <div className="flex flex-col items-start justify-start gap-[1px]">
                  <p className="relative  py-0 my-0 font-bold uppercase">
                    {card?.attributes?.content?.Topic}
                  </p>
                </div>
              </div>
            </div> 
          </Link>
        ))}
      </>
    </div>
    <div className='w-1/4 mq925:w-fit mq925:mb-10 bg-blue h-fit '>
        <div className='h-auto w-fit flex flex-col justify-center items-start px-4 py-4'>
        <h2 className='uppercase text-white my-0'>{t("Preview Video")}</h2>
        <video className='h-full w-full' controls > 
        <source src="https://api.ihfbyjavedkhan.com/uploads/pexels_roman_odintsov_12724042_2160p_4b0e09c81d.mp4" type="video/mp4"/>
        {t("Your browser does not support the video tag.")}
          </video>
        </div>
        <hr className='h-1 bg-white mx-3 my-0' />
        <div className=' p-3 h-max  text-white'>
                <h2 className='uppercase my-0'>{t("full Course")}</h2>
                <h3 className='text-yellow text-3xl p-0 m-0'>Rs.{CourseData?.attributes?.Price}</h3>
                <h3 className='p-0 m-0 '>{CourseData?.attributes?.CourseName}</h3>
                <button
                  className="btn my-2"
                  onClick={isCourseInCart ? () => navigate('/checkout') : handleAddToCart}
                >
                  {isCourseInCart ? t('View Cart') : t('Add to Cart')}
                </button>

                <hr className='h-1 bg-white my-3' />
                <ul className='text-xl'>
                    <li>{t("Videos available in hindi")}</li>
                    <li>{t("Certificate of completion")}</li>
                    <li>{t("You can subscribe to this full course")}</li>
                </ul>
        </div>
    </div>

</section>

</div>

    <Footer/>
  </div>
  )
}

export default ListOfvideo