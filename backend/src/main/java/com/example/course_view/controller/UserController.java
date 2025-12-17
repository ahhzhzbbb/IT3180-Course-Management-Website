package com.example.course_view.controller;

import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.security.request.SignupRequest;
import com.example.course_view.security.response.UserInfoResponse;
import com.example.course_view.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<UserInfoResponse> createUser(@RequestBody SignupRequest request) {
        UserInfoResponse userInfoResponse = userService.createUser(request);
        return new ResponseEntity<>(userInfoResponse, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/users/{userId}")
    public ResponseEntity<UserInfoResponse> updateUser(@RequestBody UserUpdateRequest request, @PathVariable Long userId) {
        UserInfoResponse userInfoResponse = userService.updateUser(request, userId);
        return new ResponseEntity<>(userInfoResponse, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<UserInfoResponse> deleteUser(@PathVariable Long userId) {
        UserInfoResponse userInfoResponse = userService.deleteUser(userId);
        return new ResponseEntity<>(userInfoResponse, HttpStatus.OK);
    }
}
