package com.example.coure_view.controller;

import com.example.coure_view.payload.request.LoginRequest;
import com.example.coure_view.payload.response.LoginResponse;
import com.example.coure_view.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/public/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request)
    {
        return loginService.checkUserLogin(request);
    }
}
