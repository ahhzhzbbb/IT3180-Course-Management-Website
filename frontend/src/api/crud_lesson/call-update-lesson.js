import axios from 'axios';

async function callUpdateLesson(lessonId, lessonData) {   
    const api = `http://localhost:8080/api/lessons/${lessonId}`;

    try {
        const res = await axios.put(api, lessonData);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API cập nhật bài học:", error);
        return null;
    }
}

export default callUpdateLesson;