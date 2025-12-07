import { useState } from "react";
import callRegisterApi from "../api/registerApi";

export default function SignUpForm({
    inputEmail,
    inputPassword,
    onInputEmailChange,
    onInputPasswordChange,
}) {
    const [comfirmPassword, setComfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState(true);
    const [birth, setBirth] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();

        if (inputPassword !== comfirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        if (inputPassword.length < 8) {
            setError("Mật khẩu quá ngắn!");
            return;
        }

        setError(""); 

        const user = {
            email: inputEmail,
            password: inputPassword,
            nam: name,
            gender: gender,
            birth: birth,
            phoneNumber: phoneNumber
        };

        const result = await callRegisterApi(user);

        console.log("Kết quả:", result);
        console.log("Đăng ký thành công");
    }

    return (
        <div className="form-box register">
            <form onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <div className="input-row">
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}    
                        />
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Số Điện Thoại"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}    
                        />
                    </div>
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={inputEmail}
                        onChange={(e) => onInputEmailChange(e.target.value)}
                    />
                </div>
                
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={inputPassword}
                        onChange={(e) => onInputPasswordChange(e.target.value)}
                    />
                </div>
                
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={comfirmPassword}
                        onChange={(e) => setComfirmPassword(e.target.value)}
                    />
                    {error && (
                        <p className="error-text" style={{ color: "red", fontSize: "14px" }}>
                            {error}
                        </p>
                    )}
                </div>
                <div className="input-row">
                    <div className="input-box">
                        <input 
                            type="date" 
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>
                    <div className="gender">
                        <label>Giới tính : </label>

                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value={true}
                                checked={gender === true}
                                onChange={() => setGender(true)}
                            />
                            Nam
                        </label>

                        <label>
                            <input 
                                type="radio" 
                                name="gender" 
                                value={false}
                                checked={gender === false}
                                onChange={() => setGender(false)}
                            />
                            Nữ
                        </label>
                    </div>
                </div>
                

                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    );
}
