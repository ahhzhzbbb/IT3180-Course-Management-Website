import axios from 'axios';

async function callDeleteLesson(lessonId) {   
    // Xoá theo id bài học
    const api = `http://localhost:8080/api/lessons/${lessonId}`;

    try {
        const res = await axios.delete(api);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API xoá bài học:", error);
        return null;
    }
}

export default callDeleteLesson;