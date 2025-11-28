package com.example.coure_view.controller;

import com.example.coure_view.payload.request.LoginRequest;
import com.example.coure_view.payload.response.LoginResponse;
import com.example.coure_view.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return loginService.login(loginRequest);
    }
}
