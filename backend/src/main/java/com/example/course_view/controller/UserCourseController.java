package com.example.course_view.controller;

import com.example.course_view.models.User;
import com.example.course_view.models.UserCourse;
import com.example.course_view.payload.request.UserCourseRequest;
import com.example.course_view.services.impl.UserCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usercourse")
@CrossOrigin(origins = "http://localhost:3000")
public class UserCourseController {
    @Autowired
    private UserCourseService userCourseService;

    @PostMapping
    UserCourse addStudent(@RequestBody UserCourseRequest request) {
        return userCourseService.addStudentCourse(request);
    }

    @DeleteMapping
    String deleteStudent(@RequestBody UserCourseRequest request) {
        boolean check = userCourseService.deleteStudentCourse(request);
        if (check) return "Da xoa hoc vien khoi khoa";
        return "Co loi xay ra";
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<List<User>> getStudentsByCourse(@PathVariable Long courseId) {
        List<User> students = userCourseService.getStudentsInCourse(courseId);

        if (students.isEmpty()) {
            return ResponseEntity.noContent().build(); // Trả về 204 nếu list rỗng
        }
        return ResponseEntity.ok(students); // Trả về 200 kèm danh sách
    }

}

