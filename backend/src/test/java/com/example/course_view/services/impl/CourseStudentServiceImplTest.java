package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.*;
import com.example.course_view.payload.dto.CourseStudentDTO;
import com.example.course_view.repositories.CourseRepository;
import com.example.course_view.repositories.CourseStudentRepository;
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
class CourseStudentServiceImplTest {

    @Mock private CourseRepository courseRepository;
    @Mock private UserRepository userRepository;
    @Mock private CourseStudentRepository courseStudentRepository;
    @Mock private ModelMapper modelMapper;

    @InjectMocks
    private CourseStudentServiceImpl courseStudentService;

    private Course course;
    private User studentUser;
    private User nonStudentUser;

    @BeforeEach
    void setUp() {
        course = new Course();
        course.setId(1L);
        course.setTitle("Intro to Java");

        // Create a valid Student
        Role studentRole = new Role(AppRole.ROLE_USER);
        studentUser = new User();
        studentUser.setUserId(10L);
        studentUser.setUsername("student1");
        studentUser.setRoles(Set.of(studentRole));

        // Create a User WITHOUT Student role
        Role adminRole = new Role(AppRole.ROLE_ADMIN);
        nonStudentUser = new User();
        nonStudentUser.setUserId(20L);
        nonStudentUser.setUsername("admin1");
        nonStudentUser.setRoles(Set.of(adminRole));
    }

    @Test
    void addStudentToCourse_Success() {
        // Arrange
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));
        when(userRepository.findById(10L)).thenReturn(Optional.of(studentUser));
        when(courseStudentRepository.existsByCourseAndStudent(course, studentUser)).thenReturn(false);

        CourseStudent savedEntity = new CourseStudent();
        savedEntity.setCourse(course);
        savedEntity.setStudent(studentUser);

        when(courseStudentRepository.save(any(CourseStudent.class))).thenReturn(savedEntity);
        when(modelMapper.map(savedEntity, CourseStudentDTO.class)).thenReturn(new CourseStudentDTO());

        // Act
        CourseStudentDTO result = courseStudentService.addStudentToCourse(1L, 10L);

        // Assert
        assertNotNull(result);
        verify(courseStudentRepository).save(any(CourseStudent.class));
    }

    @Test
    void addStudentToCourse_Fail_UserNotStudent() {
        // Arrange
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));
        when(userRepository.findById(20L)).thenReturn(Optional.of(nonStudentUser));

        // Act & Assert
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            courseStudentService.addStudentToCourse(1L, 20L);
        });

        assertEquals("User is not a student", exception.getMessage());
        verify(courseStudentRepository, never()).save(any());
    }

    @Test
    void addStudentToCourse_Fail_AlreadyEnrolled() {
        // Arrange
        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));
        when(userRepository.findById(10L)).thenReturn(Optional.of(studentUser));
        // Simulate existing enrollment
        when(courseStudentRepository.existsByCourseAndStudent(course, studentUser)).thenReturn(true);

        // Act & Assert
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            courseStudentService.addStudentToCourse(1L, 10L);
        });

        assertEquals("Student already enrolled this course", exception.getMessage());
        verify(courseStudentRepository, never()).save(any());
    }

    @Test
    void deleteStudentFromCourse_Success() {
        // Arrange
        CourseStudent link = new CourseStudent();
        link.setId(5L);
        link.setCourse(course);
        link.setStudent(studentUser);

        when(courseRepository.findById(1L)).thenReturn(Optional.of(course));
        when(userRepository.findById(10L)).thenReturn(Optional.of(studentUser));
        when(courseStudentRepository.findByCourseAndStudent(course, studentUser)).thenReturn(link);
        when(modelMapper.map(link, CourseStudentDTO.class)).thenReturn(new CourseStudentDTO());

        // Act
        courseStudentService.deleteStudentFromCourse(1L, 10L);

        // Assert
        verify(courseStudentRepository).delete(link);
    }
}