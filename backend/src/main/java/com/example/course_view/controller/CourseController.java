package com.example.course_view.controller;

import com.example.course_view.payload.dto.CourseDTO;
import com.example.course_view.payload.request.CourseRequest;
import com.example.course_view.payload.response.CourseResponse;
import com.example.course_view.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/courses")
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {
        CourseDTO addedCourseDTO = courseService.createCourse(courseDTO);
        return new ResponseEntity<>(addedCourseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/courses")
    public ResponseEntity<CourseResponse> getAllCourses(){
        CourseResponse courseResponse = courseService.getAllCourses();
        return ResponseEntity.ok().body(courseResponse);
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable("courseId") Long courseId){
        CourseDTO courseDTO = courseService.getCourseById(courseId);
        return ResponseEntity.ok().body(courseDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<CourseDTO> deleteCourse(@PathVariable("courseId") Long courseId){
        CourseDTO courseDTO = courseService.deleteCourse(courseId);
        return ResponseEntity.ok().body(courseDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/courses/{courseId}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable("courseId") Long courseId, @RequestBody CourseRequest courseRequest){
        CourseDTO courseDTO = courseService.updateCourse(courseId, courseRequest);
        return  ResponseEntity.ok().body(courseDTO);
    }
}