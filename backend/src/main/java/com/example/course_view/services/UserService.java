package com.example.course_view.services;

import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.payload.response.UserResponse;
import com.example.course_view.security.request.SignupRequest;
import com.example.course_view.security.response.UserInfoResponse;

public interface UserService {
    UserInfoResponse createUser(SignupRequest request);

    UserInfoResponse deleteUser(Long userId);

    UserInfoResponse updateUser(UserUpdateRequest request, Long userId);

    UserResponse getAllUsers();
}
