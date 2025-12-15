package com.example.course_view.payload.response;

import com.example.course_view.payload.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponse {
    private boolean isOK;
    private String message;
    private UserDTO userDTO;
}
