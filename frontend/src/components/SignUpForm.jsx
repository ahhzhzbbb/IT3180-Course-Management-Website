export default function SignUpForm({ inputEmail, inputPassword, onInputEmailChange, onInputPasswordChange }) {
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Dang ky thanh cong");
    }

    return (
        <div className="form-box register">
            <form onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={inputEmail}
                        onChange={(e) => onInputEmailChange(e.target.value)}
                    />
                    <i className='bx bxs-user'></i> {/*icon nhung chua cai dat:V*/}
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={inputPassword}
                        onChange={(e) => onInputPasswordChange(e.target.value)}
                        className="inputField"
                    />
                    <i className='bx bxs-lock-alt' ></i>
                </div>

                <div className="forgot-link">
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" className="btn">Register</button>
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