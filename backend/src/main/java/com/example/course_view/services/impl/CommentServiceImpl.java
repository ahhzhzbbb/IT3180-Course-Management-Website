package com.example.course_view.services.impl;

import com.example.course_view.models.Comment;
import com.example.course_view.models.Lesson;
import com.example.course_view.models.User;
import com.example.course_view.payload.dto.CommentDTO;
import com.example.course_view.payload.request.CommentRequest;
import com.example.course_view.payload.response.CommentResponse;
import com.example.course_view.repositories.CommentRepository;
import com.example.course_view.repositories.LessonRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.services.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CommentDTO createComment(CommentRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Lesson lesson = lessonRepository.findById(request.getLessonId())
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        Comment comment = new Comment();
        comment.setContent(request.getContent());
        comment.setUser(user);
        comment.setLesson(lesson);

        Comment savedComment = commentRepository.save(comment);
        return modelMapper.map(savedComment, CommentDTO.class);
    }


    @Override
    public CommentResponse getCommentsByLesson(Long lessonId) {
        List<Comment> comments = commentRepository.findAllByLessonId(lessonId);
        List<CommentDTO> commentDTOS = comments.stream()
                .map(comment -> modelMapper.map(comment, CommentDTO.class))
                .toList();
        CommentResponse response = new CommentResponse(true, "tra ve danh sach cac comment", commentDTOS);
        return response;

    }
}
