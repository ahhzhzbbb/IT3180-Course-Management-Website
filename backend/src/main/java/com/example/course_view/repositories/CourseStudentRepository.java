package com.example.course_view.repositories;

import com.example.course_view.models.Course;
import com.example.course_view.models.CourseStudent;
import com.example.course_view.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {
    boolean existsByCourseAndStudent(Course course, User student);

    List<CourseStudent> findByCourse(Course course);

    CourseStudent findByCourseAndStudent(Course course, User student);

    List<CourseStudent> findByStudent(User student);
}
