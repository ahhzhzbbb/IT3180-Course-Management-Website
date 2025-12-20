package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.Course;
import com.example.course_view.models.CourseInstructor;
import com.example.course_view.models.CourseStudent;
import com.example.course_view.models.User;
import com.example.course_view.payload.dto.CourseListDTO;
import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.repositories.CourseInstructorRepository;
import com.example.course_view.repositories.CourseRepository;
import com.example.course_view.repositories.CourseStudentRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.security.services.UserDetailsImpl;
import com.example.course_view.services.UserResourceService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userResource")
@RequiredArgsConstructor
public class UserResourceServiceImpl implements UserResourceService {
    private final CourseRepository courseRepository;
    private final CourseStudentRepository courseStudentRepository;
    private final CourseInstructorRepository courseInstructorRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    public CourseResponse getMyCourses(Authentication authentication) {

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();
        CourseResponse response = new CourseResponse();
        if (userDetails.hasRole("INSTRUCTOR")) {
            User instructor = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Instructor", "id", userId));
            List<CourseInstructor> courseInstructors = courseInstructorRepository.findByInstructor(instructor);
            List<CourseListDTO>  courseListDTOS = courseInstructors.stream()
                    .map(courseStudent -> modelMapper.map(courseStudent.getCourse(), CourseListDTO.class))
                    .toList();
            return new CourseResponse(courseListDTOS);
        } else if (userDetails.hasRole("USER")) {
            User student = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("Student", "id", userId));
            List<CourseStudent> courseStudents = courseStudentRepository.findByStudent(student);
            List<CourseListDTO>  courseListDTOS = courseStudents.stream()
                    .map(courseStudent -> modelMapper.map(courseStudent.getCourse(), CourseListDTO.class))
                    .toList();
            return new CourseResponse(courseListDTOS);
        }

        return response;
    }

    public boolean canAccessCourse(Long courseId, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return false;
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
//        if (user.isAdmin()) return true;

        if (user.isInstructor()) {
            return courseInstructorRepository
                    .existsByCourseAndInstructor(course, user);
        }

        if (user.isStudent()) {
            return courseStudentRepository
                    .existsByCourseAndStudent(course, user);
        }

        return false;
    }

    public boolean canUpdateUser(Long targetUserId, Authentication authentication) {
        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return false;
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", "username"));

        if (currentUser.isAdmin()) {
            return true;
        }

        return currentUser.getUserId().equals(targetUserId);
    }
}
