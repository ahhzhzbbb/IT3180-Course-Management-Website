package com.example.coure_view.services;

import com.example.coure_view.payload.CourseDTO;
import com.example.coure_view.payload.CourseResponse;
import org.springframework.http.ResponseEntity;

public interface CourseService {
    CourseResponse getAllCourses();

    CourseDTO createCourse(CourseDTO courseDTO);

    CourseDTO deleteCourse(Long courseId);
}
