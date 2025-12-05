import React from 'react'
import {useState} from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import logo from "../asset/images/logo.jpg"
import AlertBeforeDel from "./allert/alert-before-del";


export default function KhoaInfo({course, setDeleteConfirmOpen}) {
    const navigate = useNavigate();

    const gotoChapter = () => {
        navigate("/chapter", {state:{course}});
    }

    return (
       <div className='course-info'>
            <div>
                <img src={logo} style={{width:'60px', height:'80px'}}/>
            </div>
            <div>
                <h1>{course['title']}</h1>
                <div>
                    <p>Giáo viên:.............</p>
                    <p>Số bài học:.......</p>
                </div>
            </div>
            <div className='course-info-button'>
                <Button variant='contained' onClick={() => setDeleteConfirmOpen(course['id'])}>Xóa</Button>
                <Button variant="contained" onClick={gotoChapter}>Xem chi tiết</Button>
            </div>
       </div>
    );
}