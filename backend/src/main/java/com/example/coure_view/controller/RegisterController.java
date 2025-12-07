package com.example.coure_view.controller;

import com.example.coure_view.payload.request.RegisterRequest;
import com.example.coure_view.payload.response.LoginResponse;
import com.example.coure_view.services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class RegisterController {
    @Autowired
    private RegisterService registerService;

    @PostMapping("/public/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest registerRequest) {
        return registerService.addNewUser(registerRequest);
    }
}
