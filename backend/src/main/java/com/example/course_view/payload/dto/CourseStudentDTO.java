package com.example.course_view.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CourseStudentDTO {
    private Long id;
    private Long courseId;
    private Long studentId;
}
