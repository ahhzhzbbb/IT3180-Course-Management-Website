package com.example.course_view.payload.response;

import com.example.course_view.payload.dto.CommentDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private boolean isOK;
    private String message;
    private List<CommentDTO> comments;
}
