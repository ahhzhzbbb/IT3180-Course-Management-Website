package com.example.coure_view.services;

import com.example.coure_view.payload.request.RegisterRequest;
import com.example.coure_view.payload.response.LoginResponse;
import org.springframework.http.ResponseEntity;

public interface RegisterService {
    ResponseEntity<LoginResponse> addNewUser(RegisterRequest registerRequest);
}
