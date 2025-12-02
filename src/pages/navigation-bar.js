import { Card } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';


export default function Navigation() {
    return (
        <div className="navigation">
            <div>

                <Card className="button-navigation">
                    <HomeIcon/>

                    <h2>Trang chủ</h2>
                </Card>
            </div>

            <div>
                <Card>Khóa học của tôi</Card>
            </div>

            <div>
                <Card>Bài viết</Card>
            </div>
        </div>
    )
}