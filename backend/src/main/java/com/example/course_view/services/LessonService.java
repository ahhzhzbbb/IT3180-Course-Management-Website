package com.example.course_view.services;

import com.example.course_view.payload.dto.LessonDTO;
import com.example.course_view.payload.request.LessonRequest;

public interface LessonService {
    LessonDTO createLesson(Long chapterId, LessonRequest lessonRequest);

    LessonDTO deleteLesson(Long lessonId);

    LessonDTO updateLesson(Long lessonId, LessonRequest lessonRequest);
}