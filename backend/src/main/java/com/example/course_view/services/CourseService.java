package com.example.course_view.services;

import com.example.course_view.payload.dto.CourseDTO;
import com.example.course_view.payload.request.CourseRequest;
import com.example.course_view.payload.response.CourseResponse;

public interface CourseService {
    CourseResponse getAllCourses();

    CourseDTO createCourse(CourseRequest courseRequest);

    CourseDTO deleteCourse(Long courseId);

    CourseDTO getCourseById(Long courseId);

    CourseDTO updateCourse(Long courseId, CourseRequest courseRequest);
}