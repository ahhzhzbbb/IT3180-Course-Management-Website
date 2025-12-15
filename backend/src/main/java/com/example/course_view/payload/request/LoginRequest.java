package com.example.course_view.payload.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
