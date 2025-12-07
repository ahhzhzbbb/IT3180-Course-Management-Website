import axios from "axios";

export default async function callLoginApi(User) {
    const api = "http://localhost:8080/api/public/login";

    try {
        const res = await axios.post(api, User);
        return res.data;
    } catch (error) {
        console.error("Không gọi được API Register:", error.response.data);
        return null;
    }
}