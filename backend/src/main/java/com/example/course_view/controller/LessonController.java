package com.example.course_view.controller;

import com.example.course_view.payload.dto.LessonDTO;
import com.example.course_view.payload.request.LessonRequest;
import com.example.course_view.services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LessonController {
    @Autowired
    private LessonService lessonService;

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/chapters/{chapterId}/lessons")
    public ResponseEntity<LessonDTO> createLesson(@PathVariable Long chapterId, @RequestBody LessonRequest lessonRequest) {
        LessonDTO lessonDTO = lessonService.createLesson(chapterId, lessonRequest);
        return new ResponseEntity<>(lessonDTO, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @DeleteMapping("/lessons/{lessonId}")
    public ResponseEntity<LessonDTO> deleteLesson(@PathVariable Long lessonId) {
        LessonDTO lessonDTO = lessonService.deleteLesson(lessonId);
        return new ResponseEntity<>(lessonDTO, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PutMapping("/lessons/{lessonId}")
    public ResponseEntity<LessonDTO>  updateLesson(@PathVariable Long lessonId, @RequestBody LessonRequest lessonRequest) {
        LessonDTO lessonDTO = lessonService.updateLesson(lessonId, lessonRequest);
        return new ResponseEntity<>(lessonDTO, HttpStatus.OK);
    }
}