package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.AppRole;
import com.example.course_view.models.Course;
import com.example.course_view.models.CourseInstructor;
import com.example.course_view.models.User;
import com.example.course_view.payload.dto.CourseInstructorDTO;
import com.example.course_view.payload.dto.CourseListDTO;
import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.payload.response.UserResponse;
import com.example.course_view.repositories.CourseInstructorRepository;
import com.example.course_view.repositories.CourseRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.services.CourseInstructorService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseInstructorServiceImpl implements CourseInstructorService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseInstructorRepository courseInstructorRepository;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public CourseInstructorDTO addInstructorToCourse(Long courseId, Long instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor", "id", instructorId));
        if (!instructor.isInstructor()) {
            throw new IllegalStateException("User is not an instructor");
        }
        if (courseInstructorRepository.existsByCourseAndInstructor(course, instructor)) {
            throw new IllegalStateException("Instructor already assigned to this course");
        }
        CourseInstructor courseInstructor = new CourseInstructor();
        courseInstructor.setCourse(course);
        courseInstructor.setInstructor(instructor);
        CourseInstructor savedCourseInstructor = courseInstructorRepository.save(courseInstructor);
        return modelMapper.map(savedCourseInstructor, CourseInstructorDTO.class);
    }

    @Transactional
    @Override
    public CourseInstructorDTO deleteInstructorFromCourse(Long courseId, Long instructorId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor", "id", instructorId));
        CourseInstructor courseInstructor = courseInstructorRepository.findByCourseAndInstructor(course, instructor);
        courseInstructorRepository.delete(courseInstructor);
        return modelMapper.map(courseInstructor, CourseInstructorDTO.class);
    }

    @Override
    public UserResponse getAllInstructorsFromCourse(Long courseId, Integer pageNumber, Integer pageSize) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "Id", courseId));
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize);
        Page<CourseInstructor> courseInstructorPage = courseInstructorRepository.findByCourse(course, pageDetails);
        List<UserDTO> userDTOS = courseInstructorPage.getContent().stream()
                .map(courseInstructor -> modelMapper.map(courseInstructor.getInstructor(), UserDTO.class))
                .toList();
        UserResponse userResponse = new UserResponse();
        userResponse.setUsers(userDTOS);
        userResponse.setPageNumber(courseInstructorPage.getNumber());
        userResponse.setPageSize(courseInstructorPage.getSize());
        userResponse.setTotalElements(courseInstructorPage.getTotalElements());
        userResponse.setTotalPages(courseInstructorPage.getTotalPages());
        userResponse.setLastPage(courseInstructorPage.isLast());
        return userResponse;
    }






    @Override
    public CourseResponse getAllCoursesFromInstructor(Long instructorId) {
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor", "id", instructorId));
        List<CourseInstructor> courseInstructors = courseInstructorRepository.findByInstructor(instructor);
        List<CourseListDTO>  courseListDTOS = courseInstructors.stream()
                .map(courseStudent -> modelMapper.map(courseStudent.getCourse(), CourseListDTO.class))
                .toList();
        return new CourseResponse(courseListDTOS);
    }

}
