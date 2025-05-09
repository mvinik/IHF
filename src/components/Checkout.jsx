import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./style.component.css";

const API_URL = process.env.REACT_APP_API_URL;
const JWT = localStorage.getItem("JwtToken");
const userId = localStorage.getItem("UserId");

const Checkout = () => {
  const [price, setPrice] = useState(0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const option1 = {
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  };

  const getCartId = async () => {
    const response = await axios.get(`${API_URL}/api/users/${userId}?populate=*`);
    return response?.data?.cart?.id;
  };

  const {
    data: cartId,
    isLoading,
    error,
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
  // queryClient.invalidateQueries("cartData");

  console.log(carts,'CARTS')

  const calculateTotalPrice = () => {
    let total = 0;

    carts?.attributes?.course_contents?.data?.forEach((cart) => {
      total += Number(cart?.attributes?.content?.Price || 0);
    });
    carts?.attributes?.courses?.data?.forEach((cart) => {
      total += Number(cart?.attributes?.Price || 0);
    });

    if (carts?.attributes?.combo_package?.data) {
      total += Number(carts?.attributes?.combo_package?.data?.attributes?.Offer_Price || 0);
    }

    setPrice(total);
  };

  useEffect(() => {
    if (carts) {
      calculateTotalPrice();
    }
  }, [carts]);

  const removeCartItem = async (itemId, type = "course") => {
    const existingCourses = carts?.attributes?.courses?.data?.map(c => c.id) || [];
    const existingCourseContents = carts?.attributes?.course_contents?.data?.map(c => c.id) || [];
    const existingCombo = carts?.attributes?.combo_package?.data?.id || null;
  
    let updatedCourses = existingCourses;
    let updatedCourseContents = existingCourseContents;
  
    if (type === "combo") {
      await axios.put(`${API_URL}/api/carts/${cartId}`, {
        data: {
          user: userId,
          combo_package:null,
          courses: existingCourses,
          course_contents: existingCourseContents,
        },
      });
    } else if (type === "course") {
      updatedCourses = existingCourses.filter(id => id !== itemId);
      await axios.put(`${API_URL}/api/carts/${cartId}`, {
        data: {
          user: userId,
          courses: updatedCourses,
          course_contents: existingCourseContents,
          combo_package: existingCombo,
        },
      });
    } else if (type === "content") {
      updatedCourseContents = existingCourseContents.filter(id => id !== itemId);
      await axios.put(`${API_URL}/api/carts/${cartId}`, {
        data: {
          user: userId,
          courses: existingCourses,
          course_contents: updatedCourseContents,
          combo_package: existingCombo,
        },
      });
    }
  
    queryClient.invalidateQueries("cartData");
  };
  
  

  const handlePayment = async (e) => {
    e.preventDefault();

    const options = {
      key: "rzp_test_RJ6nR06W2Bz9gm",
      key_secret: "RxH5iAhnwIUuvvWwJhRGKKU5",
      amount: price * 100,
      currency: "INR",
      name: "IHF by Javed Khan",
      config: {
        display: {
          blocks: {
            banks: {
              name: "All payment methods",
              instruments: [
                { method: "upi" },
                { method: "card" },
                { method: "wallet" },
                { method: "netbanking" },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
      handler: async function (Paymentresponse) {
        await axios.post(
          `${API_URL}/api/cart/${Paymentresponse.razorpay_payment_id}/${userId}/payment`,
          {},
          option1
        );
        navigate("/");
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  if (isLoading) return <div className="loader">Fetching..<span></span></div>;

  if (error)
    return (
      <section className="flex items-center bg-blue h-screen p-16">
        <div className="container flex flex-col items-center">
          <div className="flex flex-col gap-2 max-w-md text-center">
            <h1 className="font-extrabold text-[5rem] my-0 p-0 text-white">404</h1>
            <p className="text-2xl my-0 text-white">Sorry, we couldn't find this page.</p>
            <a href="/" className="btn">Back to home</a>
          </div>
        </div>
      </section>
    );

  return (
    <>
      <NavBar />
      {(carts?.attributes?.combo_package?.data || carts?.attributes?.course_contents?.data?.length > 0 || carts?.attributes?.courses?.data?.length > 0 ) ? (
        <div className="flex items-center justify-center py-20 bg-liteBlue text-white">
          <div className="flex w-full mx-44 mq925:mx-2 mq925:flex-wrap gap-10 mq925:gap-1">
            <div className="w-1/2 mq925:w-full mq925:m-7 bg-blue drop-shadow-2xl mq925:p-3 p-6 rounded-lg">
              <h1 className="main-title">Basket</h1>
              <div className="cart-items w-full">
                <table className="w-full">
                  <thead>
                    <tr className="cart-items-header">
                      <th className="text-left"><span>Product</span></th>
                      <th><span>Total</span></th>
                    </tr>
                  </thead>

                  <tbody>
                    {carts?.attributes?.course_contents?.data?.map((cart, index) => (
                      <tr className="cart-item" key={index}>
                        <td className="flex gap-8 mq925:gap-2 mt-6">
                          <img className="h-20 w-20 object-cover bg-white p-1"
                            src={`${API_URL}${cart?.attributes?.content?.Cover?.data?.attributes?.url}`}
                            alt={cart?.attributes?.Name}
                          />
                          <div className="cart-item-details">
                            <span className="flex">{cart?.attributes?.Name}</span>
                            <div className="cart-item-price">
                              <span>₹{cart?.attributes?.content?.Price}</span>
                            </div>
                            {/* <div className="cart-item-description">
                              <p className="my-1">{cart?.attributes?.content?.Topic}</p>
                            </div> */}
                            <div className="cart-item-actions">
                              <button className="btn" onClick={() => removeCartItem(cart.id,'content')}>Remove item</button>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">₹{cart?.attributes?.content?.Price}</td>
                      </tr>
                    ))}


                    {carts?.attributes?.courses?.data?.map((cart, index) => (
                      <tr className="cart-item" key={index}>
                        <td className="flex gap-8 mq925:gap-2 mt-6">
                          <img className="h-20 w-20 object-cover bg-white p-1"
                            src={`${API_URL}${cart?.attributes?.CourseImage?.data?.attributes?.url}`}
                            alt={cart?.attributes?.CourseName}
                          />
                          <div className="cart-item-details">
                            <span className="flex">{cart?.attributes?.CourseName}</span>
                            <div className="cart-item-price">
                              <span>₹{cart?.attributes?.Price}</span>
                            </div>
                            {/* <div className="cart-item-description">
                              <p className="my-1">{cart?.attributes?.CourseName}</p>
                            </div> */}
                            <div className="cart-item-actions">
                              <button className="btn" onClick={() => removeCartItem(cart.id,'course')}>Remove item</button>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">₹{cart?.attributes?.Price}</td>
                      </tr>
                    ))}



                    {carts?.attributes?.combo_package?.data && (
                      <tr className="cart-item">
                        <td className="flex gap-8 mq925:gap-2 mt-6">
                          <img className="h-20 w-20 object-cover bg-white p-1"
                            src={`${API_URL}${carts?.attributes?.combo_package?.data?.attributes?.ComboImage?.data?.attributes?.url}`}
                            alt={carts?.attributes?.combo_package?.data?.attributes?.Title}
                          />
                          <div className="cart-item-details">
                            <span>{carts?.attributes?.combo_package?.data?.attributes?.Title}</span>
                            <div className="cart-item-price">
                              <span>₹{carts?.attributes?.combo_package?.data?.attributes?.Offer_Price}</span>
                            </div>
                            <div className="cart-item-description">
                              <p className="my-1">Access to all the courses</p>
                            </div>
                            <div className="cart-item-actions">
                              <button className="btn" onClick={() => removeCartItem(null, "combo")}>Remove item</button>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">₹{carts?.attributes?.combo_package?.data?.attributes?.Offer_Price}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-1/2 mq925:w-full mq925:m-7">
              <div className="cart-totals flex flex-col justify-between gap-5 bg-blue drop-shadow-2xl p-6 rounded-lg">
                <h2 className="basket-totals-heading">Basket totals</h2>

                {carts?.attributes?.course_contents?.data?.map((cart, index) => (
                  <div key={index} className="basket-subtotal flex items-center justify-between">
                    <div>{cart?.attributes?.Name}</div>
                    <div className="text-yellow font-bold">₹{cart?.attributes?.content?.Price}</div>
                  </div>
                ))}

                {carts?.attributes?.courses?.data?.map((cart, index) => (
                  <div key={index} className="basket-subtotal flex items-center justify-between">
                    <div>{cart?.attributes?.CourseName}</div>
                    <div className="text-yellow font-bold">₹{cart?.attributes?.Price}</div>
                  </div>
                ))}

                {carts?.attributes?.combo_package?.data && (
                  <div className="basket-subtotal flex items-center justify-between">
                    <div>{carts?.attributes?.combo_package?.data?.attributes?.Title}</div>
                    <div className="text-yellow font-bold">₹{carts?.attributes?.combo_package?.data?.attributes?.Offer_Price}</div>
                  </div>
                )}

                <hr className="border-2 text-white w-full" />
                <div className="basket-total flex items-center justify-between text-xl font-bold">
                  <div>Total</div>
                  <div className="text-yellow">₹{price}</div>
                </div>

                <button onClick={handlePayment} className="btn w-full">Proceed to Payment</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center"> 
        <h1 className=" text-white items-center justify-center text-center">Your cart is Empty</h1>
       <div className="flex mb-5">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-[200px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
                </div> 
        <button className="btn justify-center items-center mb-10" onClick={() => navigate("/onlineCourse")}>Browse Courses</button>
    </div>
      )}
      <Footer />
    </>
  );
};

export default Checkout;
