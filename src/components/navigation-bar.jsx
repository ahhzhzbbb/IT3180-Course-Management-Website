import { Card } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';



export default function Navigation() {
    return (
        <div className="navigation">
            <div >
                <Card className="button-navigation">
                    <HomeIcon />

                    <h3>Trang chủ</h3>
                </Card>
            </div>

            <div>
                <Card className="button-navigation">
                    <MenuBookIcon/>
                    <h3>Bài viết</h3>
                </Card>
            </div>
        </div>
    )
}