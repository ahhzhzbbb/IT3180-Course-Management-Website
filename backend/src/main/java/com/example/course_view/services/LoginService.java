package com.example.course_view.services;

import com.example.course_view.payload.request.LoginRequest;
import com.example.course_view.payload.response.LoginResponse;
import org.springframework.http.ResponseEntity;

public interface LoginService {
    ResponseEntity<LoginResponse> checkUserLogin(LoginRequest loginRequest);
}
