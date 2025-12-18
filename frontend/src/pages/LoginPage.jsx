import LoginForm from "../components/auth/LoginForm";
import ToggleBox from "../components/auth/ToggleBox";

import { useState, useEffect } from "react";
import SignUpForm from "../components/auth/SignUpForm";

import "../styles/LoginPage.css";
/*
    LoginPage sẽ có component con là LoginForm
    quản lý các state inputEmail và inputPassword để duy trì văn bản được nhập trong các input của form
    LoginForm sẽ đươc truyền props từ cha xuống và truyền cho các input
    https://react.dev/learn/thinking-in-react
*/
export default function LoginPage()
{
    const [loginInputEmail, setLoginInputEmailChange] = useState("");
    const [loginInputPassword, setLoginInputPasswordChange] = useState("");

    const [signUpInputEmail, setSignUpInputEmailChange] = useState("");
    const [signUpInputPassword, setSignUpInputPasswordChange] = useState("");

    const [show, setShow] = useState(false);
    function handleSlide(e) {
        e.preventDefault();
        console.log("Hello");

        setShow(!show);
    }

    return (
        <div className={show ? "login-page active" : "login-page"}>
            <div>
                <div> 
                    <LoginForm 
                        inputEmail={loginInputEmail}
                        inputPassword={loginInputPassword}
                        onInputEmailChange={setLoginInputEmailChange}
                        onInputPasswordChange={setLoginInputPasswordChange}
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
        </div> /*các props cần truyền để có thể duy tri được việc nhập input*/
    );
}