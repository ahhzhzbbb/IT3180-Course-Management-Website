package com.example.coure_view.controller;

import com.example.coure_view.payload.dto.CourseDTO;
import com.example.coure_view.payload.response.CourseResponse;
import com.example.coure_view.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/public/courses")
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {
        CourseDTO addedCourseDTO = courseService.createCourse(courseDTO);
        return new ResponseEntity<>(addedCourseDTO, HttpStatus.CREATED);
    }
    @GetMapping("/public/courses")
    public ResponseEntity<CourseResponse> getAllCourses(){
        CourseResponse courseResponse = courseService.getAllCourses();
        return ResponseEntity.ok().body(courseResponse);
    }
    @DeleteMapping("/public/courses/{courseId}")
    public ResponseEntity<CourseDTO> deleteCourse(@PathVariable("courseId") Long courseId){
        CourseDTO courseDTO = courseService.deleteCourse(courseId);
        return ResponseEntity.ok().body(courseDTO);
    }
}
