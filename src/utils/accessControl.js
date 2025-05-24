import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const JWT = localStorage.getItem("JwtToken");
const userId = localStorage.getItem("UserId");

export const hasAccessToContent = async (contentId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/users/${userId}?populate[purchased_combo][populate][courses][populate]=*&populate[purchased_course][populate][course_contents][populate]=*&populate[purchased_content][populate]=*`,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    const userData = response.data;

    // Check if content is directly purchased
    const directAccess = userData.purchased_content?.some(
      (content) => content.id === contentId
    );

    // Check if content is part of a purchased course
    const courseAccess = userData.purchased_course?.courses?.some((course) =>
      course.course_contents.some((content) => content.id === contentId)
    );

    // Check if content is part of a combo package
    const comboAccess = userData.purchased_combo?.courses?.some((course) =>
      course.course_contents.some((content) => content.id === contentId)
    );

    return directAccess || courseAccess || comboAccess;
  } catch (error) {
    console.error("Error checking access:", error);
    return false;
  }
};

export const hasAccessToCourse = async (courseId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/users/${userId}?populate[purchased_combo][populate][courses]=*&populate[purchased_course]=*`,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    const userData = response.data;

    // Check if course is directly purchased
    const directAccess = userData.purchased_course?.some(
      (course) => course.id === courseId
    );

    // Check if course is part of purchased combo
    const comboAccess = userData.purchased_combo?.courses?.some(
      (course) => course.id === courseId
    );

    return directAccess || comboAccess;
  } catch (error) {
    console.error("Error checking access:", error);
    return false;
  }
};