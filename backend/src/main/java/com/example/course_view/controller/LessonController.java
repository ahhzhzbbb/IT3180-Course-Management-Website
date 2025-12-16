package com.example.course_view.controller;

import com.example.course_view.payload.dto.LessonDTO;
import com.example.course_view.payload.request.LessonRequest;
import com.example.course_view.services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LessonController {
    @Autowired
    private LessonService lessonService;

    @PostMapping("/chapters/{chapterId}/lessons")
    public ResponseEntity<LessonDTO> createLesson(@PathVariable Long chapterId, @RequestBody LessonRequest lessonRequest) {
        LessonDTO lessonDTO = lessonService.createLesson(chapterId, lessonRequest);
        return new ResponseEntity<>(lessonDTO, HttpStatus.CREATED);
    }
    @DeleteMapping("/lessons/{lessonId}")
    public ResponseEntity<LessonDTO> deleteLesson(@PathVariable Long lessonId) {
        LessonDTO lessonDTO = lessonService.deleteLesson(lessonId);
        return new ResponseEntity<>(lessonDTO, HttpStatus.OK);
    }
    @PutMapping("/lessons/{lessonId}")
    public ResponseEntity<LessonDTO>  updateLesson(@PathVariable Long lessonId, @RequestBody LessonRequest lessonRequest) {
        LessonDTO lessonDTO = lessonService.updateLesson(lessonId, lessonRequest);
        return new ResponseEntity<>(lessonDTO, HttpStatus.OK);
    }
}