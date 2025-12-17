import axios from 'axios';

export default async function callDeleteCourse(courseID) {
    const api = `http://localhost:8080/api/courses/${courseID}`;

    try {
        const res = await axios.delete(api);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API DeleteCourse:", error);
        return null;
    }
}