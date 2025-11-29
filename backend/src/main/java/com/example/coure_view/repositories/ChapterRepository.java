package com.example.coure_view.repositories;

import com.example.coure_view.models.Chapter;
import com.example.coure_view.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    List<Chapter> findByCourse(Course course);
}
