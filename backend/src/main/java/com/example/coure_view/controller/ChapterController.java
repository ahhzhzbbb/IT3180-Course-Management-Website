package com.example.coure_view.controller;

import com.example.coure_view.payload.dto.ChapterDTO;
import com.example.coure_view.payload.request.ChapterRequest;
import com.example.coure_view.services.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ChapterController {
    @Autowired
    private ChapterService chapterService;

    @PostMapping("/courses/{courseId}/chapters")
    public ResponseEntity<ChapterDTO> createChapter(@PathVariable Long courseId, @RequestBody ChapterRequest chapterRequest) {
        ChapterDTO chapterDTO = chapterService.createChapter(courseId, chapterRequest);
        return new ResponseEntity<>(chapterDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("chapters/{chapterId}")
    public ResponseEntity<ChapterDTO> deleteChapter(@PathVariable Long chapterId) {
        ChapterDTO chapterDTO = chapterService.deleteChapter(chapterId);
        return new ResponseEntity<>(chapterDTO, HttpStatus.OK);
    }

    @PutMapping("chapters/{chapterId}")
    public ResponseEntity<ChapterDTO> updateChapter(@PathVariable Long chapterId, @RequestBody ChapterRequest chapterRequest) {
        ChapterDTO chapterDTO = chapterService.updateChapter(chapterId, chapterRequest);
        return new ResponseEntity<>(chapterDTO, HttpStatus.OK);
    }
}
