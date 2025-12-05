import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/header";
import Navigation from "../components/navigation-bar";
import Footer from "../components/footer";
import DescriptionIcon from '@mui/icons-material/Description';

import callCourseDetail from "../api/crud_course/call-get-course-detail";

export default function Course () {
    const { state } = useLocation();
    const [courseDetail, setCourseDetail] = useState({chapters: []});
    const [visible, setVisible] = useState(Array(3).fill(false))

    const handleVisible = (index) => {
        const newVisible = [...visible];
        newVisible[index] = !newVisible[index];
        setVisible(newVisible)
    }

    const course = state?.course;
    console.log("Course page:", course);

    useEffect(() => {
       async function fetchCourseDetail() {
           // gọi API lấy chi tiết khóa học
            const data = await callCourseDetail(course['id']);
            console.log("Chi tiết khóa học:", data);
            setCourseDetail(data);
       }
        fetchCourseDetail();
    }, [course]);
    if (!course) {
        return <div>Không có dữ liệu khóa học!</div>;
    }       

    // có course rồi gọi 1 API lấy nội dung vd
    // const courseDetail =  callCourseDetail(course['id']);
    // const courseDetail= {
    //     "id": 1,
    //     "title": "Toán 10",
    //     "chapters": [
    //         {
    //         "id": 1,
    //         "title": "Logic, Tập hợp",
    //         "lessons": [
    //             {
    //             "id": 1,
    //             "title": "Giới thiệu về logic"
    //             },
    //             {
    //             "id": 2,
    //             "title": "Giới thiệu về tập hợp"
    //             }
    //         ]
    //         },
    //         {
    //         "id": 2,
    //         "title": "Phương trình, hệ phương trình",
    //         "lessons": []
    //         },
    //         {
    //         "id": 3,
    //         "title": "Bất đẳng thức",
    //         "lessons": []
    //         }
    //     ]
    // }

    return (
        <>
            <Header/>
            <div className="wrapper-content-course">
                <Navigation/>
                <div className="wrapper-lesson">
                    <h1>{courseDetail.title}</h1>
                    <h2>Nội dung khóa học</h2>
                    {courseDetail.chapters.map((chapter, index) => {
                        return (
                        <div key = {index}>
                                <div className="wrapper-lesson-sub">
                                    <DescriptionIcon />
                                    <div className="lesson">
                                        <h3>{chapter.title}</h3>
                                        <button onClick={() => handleVisible(index)} >
                                                <span>▼</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="list-lesson">
                                    {
                                        visible[index] && chapter.lessons.map((les, index) => {
                                            return (
                                                <div key= {index}>
                                                    <h3>{les.title}</h3>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })}
            </div>
         </div>
        <Footer/>
        </>
    );
}

