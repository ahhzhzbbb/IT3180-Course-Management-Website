import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

export default function Navigation() {
    return (
        <nav className="navigation nav-rail" aria-label="Sidebar">
            <button type="button" className="nav-item" aria-current="page">
                <span className="nav-icon"><HomeRoundedIcon fontSize="inherit"/></span>
                <span className="nav-label">Trang chủ</span>
            </button>

            <button type="button" className="nav-item">
                <span className="nav-icon"><ArticleRoundedIcon fontSize="inherit"/></span>
                <span className="nav-label">Bài viết</span>
            </button>
        </nav>
    );
}