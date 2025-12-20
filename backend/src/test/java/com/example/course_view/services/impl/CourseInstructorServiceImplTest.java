package com.example.course_view.services.impl;

import com.example.course_view.models.*;
import com.example.course_view.payload.dto.CourseInstructorDTO;
import com.example.course_view.repositories.CourseInstructorRepository;
import com.example.course_view.repositories.CourseRepository;
import com.example.course_view.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseInstructorServiceImplTest {

    @Mock private CourseRepository courseRepository;
    @Mock private UserRepository userRepository;
    @Mock private CourseInstructorRepository courseInstructorRepository;
    @Mock private ModelMapper modelMapper;

    @InjectMocks
    private CourseInstructorServiceImpl courseInstructorService;

    private Course course;
    private User instructorUser;
    private User regularUser;

    @BeforeEach
    void setUp() {
        course = new Course();
        course.setId(1L);

        // Instructor User
        Role instRole = new Role(AppRole.ROLE_INSTRUCTOR);
        instructorUser = new User();
        instructorUser.setUserId(50L);
        instructorUser.setRoles(Set.of(instRole));

        // Regular User
        Role userRole = new Role(AppRole.ROLE_USER);
        regularUser = new User();
        regularUser.setUserId(60L);
        regularUser.setRoles(Set.of(userRole));
    }

    @Test
    void addInstructorToCourse_Success() {
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));
        when(userRepository.findById(50L)).thenReturn(Optional.of(instructorUser));
        when(courseInstructorRepository.existsByCourseAndInstructor(course, instructorUser)).thenReturn(false);

        CourseInstructor savedEntity = new CourseInstructor();
        when(courseInstructorRepository.save(any(CourseInstructor.class))).thenReturn(savedEntity);
        when(modelMapper.map(savedEntity, CourseInstructorDTO.class)).thenReturn(new CourseInstructorDTO());

        CourseInstructorDTO result = courseInstructorService.addInstructorToCourse(1L, 50L);

        assertNotNull(result);
        verify(courseInstructorRepository).save(any(CourseInstructor.class));
    }

    @Test
    void addInstructorToCourse_Fail_UserNotInstructor() {
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));
        when(userRepository.findById(60L)).thenReturn(Optional.of(regularUser));

        IllegalStateException ex = assertThrows(IllegalStateException.class, () -> {
            courseInstructorService.addInstructorToCourse(1L, 60L);
        });

        assertEquals("User is not an instructor", ex.getMessage());
    }
}