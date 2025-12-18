import { Card } from "@mui/material";
import logo from "../asset/images/logo_n7.png";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();
    
    function handleClick(e) {
        e.preventDefault();

        navigate("/auth/login");
    }

    return (
        <div className="header">
            <div className="wrapper-logo-name-slogan">
                <img
                    src={logo}
                    alt="Logo Nhóm 7"
                    style={{
                        width: '60px',
                        height: '60px',
                        marginRight: '8px',
                        borderRadius: '8px'

                    }}
                />
                <div className="wrapper-name-slogan">
                    <h1>Nhóm 7</h1>
                    <p>Slogan: Học tập nào</p>
                </div>
            </div>

            <div className="wrapper-search">
                 <div>
                    <input placeholder="Tìm kiếm khóa học" />
                 </div>
            </div>

            <div className="wrapper-sign-in-out">
                <Card className="sign-in-out" onClick={handleClick}>
                    <h2>Đăng nhập</h2>
                </Card>
                <Card className="sign-in-out" onClick={handleClick}>
                    <h2>Đăng ký</h2>
                </Card>
            </div>

        </div>
    )
}