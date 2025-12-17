import axios from 'axios';

async function callUpdateCourse(courseId, courseData) {   
    const api = `http://localhost:8080/api/courses/${courseId}`;

    try {
        const res = await axios.put(api, courseData);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API updateCourse:", error);
        return null;
    }
}

export default callUpdateCourse;