package com.example.course_view.controller;

import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.security.services.UserDetailsImpl;
import com.example.course_view.services.CourseInstructorService;
import com.example.course_view.services.CourseStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserResourceController {

    private final CourseInstructorService courseInstructorService;
    private final CourseStudentService courseStudentService;

    @PreAuthorize("hasAnyRole('USER','INSTRUCTOR')")
    @GetMapping("/me/courses")
    public ResponseEntity<CourseResponse> getMyCourses(Authentication authentication) {

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        CourseResponse response;

        if (userDetails.hasRole("INSTRUCTOR")) {
            response = courseInstructorService.getAllCoursesFromInstructor(userId);
        } else {
            response = courseStudentService.getAllCoursesFromStudent(userId);
        }

        return ResponseEntity.ok(response);
    }
}
