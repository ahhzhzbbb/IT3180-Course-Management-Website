package com.example.course_view.controller;

import com.example.course_view.payload.dto.CourseStudentDTO;
import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.payload.response.UserResponse;
import com.example.course_view.services.CourseStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CourseStudentController {

    private final CourseStudentService courseStudentService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/courses/{courseId}/students/{studentId}")
    public ResponseEntity<CourseStudentDTO> addStudentToCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        CourseStudentDTO courseStudentDTO = courseStudentService.addStudentToCourse(courseId, studentId);
        return new ResponseEntity<>(courseStudentDTO, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/courses/{courseId}/students/{studentId}")
    public ResponseEntity<CourseStudentDTO> deleteStudentFromCourse(@PathVariable Long courseId, @PathVariable Long studentId) {
        CourseStudentDTO courseStudentDTO = courseStudentService.deleteStudentFromCourse(courseId, studentId);
        return new ResponseEntity<>(courseStudentDTO, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    @GetMapping("/courses/{courseId}/students")
    public ResponseEntity<UserResponse> getAllStudentsFromCourse(@PathVariable Long courseId) {
        UserResponse userResponse = courseStudentService.getAllStudentsFromCourse(courseId);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @GetMapping("/students/{studentId}/courses")
    public ResponseEntity<CourseResponse> getAllCoursesFromStudent(@PathVariable Long studentId) {
        CourseResponse courseResponse = courseStudentService.getAllCoursesFromStudent(studentId);
        return new ResponseEntity<>(courseResponse, HttpStatus.OK);
    }

}
