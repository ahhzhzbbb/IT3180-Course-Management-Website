package com.example.course_view.repositories;

import com.example.course_view.models.Course;
import com.example.course_view.models.CourseInstructor;
import com.example.course_view.models.CourseStudent;
import com.example.course_view.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseInstructorRepository extends JpaRepository<CourseInstructor, Long> {
    boolean existsByCourseAndInstructor(Course course, User instructor);

    CourseInstructor findByCourseAndInstructor(Course course, User instructor);

    List<CourseInstructor> findByCourse(Course course);

    List<CourseInstructor> findByInstructor(User instructor);
}
