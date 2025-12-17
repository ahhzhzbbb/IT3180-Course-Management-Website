import axios from 'axios';

async function callCreateChapter(courseId, chapterData) {   
    const api = `http://localhost:8080/api/courses/${courseId}/chapters`;

    try {
        const res = await axios.delete(api, chapterData);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API AddNewChapter:", error);
        return null;
    }
}

export default callCreateChapter;