package com.example.course_view.services;

import com.example.course_view.payload.request.RegisterRequest;
import com.example.course_view.payload.response.LoginResponse;
import org.springframework.http.ResponseEntity;

public interface RegisterService {
    ResponseEntity<LoginResponse> addNewUser(RegisterRequest registerRequest);
}
