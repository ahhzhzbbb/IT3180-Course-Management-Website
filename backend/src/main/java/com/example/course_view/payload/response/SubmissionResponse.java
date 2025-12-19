package com.example.course_view.payload.response;

import com.example.course_view.payload.dto.SubmissionDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionResponse {
    private List<SubmissionDTO> submissions;
}
