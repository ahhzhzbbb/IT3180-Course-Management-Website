package com.example.course_view.controller;

import com.example.course_view.payload.dto.CommentDTO;
import com.example.course_view.payload.request.CommentRequest;
import com.example.course_view.payload.response.CommentResponse;
import com.example.course_view.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/public/comment")
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentRequest commentRequest) {
        CommentDTO addedComment = commentService.createComment(commentRequest);
        return ResponseEntity.ok(addedComment);
    }

    @GetMapping("/public/comments/{lessonId}")
    public ResponseEntity<CommentResponse> getCommentsByLesson(@PathVariable("lessonId") Long lessonId) {
        CommentResponse commentResponse = commentService.getCommentsByLesson(lessonId);
        return ResponseEntity.ok(commentResponse);
    }
}
