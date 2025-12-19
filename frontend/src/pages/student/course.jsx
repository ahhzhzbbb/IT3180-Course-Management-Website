import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Header from "../../components/header";
import Navigation from "../../components/navigation-bar";
import Footer from "../../components/footer";
import CourseItem from "../../components/student/course-item";
import CourseTable from "../../components/student/course-table";
import callCourseDetail from "../../api/crud_course/call-get-course-detail";



export default function CoursePageStudent() {
  const { courseId } = useParams();
  const courseID = courseId;
  const [courseData, setCourseData] = useState({title: ""});
  const [chapters, setChapters] = useState([]);

  const fetchCourseData = async () => {
    const data = await callCourseDetail(courseID);
    setCourseData(data);
    setChapters(data?.chapters || []);
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseID]);


  return (
    <div className="course-page">
      <Header />

      <div
        className="course-page-content"
      >
        {/* Left: Player area (placeholder similar to F8) */}
        <div>
          {/* <div className="player">
            <div className="player-content">
              <div className="player-title">
                {courseData.title || "Khoá học"}
              </div>
              <div className="player-subtitle">Video player placeholder</div>
            </div>
            <div className="player-overlay" />
          </div> */}
          <iframe
            className="player"
            title="Course Video Player"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/sSt0ixN5Z1M"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>


          <div className="player-controls">
            <button className="btn-primary btn-prev">
              ◀ Bài trước
            </button>
            <button className="btn-primary">Bài tiếp theo ▶</button>
          </div>
        </div>

        {/* Right: Course content (chapters/lessons) */}
        <aside className="wrapper-lesson">
          <h2>Nội dung khóa học</h2>

          <div className="course-list">
            {chapters.map((chapter) => (
              <div key={chapter.id}>
                <CourseTable
                    title={chapter.title}
                    description={chapter.description}
                    lessons={chapter.lessons}
                    onLink={() => {}}
                />
              </div>
            ))}
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
