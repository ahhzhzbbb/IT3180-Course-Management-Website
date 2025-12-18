package com.example.course_view.payload.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class UserCourseRequest {
    private Long userId;
    private Long courseId;

}
