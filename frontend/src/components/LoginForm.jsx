// components/LoginForm.jsx
import React from 'react';

// Lưu ý: Không cần import useNavigate hay API ở đây nữa
// Vì logic đó đã được chuyển lên LoginPage.jsx để kiểm tra quyền Admin

export default function LoginForm({ 
    inputEmail, 
    inputPassword, 
    onInputEmailChange, 
    onInputPasswordChange,
    onLoginSubmit // <--- Nhận hàm này từ cha (LoginPage)
}) {

    return (
        <div className="form-box login">
            {/* Gọi hàm onLoginSubmit khi nhấn nút Login */}
            <form onSubmit={onLoginSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={inputEmail}
                        onChange={(e) => onInputEmailChange(e.target.value)}
                        required // Nên thêm required để HTML tự validate cơ bản
                    />
                    <i className='bx bxs-user'></i>
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={inputPassword}
                        onChange={(e) => onInputPasswordChange(e.target.value)}
                        className="inputField"
                        required
                    />
                    <i className='bx bxs-lock-alt' ></i>
                </div>

                <div className="forgot-link">
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" className="btn">Login</button>
                
                <p>or login with social platforms</p>
                <div className="social-icons">
                    <a href="#"><i className='bx bxl-google' ></i></a>
                    <a href="#"><i className='bx bxl-facebook' ></i></a>
                    <a href="#"><i className='bx bxl-github' ></i></a>
                    <a href="#"><i className='bx bxl-linkedin' ></i></a>
                </div>
            </form>
        </div>
    );
}