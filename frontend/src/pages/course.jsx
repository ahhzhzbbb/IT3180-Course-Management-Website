import React, { useEffect, useState } from "react";

import Header from "../components/header";
import Navigation from "../components/navigation-bar";
import Footer from "../components/footer";
import CourseTable from "../components/course-table";
import FormAdd from "../components/allert/form-add";
import AlertBeforeDel from "../components/allert/alert-before-del";
import callCourseDetail from "../api/crud_course/call-get-course-detail";


import callAddNewChapter from "../api/crud_chapter/call-add-new-chapter";
import callAddNewLesson from "../api/crud_lesson/call-add-new-lesson";
import callDeleteChapter from "../api/crud_chapter/call-delete-chapter";
import callDeleteLesson from "../api/crud_lesson/call-delete-lesson";
import callUpdateChapter from "../api/crud_chapter/call-update-chapter";
import callUpdateLesson from "../api/crud_lesson/call-update-lesson";


export default function CoursePage() {

  const courseID = window.location.pathname.split("/").pop();
  const [courseData, setCourseData] = useState({title: ""});
  const [chapters, setChapters] = useState([]);

  const fetchCourseData = async () => {
    const data = await callCourseDetail(courseID);
    setCourseData(data);
    setChapters(data?.chapters || []);
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState("insert"); // "insert" | "update"
  const [formTarget, setFormTarget] = useState({ kind: null, data: null }); // kind: "chapter" | "lesson"

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState({ kind: null, data: null });

  // Open edit form
  const openEditForm = (kind, data) => {
    setFormType("update");
    setFormTarget({ kind, data });
    setFormOpen(true);
  };

  // Open add form for lesson
  const openAddFormForLesson = (chapter) => {
    setFormType("insert");
    setFormTarget({ kind: "lesson", data: { chapter } });
    setFormOpen(true);
  };

  // Open confirm delete
  const openConfirmDelete = (kind, data) => {
    setConfirmTarget({ kind, data });
    setConfirmOpen(true);
  };

  const handleEditChapter = (chapter) => {
    openEditForm("chapter", chapter);
  };

  const handleDeleteChapter = (chapter) => {
    openConfirmDelete("chapter", chapter);
  };

  const handleEditLesson = (lesson) => {
    openEditForm("lesson", lesson);
  };

  const handleDeleteLesson = (lesson) => {
    openConfirmDelete("lesson", lesson);
  };

  // Submit form-add
  const handleFormAddSubmit = async ({ title, description }) => {
    if (formType === "update") {
        if (formTarget.kind === "chapter") {    
            // Gọi API cập nhật chương
            await callUpdateChapter(formTarget.data.id, {title, description});
        } else if (formTarget.kind === "lesson") {
            // Gọi API cập nhật bài học
            await callUpdateLesson(formTarget.data.id, {title, description});
        }
    } else {
        if (formTarget.kind === "chapter") {
            // Gọi API thêm chương
            await callAddNewChapter(courseID, { title, description });
        } else if (formTarget.kind === "lesson") {
            // Gọi API thêm bài học vào chương
            const chapterId = formTarget.data.chapter.id;
            await callAddNewLesson(chapterId, { title, description });
        }
    }
    // Sau khi thành công, gọi lại fetchCourseData để cập nhật dữ liệu
    await fetchCourseData();
    setFormOpen(false);
  };

  // Confirm delete
  const handleConfirmDelete = async() => {
    if (confirmTarget.kind === "chapter") {
        // Gọi API xóa chương
        await callDeleteChapter(confirmTarget.data.id);
    } else if (confirmTarget.kind === "lesson") {
        // Gọi API xóa bài học
       await callDeleteLesson(confirmTarget.data.id);
    }   
    // Sau khi thành công, gọi lại fetchCourseData để cập nhật dữ liệu
    await fetchCourseData();
    setConfirmOpen(false);
    
  };

  return (
    <div className="course-page">
        <Header />
        <h1 className="course-heading">{courseData.title}</h1>

      <div className="course-toolbar">
        <button
          className="btn-primary"
          onClick={() => {
            setFormType("insert");
            setFormTarget({ kind: "chapter", data: null });
            setFormOpen(true);
          }}
        >
          ➕ Thêm chương
        </button>
      </div>

      <div className="course-list">
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <CourseTable
              title={chapter.title}
              description={chapter.description}
              lessons={chapter.lessons}
              onEditChapter={() => handleEditChapter(chapter)}
              onDeleteChapter={() => handleDeleteChapter(chapter)}
              onEditLesson= {handleEditLesson}
              onDeleteLesson={handleDeleteLesson}
            />
            <div className="course-add-lesson">
              <button
                className="btn-success"
                onClick={() => openAddFormForLesson(chapter)}
              >
                ➕ Thêm bài học vào "{chapter.title}"
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FormAdd cho thêm/chỉnh sửa */}
      {formOpen && (
        <FormAdd
          type={formType}
          titleOfAllert={
            formType === "update"
              ? formTarget.kind === "chapter"
                ? "Chỉnh sửa chương"
                : "Chỉnh sửa bài học"
              : formTarget.kind === "chapter"
              ? "Thêm chương"
              : "Thêm bài học"
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
          confirmTarget.kind === "chapter"
            ? `Bạn có chắc muốn xóa chương "${confirmTarget.data?.title}"?`
            : `Bạn có chắc muốn xóa bài học "${confirmTarget.data?.title}"?`
        }
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      <Footer/>
    </div>
  );
}
