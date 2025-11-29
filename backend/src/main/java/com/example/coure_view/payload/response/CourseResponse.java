package com.example.coure_view.payload.response;

import com.example.coure_view.payload.dto.CourseListDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    List<CourseListDTO> courses;
}
