package com.example.coure_view.services;

import com.example.coure_view.payload.dto.CourseDTO;
import com.example.coure_view.payload.request.CourseRequest;
import com.example.coure_view.payload.response.CourseResponse;

public interface CourseService {
    CourseResponse getAllCourses();

    CourseDTO createCourse(CourseDTO courseDTO);

    CourseDTO deleteCourse(Long courseId);

    CourseDTO getCourseById(Long courseId);

    CourseDTO updateCourse(Long courseId, CourseRequest courseRequest);
}
