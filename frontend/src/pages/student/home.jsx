import React, { useState, useEffect } from "react";
import "../../index.css";

import Header from "../../components/header";
import Navigation from "../../components/navigation-bar";
import Footer from "../../components/footer";
import CourseItem from "../../components/student/course-item";

import callGetAllCourse from "../../api/crud_course/call-get-all-courses";

export default function HomePageStudent() {
    const [courseList, setCourseList] = useState([]);
  
    const fetchCourseList = async () => {
      // Giả sử gọi API lấy chi tiết khóa học
      const data = await callGetAllCourse();
      setCourseList(data.courses || []);
    };
  
    useEffect(() => {
      fetchCourseList();
    }, []);
  

    const goCoursePage = (courseId) => {
      window.location.href = `/student/course/${courseId}`;
    }
  
  return (
    <div className="app-container">
        <div className="app-header">
          <Header />
        </div>
        <div className="home-page">
            <div className="app-navigation">
              <Navigation />
            </div>
          <div className="home-page-content">
      
            <div className="course-list">
              {courseList ? (
                courseList.map((course) => (
                  <div key={course.id} className="course-item">
                    <CourseItem
                      title={course.title}
                      description={course.description}
                      onLink={() => goCoursePage(course.id)}
                    />
                  </div>
                ))
              ) : (
                <p>Loading courses...</p>
              )}
            </div>
      
          </div>
        </div>
        <Footer/>
      </div>
  );
}