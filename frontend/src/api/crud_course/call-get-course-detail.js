import axios from 'axios';

export default async function callCourseDetail(courseID) {
    const api = `http://localhost:8080/api/courses/${courseID}`;

    try {
        const res = await axios.get(api);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API GetCourseDetail");
        return null;
    }
}