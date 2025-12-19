import axios from 'axios';

async function callDeleteChapter(chapterId) {   
    // Xoá theo id chương
    const api = `http://localhost:8080/api/chapters/${chapterId}`;

    try {
        const res = await axios.delete(api);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API xoá chương:", error);
        return null;
    }
}

export default callDeleteChapter;