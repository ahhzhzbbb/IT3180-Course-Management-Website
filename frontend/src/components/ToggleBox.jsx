export default function ToggleBox({handleClick}) {
    return (
        <div className="toggle-box">
            <div className="toggle-panel toggle-left">
                <h1>Hello, Welcome!</h1>
                <p>Don't have an account?</p>
                <button className="btn register-btn" onClick={handleClick}>Register</button>
            </div>
            <div className="toggle-panel toggle-right">
                <h1>Welcome Back!</h1>
                <p>Already have an account?</p>
                <button className="btn login-btn" onClick={handleClick}>Login</button>
            </div>
        </div>
    );
}