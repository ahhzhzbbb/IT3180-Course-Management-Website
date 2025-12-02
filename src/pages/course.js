import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

//import callCourseDetail from "../api/call-get-course-detail";

export default function Course () {
    const { state } = useLocation();
    const [visible, setVisible] = useState(Array(3).fill(false))

    const handleVisible = (index) => {
        const newVisible = [...visible];
        newVisible[index] = !newVisible[index];
        setVisible(newVisible)
    }

    const course = state?.course;
    // có course rồi gọi 1 API lấy nội dung vd
    // const courseDetail =  callCourseDetail(course['id']);
    const courseDetail= {
        "id": 1,
        "title": "Toán 10",
        "chapters": [
            {
            "id": 1,
            "title": "Logic, Tập hợp",
            "lessons": [
                {
                "id": 1,
                "title": "Giới thiệu về logic"
                },
                {
                "id": 2,
                "title": "Giới thiệu về tập hợp"
                }
            ]
            },
            {
            "id": 2,
            "title": "Phương trình, hệ phương trình",
            "lessons": []
            },
            {
            "id": 3,
            "title": "Bất đẳng thức",
            "lessons": []
            }
        ]
    }

    return (
        <>
            <Header/>
            <div className="wrapper-lesson">
                <h1>{courseDetail.title}</h1>
                <h2>Nội dung khóa học</h2>
                {courseDetail.chapters.map((chapter, index) => {
                    return (
                    <div key = {index}>
                            <div className="lesson">
                                <h3>{chapter.title}</h3>
                                <button onClick={() => handleVisible(index)} >
                                        <span>▼</span>
                                </button>
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

        </>
    );
}

