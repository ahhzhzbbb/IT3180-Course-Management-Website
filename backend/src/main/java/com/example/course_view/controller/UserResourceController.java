package com.example.course_view.controller;

import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.security.services.UserDetailsImpl;
import com.example.course_view.services.CourseInstructorService;
import com.example.course_view.services.CourseStudentService;
import com.example.course_view.services.UserResourceService;
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
    private final UserResourceService userResourceService;

    @PreAuthorize("hasAnyRole('USER','INSTRUCTOR')")
    @GetMapping("/me/courses")
    public ResponseEntity<CourseResponse> getMyCourses(Authentication authentication) {
        CourseResponse response = userResourceService.getMyCourses(authentication);
        return ResponseEntity.ok(response);
    }


}
