import LoginForm from "../components/LoginForm";
import ToggleBox from "../components/ToggleBox";
import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import "../styles/LoginPage.css";

// 1. IMPORT HOOK ĐIỀU HƯỚNG
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    // State quản lý input
    const [loginInputEmail, setLoginInputEmailChange] = useState("");
    const [loginInputPassword, setLoginInputPasswordChange] = useState("");

    const [signUpInputEmail, setSignUpInputEmailChange] = useState("");
    const [signUpInputPassword, setSignUpInputPasswordChange] = useState("");

    const [show, setShow] = useState(false);
    
    // Khởi tạo hook điều hướng
    const navigate = useNavigate();

    // 2. HÀM XỬ LÝ ĐĂNG NHẬP (QUAN TRỌNG)
    const handleLoginSubmit = (e) => {
        // Ngăn chặn hành vi reload mặc định của form
        if (e) e.preventDefault(); 

        console.log("Đang đăng nhập với:", loginInputEmail, loginInputPassword);

        // --- LOGIC KIỂM TRA TÀI KHOẢN ---
        // Ví dụ: Email chứa chữ "admin" là Admin
        const isAdmin = loginInputEmail.includes("admin"); 

        if (isAdmin) {
            alert("Chào mừng Admin! Đang chuyển hướng...");
            // Nhảy sang trang Admin
            navigate("/admin");
        } else {
            alert("Đăng nhập thành công! Vào Dashboard sinh viên.");
            // Nhảy sang trang Dashboard sinh viên
            navigate("/dashboard");
        }
    };

    function handleSlide(e) {
        e.preventDefault();
        setShow(!show);
    }

    return (
        <div className={show ? "login-page active" : "login-page"}>
            <div>
                <div> 
                    {/* 3. TRUYỀN HÀM handleLoginSubmit XUỐNG LoginForm */}
                    <LoginForm 
                        inputEmail={loginInputEmail}
                        inputPassword={loginInputPassword}
                        onInputEmailChange={setLoginInputEmailChange}
                        onInputPasswordChange={setLoginInputPasswordChange}
                        onLoginSubmit={handleLoginSubmit} // <--- Thêm dòng này
                    />
                </div>
                <div>
                    <SignUpForm 
                        inputEmail={signUpInputEmail}
                        inputPassword={signUpInputPassword}
                        onInputEmailChange={setSignUpInputEmailChange}
                        onInputPasswordChange={setSignUpInputPasswordChange}
                    />
                </div>
            </div>
            <div>
                <ToggleBox handleClick={handleSlide} />
            </div>
        </div>
    );
}