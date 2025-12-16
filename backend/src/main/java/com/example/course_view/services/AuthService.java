package com.example.course_view.services;

import com.example.course_view.security.response.AuthenticationResult;
import com.example.course_view.security.request.LoginRequest;
import com.example.course_view.security.request.SignupRequest;
import com.example.course_view.security.response.MessageResponse;
import com.example.course_view.security.response.UserInfoResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthenticationResult login(LoginRequest loginRequest);

    ResponseEntity<MessageResponse> register(SignupRequest signUpRequest);

    UserInfoResponse getCurrentUserDetails(Authentication authentication);

    ResponseCookie logoutUser();
}
