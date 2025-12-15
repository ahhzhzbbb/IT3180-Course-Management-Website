package com.example.course_view.repositories;

import com.example.course_view.models.Comment;
import com.example.course_view.models.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByLessonId(Long lessonId);
}
