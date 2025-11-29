package com.example.coure_view.payload.response;

import com.example.coure_view.payload.dto.UserDTO;
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
