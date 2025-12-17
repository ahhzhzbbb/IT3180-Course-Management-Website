package com.example.course_view.controller;

import com.example.course_view.payload.dto.ChapterDTO;
import com.example.course_view.payload.request.ChapterRequest;
import com.example.course_view.services.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ChapterController {
    @Autowired
    private ChapterService chapterService;

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/courses/{courseId}/chapters")
    public ResponseEntity<ChapterDTO> createChapter(@PathVariable Long courseId, @RequestBody ChapterRequest chapterRequest) {
        ChapterDTO chapterDTO = chapterService.createChapter(courseId, chapterRequest);
        return new ResponseEntity<>(chapterDTO, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @DeleteMapping("chapters/{chapterId}")
    public ResponseEntity<ChapterDTO> deleteChapter(@PathVariable Long chapterId) {
        ChapterDTO chapterDTO = chapterService.deleteChapter(chapterId);
        return new ResponseEntity<>(chapterDTO, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PutMapping("chapters/{chapterId}")
    public ResponseEntity<ChapterDTO> updateChapter(@PathVariable Long chapterId, @RequestBody ChapterRequest chapterRequest) {
        ChapterDTO chapterDTO = chapterService.updateChapter(chapterId, chapterRequest);
        return new ResponseEntity<>(chapterDTO, HttpStatus.OK);
    }
}