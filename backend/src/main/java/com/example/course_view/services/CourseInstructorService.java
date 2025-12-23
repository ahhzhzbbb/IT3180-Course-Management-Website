package com.example.course_view.services;

import com.example.course_view.payload.dto.CourseInstructorDTO;
import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.payload.response.UserResponse;

public interface CourseInstructorService {
    CourseInstructorDTO addInstructorToCourse(Long courseId, Long instructorId);

    CourseInstructorDTO deleteInstructorFromCourse(Long courseId, Long instructorId);

    UserResponse getAllInstructorsFromCourse(Long courseId, Integer pageNumber, Integer pageSize);

    CourseResponse getAllCoursesFromInstructor(Long instructorId);
}
