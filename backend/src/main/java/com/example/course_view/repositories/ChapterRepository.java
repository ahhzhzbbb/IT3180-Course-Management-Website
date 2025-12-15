package com.example.course_view.repositories;

import com.example.course_view.models.Chapter;
import com.example.course_view.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    List<Chapter> findByCourse(Course course);
}