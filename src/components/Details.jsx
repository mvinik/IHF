// import { useQuery, useQueryClient } from "react-query";
// import axios from "axios";
// import React, { useContext, useEffect, useRef } from "react";
// import { useState } from "react";
// import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
// import Footer from "./Footer";
// import NavBar from "./NavBar";
// import { notification } from "antd";
// import Scissor, { Scissor1 } from "./Icons";
// import { useTranslation } from "react-i18next";
// import { LanguageContext } from "../context/LanguageContext";


// const API_URL = process.env.REACT_APP_API_URL;
// const JWT = localStorage.getItem("JwtToken");
// // Details changed 
// const Details = () => {

//   const {locale} =useContext(LanguageContext)
//   const { t }=useTranslation('details')
//   const { id } = useParams();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState([]);
//   const [Desc, setDesc] = useState([]);
//   const [image, setImage] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [previewVideo, setPreviewVideo] = useState(null);
//   const [learn, setLearn] = useState([]);
//   const [updatedAt, setUpdatedAt] = useState("");
//   const [courseInCart, setCourseInCart] = useState(false);
//   const [isBought, setIsBought] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [purchasedId, setPurchasedId] = useState(null);
//   const [lessonVideoUrl, setLessonVideoUrl] = useState(null);
//   const [videoKey, setVideoKey] = useState(0);
//   const userId = localStorage.getItem("UserId");


  
// if(localStorage.getItem('redirectToCart')){
//   localStorage.removeItem('redirectToCart')
//   window.location.reload();
// }

//   const User = async () => {
//     const response = await axios.get(
//       `${API_URL}/api/users/${userId}?locale=${locale}&populate[cart][populate]=*`
//     );
//     return response.data.cart;
//   };

//   const { data: cart } = useQuery(["Cart",locale], User);

//   console.log(cart, "cart details");
//   const isContentInCart = cart?.course_contents?.some(item => item.id == id);
//   console.log(isContentInCart,'isContentInCart')
//   useEffect(() => {
    
//   }, [isContentInCart]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/course-contents/${id}?locale=${locale}&populate[content][populate][0]=Cover&populate[content][populate][1]=courseVideo&populate=PreviewVideo`
//       );
//       const responseData = response.data.data;
//       setCourse(responseData.attributes);
//       console.log("course details ",response.data);
//       setLearn(response.data.data.attributes.content.WhatYouWillLearn);
//       setDesc(response.data.data.attributes.content.Description);
//       setImage(response.data.data.attributes.content.Cover.data.attributes.url);
//       setVideo(response.data.data.attributes.content.courseVideo.data.attributes.url);
//       setPreviewVideo(response.data.data.attributes.PreviewVideo.data.attributes.url)
//       setUpdatedAt(response.data.data.attributes.updatedAt);
//       localStorage.removeItem("redirectToCart");
//     } catch (err) {
//       console.error(err);
//     }
//   };
  
//   const addToCart = async () => {
//     if (JWT) {
//       if(cart){
//         try {
//           const response = await axios.put(`${API_URL}/api/carts/${cart.id}`, {
//             data: {
//               course_contents: {
//                 connect: [id],
//               },
//             },
//           });
//           console.log(response,'addtocart')

//           // console.log(response, "cartUpdated");
//           queryClient.invalidateQueries("Cart");
//         } catch (err) {
//           console.error(err);
//         }
//       }else{
//         try {
//           const response = await axios.post(`${API_URL}/api/carts`, {
//             data: {
//               course_contents: {
//                 connect: [id],
//               },
//               user: userId,
//             },
//           });
//           queryClient.invalidateQueries("Cart");
//           // console.log(response, "cartCreated");
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     } else {
//       localStorage.setItem("redirectToCart", window.location.pathname);
//       navigate("/login");
//     }
//   };

//   const isCartEmpty = async () => {
//     // console.log("id:", id);
//     // console.log("cartCourses:", cart);
//     if (cart && cart.courses && cart.courses.length > 0) {
//       const isLiked = cart.courses.map(
//         (course) => course.id.toString() === id.toString()
//       );
      
//       const anyLiked = isLiked.includes(true);

//       if (anyLiked) {
//         queryClient.invalidateQueries("Cart");
//         setCourseInCart(true);
//         // console.log("courseincart", courseInCart);
//       }
//     } else {
//       console.log("Cart is empty");
//     }
//   };

//   const PurchasedCourse = async () => {
//     const response = await axios.get(
//       `${API_URL}/api/users/${userId}?populate[purchased_course][populate]=*`
//     );
//     if(response.data.purchased_course){
//       return response.data.purchased_course.courses;
//     }
//   };
//   const { data: purchasedCourse,isLoading,error } = useQuery(
//     "PurchasedCourse",
//     PurchasedCourse
//   );
//   // console.log(purchasedCourse, "PurchasedCourse");

//   const LessonPlan = async() =>{
//     const response = await axios.get(`${API_URL}/api/courses/${id}?populate[LessonPlan][populate]=*`);
//     return response.data.data.attributes.LessonPlan;
//   }
//   const { data: lessonPlan } = useQuery(
//     "LessonPlan",
//     LessonPlan
//   );
//   // console.log(lessonPlan, "LessonPlan");

//   const isPurchased = () => {
//     if (
//       purchasedCourse &&
//       purchasedCourse.length > 0
//       ) {
//         const isPurchase = purchasedCourse.map(course => course.id.toString() === id.toString());
//         // console.log(isPurchase, "purchasedCourse is true or not");
//         // console.log(id,'course ID');
//         const anyLiked = isPurchase.includes(true);
//         if (anyLiked) {
//         // queryClient.invalidateQueries("PurchasedCourse");
//         setIsBought(true);
//         // console.log(isBought, "isBoughtCourse is true or not");
//       }
//     } else {
//       console.log("NO courses purchased");
//     }
//   };
  
//   useEffect(() => {
//     isPurchased();
//   }, [purchasedCourse]);

 
//   const [isPreview,setIsPreview] = useState(true);
//   const handlePlay = (videoUrl) => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
//       if (isBought) {
//         setIsPreview(false);
//         setLessonVideoUrl(videoUrl);
//         setIsPlaying(true);
//         setVideoKey(prevKey => prevKey + 1);
//       } else {
//         notification.error({message:"Please make a payment to unlock the video.",placement:"top"});
//       }
//   };
//   const handlePreviewPlay =() => {

//     if(isBought) {
//       setLessonVideoUrl(lessonPlan[0].courseVideo.data.attributes.url);
//       setIsPlaying(true);
//     }else{
//       setLessonVideoUrl(video);
//       setIsPlaying(true);
//     }

  
//   // if (isBought) {
//   //   setLessonVideoUrl(lessonPlan[0].courseVideo.data.attributes.url);
//   //   setIsPlaying(true);
//   // } else {
//   //   notification.error({
//   //     message: "You should pay to watch this course.",
//   //     placement: "top",
//   //   });
//   //   // Don't play anything
//   //   setIsPlaying(false);
//   // }



//   };


//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     isCartEmpty();
//   }, [cart]);

 
//   if (isLoading)
//     return (
//       <div class="loader">
//         Fetching..<span></span>
//       </div>
//     );
//   if (error) return <section class="flex items-center h-screen p-16 ">
//   <div class="container flex flex-col items-center ">
//       <div class="flex flex-col gap-2 max-w-md text-center">
//           <h1 class="font-extrabold text-[5rem] my-0 p-0 text-white">
//             404
//           </h1>
//           <p class="text-2xl my-0 text-white">{t("Sorry, we couldn't find this page.")}</p>
//           <a href="/" class="btn">{t("Back to home")}</a>
//       </div>
//   </div>
// </section>;



import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { notification } from "antd";
import Scissor1 from "./Icons"; // Assuming this is your custom icon
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/LanguageContext";

const API_URL = process.env.REACT_APP_API_URL;
const JWT = localStorage.getItem("JwtToken");

const Details = () => {
  const {locale}=useContext(LanguageContext)
  const { t } = useTranslation("details");
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("UserId");

  // STATES
  const [course, setCourse] = useState([]);
  const [Desc, setDesc] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [learn, setLearn] = useState([]);
  const [courseInCart, setCourseInCart] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lessonVideoUrl, setLessonVideoUrl] = useState(null);
  const [videoKey, setVideoKey] = useState(0);
  const [updatedAt, setUpdatedAt] = useState("");


  // CART
  const { data: cart } = useQuery("Cart", async () => {
    const res = await axios.get(`${API_URL}/api/users/${userId}?populate[cart][populate]=*`);
    return res.data.cart;
  });

  const isContentInCart = cart?.course_contents?.some(item => item.id == id);

  // FETCH COURSE DETAILS
  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await axios.get(
    //     `${API_URL}/api/course-contents/${id}?populate[content][populate][0]=Cover&populate[content][populate][1]=courseVideo&populate=PreviewVideo`
    //   );
    //   const data = res.data.data;
    //   setCourse(data.attributes);
    //   setDesc(data.attributes.content.Description);
    //   setLearn(data.attributes.content.WhatYouWillLearn);
    //   setImage(data.attributes.content.Cover.data.attributes.url);
    //   setVideo(data.attributes.content.courseVideo.data.attributes.url);
    //   setPreviewVideo(data.attributes.PreviewVideo.data.attributes.url);
    // };

    const fetchData = async () => {
  try {
    const response = await axios.get(
      //previous url

      // `${API_URL}/api/course-contents/${id}?locale=${locale}&populate[content][populate][0]=Cover&populate[content][populate][1]=courseVideo&populate=PreviewVideo`
    
      //new url for different id's ,solution is localizations

        `${API_URL}/api/course-contents/${id}?locale=${locale}&populate[content][populate][0]=Cover&populate[content][populate][1]=courseVideo&populate=PreviewVideo&populate=localizations`
    
    );
    const responseData = response.data.data;
    setCourse(responseData.attributes);
    setLearn(responseData.attributes.content.WhatYouWillLearn || []);
    setDesc(responseData.attributes.content.Description || []);

    // Safe image access
    const cover = responseData.attributes.content?.Cover?.data?.attributes?.url;
    if (cover) setImage(cover);

    // Safe video access
    const courseVideo = responseData.attributes.content?.courseVideo?.data?.attributes?.url;
    if (courseVideo) setVideo(courseVideo);

    // Safe preview video access
    const previewVideo = responseData.attributes?.PreviewVideo?.data?.attributes?.url;
    if (previewVideo) setPreviewVideo(previewVideo);

    setUpdatedAt(responseData.attributes.updatedAt);
    localStorage.removeItem("redirectToCart");
  } catch (err) {
    console.error("Failed to fetch course content:", err);
  }
};


    fetchData();
  }, [id]);

  // HANDLE CART ADD
  const addToCart = async () => {
    if (!JWT) {
      localStorage.setItem("redirectToCart", window.location.pathname);
      navigate("/login");
      return;
    }

    try {
      if (cart) {
        await axios.put(`${API_URL}/api/carts/${cart.id}`, {
          data: { course_contents: { connect: [id] } },
        });
      } else {
        await axios.post(`${API_URL}/api/carts`, {
          data: { course_contents: { connect: [id] }, user: userId },
        });
      }
      queryClient.invalidateQueries("Cart");
    } catch (err) {
      console.error(err);
    }
  };

  // CHECK IF PURCHASED
  // const { data: purchasedCourse } = useQuery("PurchasedCourse", async () => {
  //   const res = await axios.get(
  //     `${API_URL}/api/users/${userId}?populate[purchased_course][populate][0]=courses.course_contents&populate[purchased_course][populate][1]=course_contents&populate[purchased_course][populate][2]=combo_packages.courses.course_contents`
  //   );
  //   return res.data.purchased_course;
  // });
  
  const { data: purchasedCourse } = useQuery("PurchasedCourse", async () => {
  const res = await axios.get(
    `${API_URL}/api/users/${userId}?populate[purchased_course][populate][0]=courses.course_contents&populate[purchased_course][populate][1]=course_contents&populate[purchased_course][populate][2]=combo_packages.courses.course_contents`
  );
  return res.data.purchased_course;
});


const isPurchased = () => {
  if (purchasedCourse) {
    // 1. Direct course content purchase
    if (
      purchasedCourse.course_contents &&
      purchasedCourse.course_contents.some(content => content.id.toString() === id.toString())
    ) {
      setIsBought(true);
      return;
    }

    // 2. Course purchase
    if (
      purchasedCourse.courses &&
      purchasedCourse.courses.some(course =>
        course.course_contents?.some(content => content.id.toString() === id.toString())
      )
    ) {
      setIsBought(true);
      return;
    }

    // 3. Combo package course content access

    if (
  purchasedCourse.combo_packages &&
  purchasedCourse.combo_packages.some(pkg =>
    pkg.courses?.some(course =>
      course?.course_contents?.some(content =>
        content.id.toString() === id.toString()
      )
    )
  )
) {
  setIsBought(true);
  return;
}

    // if (
    //   purchasedCourse.combo_packages &&
    //   purchasedCourse.combo_packages.some(pkg =>
    //     pkg.courses?.some(course =>
    //       course.course_contents?.some(content => content.id.toString() === id.toString())
    //     )
    //   )
    // ) {
    //   setIsBought(true);
    //   return;
    // }
  }
};

  useEffect(() => {
    isPurchased();
  }, [purchasedCourse]);

  // VIDEO HANDLING
  const handlePreviewPlay = () => {
    if (isBought) {
      setLessonVideoUrl(video);
    } else {
      setLessonVideoUrl(previewVideo || video);
    }
    setIsPlaying(true);
    setVideoKey(prev => prev + 1);
  };

  const handlePlay = () => {
    if (!isBought) {
      notification.error({ message: "Please make a payment to unlock the video." });
      return;
    }
    setLessonVideoUrl(video);
    setIsPlaying(true);
    setVideoKey(prev => prev + 1);
  };


  return (
    <>
      <NavBar />
      <div className="w-full bg-liteBlue flex justify-center  pb-20">
  <section className="w-full max-w-[1320px] mq450:px-4  flex flex-col gap-10 text-gray1">
    <h1 className="text-[2.3rem] mq450:text-3xl mb-0 font-semibold pl-3">{course.Name}</h1>

    <div className="flex flex-col lg:flex-row gap-10 w-full">
      {/* Video or Thumbnail */}
      <div className="flex-1 flex flex-col gap-8">

        <div className="flex flex-row mq450:flex-col justify-between mq450:gap-5 items-center gap-20">
        <div className="w-full flex  ">
          {isPlaying && lessonVideoUrl ? (
            <video
              className="max-w-[700px] mq450:w-full  h-full object-cover rounded-xl"
              controls
              key={videoKey}
              autoPlay
            >
              <source src={`${API_URL}${lessonVideoUrl}`} type="video/mp4" />
             {t('Your browser does not support the video tag.')}
            </video>
          ) : (
            <div className="relative">
              <img
                className="max-w-[700px] mq450:w-full h-full object-cover rounded-xl"
                src={`${API_URL}${image}`}
                alt="Course Preview"
              />
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-gray1 rounded-full text-white"
                onClick={handlePreviewPlay}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
           {/* Sidebar - Pricing & Info */}
      <aside className="w-full lg:max-w-[448px] space-y-6">
        <div className="bg-blue text-white rounded-lg shadow-lg p-6 space-y-6">
          {isBought ? (
            <div className="text-center">
              <h1 className="text-2xl mb-4">{t("Keep Learning...")}</h1>
              <button
                className="btn1 w-full"
                onClick={() => navigate("/onlineCourse")}
              >
                {t("View Courses")}
              </button>
            </div>
          ) : (
            <div className=" text-white border-b-2 border-white rounded-lg ">
              <div className="text-2xl font-bold text-yellow">{course?.Name}</div>
              <p className="text-6xl font-bold my-3">₹ {course?.content?.Price}</p>
              {isContentInCart ? (
                <Link to="/checkout">
                  <button className="w-full btn font-bold  rounded-md py-2 px-4  text-blue">
                   {t("View Cart")}
                  </button>
                </Link>
              ) : (
                <button
                  onClick={addToCart}
                  className="w-full font-bold btn  rounded-md py-2 px-4 text-blue"
                >
                {t("Add to Cart")}
                </button>
              )}
            </div>       
          )}

          {/* Course Info */}
          <div className="border-2 border-white text-xl">
            <div className="flex items-start gap-2">
              <div>{t("Video Available in Hindi")}</div>
            </div>
            <div className="flex items-start gap-2">
              <div>{t("Certificate of Completion")}</div>
            </div>
          </div>
        </div>
      </aside>
      </div>
        {/* Course Description */}
        <div className="flex flex-col">
          <div>
            <h2 className="text-[2rem] font-semibold mb-2">{t("About Course")}</h2>
            <div className="space-y-2 text-5xl">
              {Desc?.map((desc, index) => (
                <div key={index}>
                  {desc?.children?.map((child, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Scissor1 />
                      <p className="my-1">{child.text}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <h2 className="text-[2rem] font-semibold mb-2">{t("What Will You Learn?")}</h2>
            <div className="space-y-2 text-5xl">
              {learn?.map((L, index) => (
                <div key={index}>
                  {L?.children?.map((child, i) => (
                    <div key={i} className="flex  gap-2">
                      <Scissor1 />
                      <p className="my-1">{child?.text}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

   
    </div>
  </section>
</div>

<Footer />

    </>
  );
};

export default Details;
