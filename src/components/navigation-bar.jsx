import { Card } from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Navigation() {
    return (
        <div className="navigation">
            <div >
                <Card className="button-navigation">
                    <HomeIcon />

                    <h3>Trang chủ</h3>
                </Card>
            </div>

            {/* <div>
                <Card className="button-navigation">
                    <MenuBookIcon/>
                    <h3>Bài viết</h3>
                </Card>
            </div> */}

            <div>
                <Card className="button-navigation">
                    <DeleteIcon/>
                    <h3>Thùng rác</h3>
                </Card>
            </div>

            <div>
                <Card className="button-navigation">
                    <SettingsIcon/>
                    <h3>Cài đặt</h3>
                </Card>
            </div>
        </div>
    )
}