import { Card } from "@mui/material";

export default function Header() {
    return (
        <div className="header">
            <div className="wrapper-name-slogan">
                <h1>Nhom 7</h1>
                <p>Slogan: Học tập nào</p>
            </div>

            <div className="wrapper-search">
                 <div>
                    <input placeholder="Tìm kiếm khóa học" />
                 </div>
            </div>

            <div className="wrapper-sign-in-out">
                <Card className="sign-in-out">
                    <h2>Đăng nhập</h2>
                </Card>
                <Card className="sign-in-out">
                    <h2>Đăng ký</h2>
                </Card>
            </div>

        </div>
    )
}