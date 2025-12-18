package com.example.course_view.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCourse {
    @EmbeddedId
    private UserCourseId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")   // ánh xạ userId trong UserCourseId
    @JoinColumn(name = "userid")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("courseId") // ánh xạ courseId trong UserCourseId
    @JoinColumn(name = "courseid")
    private Course course;

    private LocalDate dayAdd = LocalDate.now();
}
