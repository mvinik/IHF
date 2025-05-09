import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Scissor1 } from "../../components/Icons";
import { useTranslation } from "react-i18next";
const API_URL = process.env.REACT_APP_API_URL;

const MasterClasses = () => {
  const {t}=useTranslation('onlineCourse')
  // const[courses , setCourses] = useState([]);
  const [faq, setFaq] = useState([]);
  const [courseCard, setCourseCard] = useState([]);
  const [courseCardContent, setCourseCardContent] = useState([]);
  const [headerBottom, setHeaderBottom] = useState([]);

//   const Master = async () => {
//     const response = await axios.get(
//       `${API_URL}/api/master-classes?populate[course][populate]=*`
//     );
//     return response.data.data;
//   };
//   const { data: courses, isLoading, error } = useQuery("Master", Master);

//   if (isLoading)
//     return (
//       <div class="loader">
//         Loading..<span></span>
//       </div>
//     );
//   if (error) return <section class="flex items-center h-screen p-16 ">
//   <div class="container flex flex-col items-center ">
//       <div class="flex flex-col gap-2 max-w-md text-center">
//           <h1 class="font-extrabold text-[5rem] my-0 p-0 text-white">
//             404
//           </h1>
//           <p class="text-2xl my-0 text-white">Sorry, we couldn't find this page.</p>
//           <a href="/" class="btn">Back to home</a>
//       </div>
//   </div>
// </section>;

  return (
    <div className="container bg-liteBlue">
      <NavBar />
      <div class="container flex flex-col items-center h-full py-20">
       <div class="flex flex-col gap-2 max-w-md text-center">
           <h1 class="font-extrabold text-[3rem] my-0 p-0 text-blue">
{t("Currently Masterclass is Not available")}
           </h1>
           <a href="/" class="btn1">{t("Back to home")}</a>
       </div>
   </div>

      {/* <div className="divet-pb-module-wrapper">
        <div className="divet-pb-module">
          <div className="divet-pb-slide bg-gradient-to-t from-black">
            <div className="heading-3-container mq925:py-5">
              <span className="heading-3-container1">
                <h1 className="text-[60px] mq925:text-[20px] text-white drop-shadow-2xl">
                  Masterclass
                </h1>
              </span>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="self-stretch  flex flex-col items-center justify-start py-1  px-5  box-border gap-[1px] max-w-full z-[1] text-smi text-gray1">
        <div className=" relative font-bold flex items-center justify-center max-w-full shrink-0">
          Learn the newest techniques from the Godfather of Hair Design himself.
          Get 25 years of experience packed into the ultimate online
          masterclass!
        </div>
      </div>

      <section className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[86.5px] box-border max-w-full shrink-0 mq975:pb-[23px] mq975:box-border mq1500:pb-9 mq1500:box-border">
        <div className="self-stretch  flex flex-row flex-wrap items-start justify-start py-[87px] px-[180px] mq450:px-10 shrink-0 [debug_commit:1de1738] gap-[20px] mq975:py-[57px] mq975:px-[105px] mq975:box-border">
          {courses &&
            courses.map((card) => (
              <Link
                to={"/details/course/" + card.attributes.course.data.id}
                className="no-underline transform transition duration-100 hover:scale-105"
              >
                <div
                  key={card.id}
                  className="w-[400px] h-[350px] mq925:w-[100%] mq925:h-auto backdrop-blur-xl rounded-xl bg-opacity-90 bg-white drop-shadow-2xl backdrop-filter flex flex-col items-start justify-start pt-0 px-0 pb-[17.9px] box-border gap-[19.6px] text-left text-base text-gray1  font-open-sans"
                >
                  <img
                    className="self-stretch h-[250px] rounded-t-2xl bg-gradient-to-t from-black relative max-w-full overflow-hidden shrink-0 object-cover"
                    alt=""
                    src={`${API_URL}${card.attributes.course.data.attributes.CourseImage.data.attributes.url}`}
                  />
                  <div className="absolute flex bottom-24 p-2 right-1  z-50 bg-transparent text-white gap-1 justify-center items-center text-center ">
                    <div className="justify-center items-center text-center ">
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
                    <div className=" font-semibold justify-center items-center mb-1 text-center ">
                      {card.attributes.course.data.attributes.Price}
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start py-0 px-5">
                    <div className="flex flex-col items-start justify-start gap-[1px]">
                      <div className="relative leading-[27.2px] uppercase font-bold">
                        {card.attributes.course.data.attributes.CourseName}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default MasterClasses;
