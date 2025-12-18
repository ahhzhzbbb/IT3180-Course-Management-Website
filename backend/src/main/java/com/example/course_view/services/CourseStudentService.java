package com.example.course_view.services;

import com.example.course_view.payload.dto.CourseStudentDTO;
import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.payload.response.UserResponse;

public interface CourseStudentService {
    CourseStudentDTO addStudentToCourse(Long courseId, Long studentId);

    CourseStudentDTO deleteStudentFromCourse(Long courseId, Long studentId);

    UserResponse getAllStudentsFromCourse(Long courseId);

    CourseResponse getAllCoursesFromStudent(Long studentId);

}
