import { useState, useEffect } from "react";

import KhoaInfo from "../components/khoahocInfo";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Button } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";

import callGetAllCourse from '../api/call-get-all-courses';
import callDeleteCourse from "../api/call-delete-course";
import callAddNewCourse from "../api/call-add-new-course";

import AlertBeforeDel from "../components/alert-before-del";
import FormAddNewCourse from "../components/form-add-new-course";
import { Form } from "react-router-dom";

function Home() {
  const [courses, setCourses] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState("");
  const [addCourseOpen, setAddCourseOpen] = useState(false);

  useEffect(() => {
    async function fetchAllCourse() {
      const data = await callGetAllCourse();
      console.log("Khoahoc:", data);
      setCourses(data.courses);
    }

    fetchAllCourse();

  }, [])

  const handleAddCourse = async (courseData) => {
    try {
      // Nếu bạn có API để thêm course, gọi API ở đây và dùng response trả về.
      // Ví dụ: const created = await callAddCourse(courseData); setCourses(prev => [...prev, created]);
      // Hiện tại tạo id tạm thời
      const newCourse = await callAddNewCourse(courseData);
      setCourses(prev => [...prev, newCourse]);
      setAddCourseOpen(false);
    } catch (err) {
      console.error("Add course failed", err);
    }
  };

  // const courses = [
  //       {
  //           "id": 1,
  //           "title": "Toán 10"
  //       },
  //       {
  //           "id": 2,
  //           "title": "Vật lí 11"
  //       },
  //       {
  //           "id": 3,
  //           "title": "Hóa học 12"
  //       }
  //   ]



  return (
    <>
  
        <Header/> 
        <AlertBeforeDel
          open={deleteConfirmOpen}
          onConfirm={
            async () => {
              await callDeleteCourse(deleteConfirmOpen);
              setCourses(courses.filter(course => course.id !== deleteConfirmOpen));
              setDeleteConfirmOpen("");
          }}
          onCancel={() => setDeleteConfirmOpen("")}
        />
        <FormAddNewCourse
          open={addCourseOpen}
          onClose={() => setAddCourseOpen(false)}
          onAdd={handleAddCourse}
        />
        <div className="content">
           {/* <Navigation/> */}
          <div className="list-course">
            <h1>Danh sách khóa học</h1>
            {
              courses.map((course, index) => {
                return (
                  <KhoaInfo key ={index} course = {course} setDeleteConfirmOpen={setDeleteConfirmOpen} />
                );
              }
              )
            }
            <Button variant="contained" onClick={() => setAddCourseOpen(true)}>Thêm khóa học</Button>
          </div>
        </div>
        <Footer/>
      
    </>
  );
}

export default Home;
