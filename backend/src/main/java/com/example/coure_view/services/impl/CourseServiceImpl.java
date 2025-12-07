package com.example.coure_view.services.impl;

import com.example.coure_view.exceptions.ResourceNotFoundException;
import com.example.coure_view.models.Course;
import com.example.coure_view.payload.dto.CourseDTO;
import com.example.coure_view.payload.dto.CourseListDTO;
import com.example.coure_view.payload.request.CourseRequest;
import com.example.coure_view.payload.response.CourseResponse;
import com.example.coure_view.repositories.CourseRepository;
import com.example.coure_view.services.CourseService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
    // test
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CourseResponse getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        List<CourseListDTO> courseListDTOs = courses.stream()
                .map(course -> modelMapper.map(course, CourseListDTO.class))
                .toList();
        CourseResponse courseResponse = new CourseResponse();
        courseResponse.setCourses(courseListDTOs);
        return courseResponse;
    }

    @Override
    public CourseDTO createCourse(CourseDTO courseDTO) {
        Course newCourse = modelMapper.map(courseDTO, Course.class);
        Course addedCourse = courseRepository.save(newCourse);
        return modelMapper.map(addedCourse, CourseDTO.class);
    }

    @Transactional
    @Override
    public CourseDTO deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        courseRepository.delete(course);
        return modelMapper.map(course, CourseDTO.class);
    }

    @Override
    public CourseDTO getCourseById(Long courseId) {
        Course course =  courseRepository.findById(courseId)
                    .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        return modelMapper.map(course, CourseDTO.class);
    }

    @Transactional
    @Override
    public CourseDTO updateCourse(Long courseId, CourseRequest courseRequest) {
        Course existingCourse =  courseRepository.findById(courseId)
                    .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        modelMapper.map(courseRequest, existingCourse);
        Course updatedCourse = courseRepository.save(existingCourse);
        return modelMapper.map(updatedCourse, CourseDTO.class);
    }


}
