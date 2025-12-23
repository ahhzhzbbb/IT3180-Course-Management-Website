package com.example.course_view.controller;

import com.example.course_view.configs.AppConstants;
import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.payload.response.UserResponse;
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
    @GetMapping("/users")
    public ResponseEntity<UserResponse> getAllUsers(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize
    ) {
        UserResponse userResponse = userService.getAllUsers(pageNumber, pageSize);
        return ResponseEntity.ok(userResponse);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<UserInfoResponse> createUser(@RequestBody SignupRequest request) {
        UserInfoResponse userInfoResponse = userService.createUser(request);
        return new ResponseEntity<>(userInfoResponse, HttpStatus.CREATED);
    }

    @PreAuthorize("@userResource.canUpdateUser(#userId, authentication)")
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
