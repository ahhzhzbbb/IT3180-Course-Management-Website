import axios from 'axios';

async function callDeleteChapter(chapterId) {   
    const api = `http://localhost:8080/api/courses/{courseId}/chapters`;

    try {
        const res = await axios.delete(api);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API AddNewChapter:", error);
        return null;
    }
}

export default callDeleteChapter;