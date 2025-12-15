package com.example.course_view.services;

import com.example.course_view.payload.dto.CommentDTO;
import com.example.course_view.payload.request.CommentRequest;
import com.example.course_view.payload.response.CommentResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {

    CommentDTO createComment(CommentRequest request);

    CommentResponse getCommentsByLesson(Long lessonId);
}
