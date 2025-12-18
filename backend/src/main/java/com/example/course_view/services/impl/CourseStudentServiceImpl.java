package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.Course;
import com.example.course_view.models.CourseStudent;
import com.example.course_view.models.User;
import com.example.course_view.payload.dto.CourseListDTO;
import com.example.course_view.payload.dto.CourseStudentDTO;
import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.payload.response.UserResponse;
import com.example.course_view.repositories.CourseRepository;
import com.example.course_view.repositories.CourseStudentRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.services.CourseStudentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseStudentServiceImpl implements CourseStudentService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseStudentRepository courseStudentRepository;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public CourseStudentDTO addStudentToCourse(Long courseId, Long studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));
        if (!student.isStudent()) {
            throw new IllegalStateException("User is not a student");
        }
        if (courseStudentRepository.existsByCourseAndStudent(course, student)) {
            throw new IllegalStateException("Student already enrolled this course");
        }
        CourseStudent courseStudent = new CourseStudent();
        courseStudent.setCourse(course);
        courseStudent.setStudent(student);
        CourseStudent savedCourseStudent = courseStudentRepository.save(courseStudent);
        return modelMapper.map(savedCourseStudent, CourseStudentDTO.class);
    }

    @Transactional
    @Override
    public CourseStudentDTO deleteStudentFromCourse(Long courseId, Long studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));
        CourseStudent courseStudent = courseStudentRepository.findByCourseAndStudent(course, student);
        courseStudentRepository.delete(courseStudent);
        return modelMapper.map(courseStudent, CourseStudentDTO.class);
    }

    @Override
    public UserResponse getAllStudentsFromCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "Id", courseId));
        List<CourseStudent> courseStudents = courseStudentRepository.findByCourse(course);
        List<UserDTO> userDTOS = courseStudents.stream()
                .map(courseStudent -> modelMapper.map(courseStudent.getStudent(), UserDTO.class))
                .toList();
        return new UserResponse(userDTOS);
    }

    @Override
    public CourseResponse getAllCoursesFromStudent(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));
        List<CourseStudent> courseStudents = courseStudentRepository.findByStudent(student);
        List<CourseListDTO>  courseListDTOS = courseStudents.stream()
                .map(courseStudent -> modelMapper.map(courseStudent.getCourse(), CourseListDTO.class))
                .toList();
        return new CourseResponse(courseListDTOS);
    }

}
