import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


export default function KhoaInfo({course}) {
    const navigate = useNavigate();

    const gotoChapter = () => {
        navigate("/chapter", {state:{course}});
    }

    return (
       <div className='course-info'>
            <div>
                <h1>{course['title']}</h1>
                <div>
                    <p>Giáo viên:.............</p>
                    <p>Số bài học:.......</p>
                </div>
            </div>
            <div className='course-info-button'>
                <Button variant='contained'>Xóa</Button>
                <Button variant="contained" onClick={gotoChapter}>Xem chi tiết</Button>
            </div>
       </div>
    );
}