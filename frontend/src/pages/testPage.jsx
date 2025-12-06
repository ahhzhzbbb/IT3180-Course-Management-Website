import { useNavigate } from "react-router-dom";

export default function DashBoard() {
    const navigate = useNavigate();
    function handleClick(e) {
        e.preventDefault();

        navigate("/login");
    }

    return (
        <div>
            <h1>Đây là trang chủ...</h1>
            <button className="btn" onClick={handleClick}>Quay lại đăng nhập</button>
        </div>
    );
}