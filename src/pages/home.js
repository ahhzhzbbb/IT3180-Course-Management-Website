import { useState, useEffect } from "react";

import KhoaInfo from "../components/khoahocInfo";
import { Card, CardContent, CardHeader } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import Navigation from "./navigation-bar";

import callGetAllCourse from '../api/call-get-all-courses';

function Home() {
  //const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   async function fetchAllCourse() {
  //     const data = await callGetAllCourse();
  //     console.log("Khoahoc:", data);
  //     setCourses(Array.isArray(data) ? data : []);
  //   }

  //   fetchAllCourse();

  // }, [])
  const courses = [
        {
            "id": 1,
            "title": "Toán 10"
        },
        {
            "id": 2,
            "title": "Vật lí 11"
        },
        {
            "id": 3,
            "title": "Hóa học 12"
        }
    ]



  return (
    <div>
      <Card>
        <Header/> 
        <div className="content">
           <Navigation/>
          <div className="list-course">
            <h1>Danh sách khóa học</h1>
            {
              courses.map((course, index) => {
                return (
                  <KhoaInfo key ={index} course = {course}/>
                );
              }
              )
            }
          </div>
        </div>
      </Card>
       <Footer/>
    </div>
  );
}

export default Home;
