package com.example.coure_view.services;

import com.example.coure_view.models.User;
import com.example.coure_view.payload.dto.UserDTO;
import com.example.coure_view.payload.response.LoginResponse;

public interface UserService {

    // Đăng ký tài khoản mới
    LoginResponse register(User user);

    // Lấy user theo email (có thể dùng cho các nghiệp vụ khác)
    UserDTO getUserByEmail(String email);
}
