package com.example.course_view.services;

import com.example.course_view.payload.response.CourseResponse;
import org.springframework.security.core.Authentication;

public interface UserResourceService {
    CourseResponse getMyCourses(Authentication authentication);
    boolean canAccessCourse(Long courseId, Authentication authentication);
}
