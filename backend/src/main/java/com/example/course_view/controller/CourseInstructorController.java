package com.example.course_view.controller;

import com.example.course_view.payload.dto.CourseInstructorDTO;
import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.payload.response.UserResponse;
import com.example.course_view.services.CourseInstructorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CourseInstructorController {

    private final CourseInstructorService courseInstructorService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/courses/{courseId}/instructors/{instructorId}")
    public ResponseEntity<CourseInstructorDTO> addInstructorToCourse(@PathVariable Long courseId, @PathVariable Long instructorId) {
        CourseInstructorDTO courseInstructorDTO = courseInstructorService.addInstructorToCourse(courseId, instructorId);
        return new ResponseEntity<>(courseInstructorDTO, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/courses/{courseId}/instructors/{instructorId}")
    public ResponseEntity<CourseInstructorDTO> deleteInstructorFromCourse(@PathVariable Long courseId, @PathVariable Long instructorId) {
        CourseInstructorDTO courseInstructorDTO = courseInstructorService.deleteInstructorFromCourse(courseId, instructorId);
        return new ResponseEntity<>(courseInstructorDTO, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'INSTRUCTOR')")
    @GetMapping("/courses/{courseId}/instructors")
    public ResponseEntity<UserResponse> getAllInstructorFromCourse(@PathVariable Long courseId) {
        UserResponse userResponse = courseInstructorService.getAllInstructorsFromCourse(courseId);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @GetMapping("/instructors/{instructorId}/courses")
    public ResponseEntity<CourseResponse> getAllCoursesFromStudent(@PathVariable Long instructorId) {
        CourseResponse courseResponse = courseInstructorService.getAllCoursesFromInstructor(instructorId);
        return new ResponseEntity<>(courseResponse, HttpStatus.OK);
    }
}






