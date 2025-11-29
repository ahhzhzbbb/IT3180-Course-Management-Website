package com.example.coure_view.services.impl;

import com.example.coure_view.models.Course;
import com.example.coure_view.payload.dto.CourseDTO;
import com.example.coure_view.payload.response.CourseResponse;
import com.example.coure_view.repositories.CourseRepository;
import com.example.coure_view.services.CourseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<CourseDTO> courseDTOs = courses.stream()
                .map(course -> modelMapper.map(course, CourseDTO.class))
                .toList();
        CourseResponse courseResponse = new CourseResponse();
        courseResponse.setContent(courseDTOs);
        return courseResponse;
    }

    @Override
    public CourseDTO createCourse(CourseDTO courseDTO) {
        Course newCourse = modelMapper.map(courseDTO, Course.class);
        Course addedCourse = courseRepository.save(newCourse);
        return modelMapper.map(addedCourse, CourseDTO.class);
    }

    @Override
    public CourseDTO deleteCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                    .orElseThrow(RuntimeException::new);
        courseRepository.delete(course);
        return modelMapper.map(course, CourseDTO.class);
    }


}
