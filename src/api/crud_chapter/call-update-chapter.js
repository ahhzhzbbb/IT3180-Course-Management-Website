import axios from 'axios';

async function callUpdateChapter(chapterId, chapterData) {   
    const api = `http://localhost:8080/api/chapters/${chapterId}`;

    try {
        const res = await axios.put(api, chapterData);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API cập nhật chương:", error);
        return null;
    }
}

export default callUpdateChapter;