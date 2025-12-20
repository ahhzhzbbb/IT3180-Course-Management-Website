package com.example.course_view.services.impl;

import com.example.course_view.models.AppRole;
import com.example.course_view.models.Course;
import com.example.course_view.models.Role;
import com.example.course_view.models.User;
import com.example.course_view.repositories.CourseInstructorRepository;
import com.example.course_view.repositories.CourseRepository;
import com.example.course_view.repositories.CourseStudentRepository;
import com.example.course_view.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class  UserResourceServiceImplTest {

    @Mock
    private CourseRepository courseRepository;
    @Mock private CourseStudentRepository courseStudentRepository;
    @Mock private CourseInstructorRepository courseInstructorRepository;
    @Mock private UserRepository userRepository;
    @Mock private Authentication authentication;

    @InjectMocks
    private UserResourceServiceImpl userResourceService;

    @Test
    void canAccessCourse_Student_Enrolled_ReturnsTrue() {
        // Arrange
        User student = new User();
        student.setRoles(Set.of(new Role(AppRole.ROLE_USER)));

        Course course = new Course();
        course.setId(1L);

        when(authentication.getName()).thenReturn("studentUser");
        when(userRepository.findByUsername("studentUser")).thenReturn(Optional.of(student));
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));

        // Key: The repository says "Yes, this student is in this course"
        when(courseStudentRepository.existsByCourseAndStudent(course, student)).thenReturn(true);

        // Act
        boolean result = userResourceService.canAccessCourse(1L, authentication);

        // Assert
        assertTrue(result);
    }

    @Test
    void canAccessCourse_Student_NotEnrolled_ReturnsFalse() {
        // Arrange
        User student = new User();
        student.setRoles(Set.of(new Role(AppRole.ROLE_USER)));
        Course course = new Course();

        when(authentication.getName()).thenReturn("studentUser");
        when(userRepository.findByUsername("studentUser")).thenReturn(Optional.of(student));
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));

        // Key: The repository says "No"
        when(courseStudentRepository.existsByCourseAndStudent(course, student)).thenReturn(false);

        // Act
        boolean result = userResourceService.canAccessCourse(1L, authentication);

        // Assert
        assertFalse(result);
    }
}