import axios from 'axios'

async function  callGetAllCourse() {
    const api = 'http://localhost:8080/api/courses'
    
    try {
        const res = await axios.get(api) 
        console.log(res.data)
        return res.data;
    } catch {
        console.error("Không gọi được API GetAllCourse");
        return [];
    }
}

export default callGetAllCourse