import axios from 'axios';

async function callAddNewCourse(courseData) {   
    const api = 'http://localhost:8080/api/courses';

    try {
        const res = await axios.post(api, courseData);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API AddNewCourse:", error);
        return null;
    }
}

export default callAddNewCourse;