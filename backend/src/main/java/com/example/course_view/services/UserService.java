package com.example.course_view.services;

import com.example.course_view.models.User;
import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.request.UserCreateRequest;
import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.payload.response.UserRespond;

public interface UserService {
    public UserDTO createUser(UserCreateRequest request);

    public UserRespond getUsers();

    public UserDTO getUser(Long id);

    public UserDTO updateUser(UserUpdateRequest request, Long id);

    public boolean deleteUser(Long id);

}
