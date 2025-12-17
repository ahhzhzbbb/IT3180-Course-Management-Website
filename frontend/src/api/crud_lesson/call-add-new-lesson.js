import axios from 'axios';

async function callAddNewLesson(chapterId, lessonData) {   
    const api = `http://localhost:8080/api/chapters/${chapterId}/lessons`;

    try {
        const res = await axios.post(api, lessonData);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API AddNewLesson:", error);
        return null;
    }
}

export default callAddNewLesson;