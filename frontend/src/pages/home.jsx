import React, { useState, useEffect } from "react";

import Header from "../components/header";
import Navigation from "../components/navigation-bar";
import Footer from "../components/footer";
import FormAdd from "../components/allert/form-add";
import AlertBeforeDel from "../components/allert/alert-before-del";
import callGetAllCourse from "../api/crud_course/call-get-all-courses";
import CourseItem from "../components/course-item";

import callAddNewCourse from "../api/crud_course/call-add-new-course";
import callDeleteCourse from "../api/crud_course/call-delete-course";
import callUpdateCourse from "../api/crud_course/call-update-course";
import { data } from "react-router-dom";

export default function HomePage() {
    const [courseList, setCourseList] = useState([]);
  
    const fetchCourseList = async () => {
      // Giả sử gọi API lấy chi tiết khóa học
      const data = await callGetAllCourse();
      setCourseList(data.courses || []);
    };
  
    useEffect(() => {
      fetchCourseList();
    }, []);
  
    // Modal state
    const [formOpen, setFormOpen] = useState(false);
    const [formType, setFormType] = useState("insert"); // "insert" | "update"
    const [formTarget, setFormTarget] = useState({ kind: null, data: null }); // kind: "course"
  
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTarget, setConfirmTarget] = useState({ kind: null, data: null });//XMLDocument
  
    // Open edit form
    const openEditForm = (kind, data) => {
      setFormType("update");
      setFormTarget({ kind, data });
      setFormOpen(true);
    };
  
    // Open confirm delete
    const openConfirmDelete = (kind, data) => {
      setConfirmTarget({ kind, data });
      setConfirmOpen(true);
    };
  
    const handleEditCourse = (course) => {
      openEditForm("course", course);
    };
  
    const handleDeleteCourse = (course) => {
      openConfirmDelete("course", course);
    };
  
    // Submit form-add
    const handleFormAddSubmit = async ({ title, description }) => {
      // Giả sử gọi API thêm/chỉnh sửa khoá học
      const isUpdate = formType === "update";
      if (isUpdate) {
        // Gọi API cập nhật khoá học
        await callUpdateCourse(formTarget.data.id, {title, description});
      } else {
        // Gọi API thêm khoá học
        await callAddNewCourse({ title, description });
      }
      // Sau khi thành công, gọi lại fetchCourseList để cập nhật danh sách
      await fetchCourseList();
      setFormOpen(false);
      
    };
  
    // Confirm delete
    const handleConfirmDelete = async () => {
      // Giả sử gọi API xóa khoá học
      const courseId = confirmTarget.data.id;
      await callDeleteCourse(courseId);
      // Sau khi thành công, gọi lại fetchCourseList để cập nhật danh sách
      await fetchCourseList();
      setConfirmOpen(false);
      
    };

    const goCoursePage = (courseId) => {
      window.location.href = `/course/${courseId}`;
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
      
            <div className="course-toolbar">
              <button
                className="btn-primary"
                onClick={() => {
                  setFormType("insert");
                  setFormTarget({ kind: "chapter", data: null });
                  setFormOpen(true);
                }}
              >
                ➕ Thêm khoá học
              </button>
            </div>
      
            <div className="course-list">
              {courseList ? (
                courseList.map((course) => (
                  <div key={course.id} className="course-item">
                    <CourseItem
                      title={course.title}
                      description={course.description}
                      onEdit={() => handleEditCourse(course)}
                      onDelete={() => handleDeleteCourse(course)}
                      onLink={() => goCoursePage(course.id)}
                    />
                  </div>
                ))
              ) : (
                <p>Loading courses...</p>
              )}
            </div>
      
            {/* FormAdd cho thêm/chỉnh sửa */}
            {formOpen && (
              <FormAdd
                type={formType}
                courseId={formTarget.kind === "course" ? formTarget.data.id : null}
                titleOfAllert={
                  formType === "update"
                    && formTarget.kind === "course"
                      ? "Chỉnh sửa khoá học"
                      : "Thêm khoá học"
                }
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onAdd={handleFormAddSubmit}
              />
            )}
      
            {/* AlertBeforeDel khi xóa */}
            <AlertBeforeDel
              open={confirmOpen}
              title="Xác nhận xóa"
              message={
                confirmTarget.kind === "course"
                  ? `Bạn có chắc muốn xóa khoá học "${confirmTarget.data?.title}"?`
                  : ""
              }
              confirmText="Xóa"
              cancelText="Hủy"
              onConfirm={handleConfirmDelete}
              onCancel={() => setConfirmOpen(false)}
            />
          </div>
        </div>
        <Footer/>
      </div>
  );
}