package com.example.course_view.repositories;

import com.example.course_view.models.User;
import com.example.course_view.models.UserCourse;
import com.example.course_view.models.UserCourseId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserCourseRepository extends JpaRepository<UserCourse, UserCourseId> {
    @Query("SELECT uc.user FROM UserCourse uc WHERE uc.id.courseId = :courseId")
    List<User> findUsersByCourseId(@Param("courseId") Long courseId);
}
