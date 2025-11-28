package com.example.coure_view.services;

import com.example.coure_view.models.User;
import com.example.coure_view.payload.dto.UserDTO;
import com.example.coure_view.payload.response.LoginResponse;
import com.example.coure_view.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public LoginResponse register(User user) {
        // Kiểm tra email đã tồn tại chưa
        if(userRepository.existsByEmail(user.getEmail())) {
            return new LoginResponse(false, "Email đã tồn tại", null);
        }

        // Hash password trước khi lưu
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Mặc định ngày tạo
        user.setCreateAt(LocalDate.now());

        // Mặc định trạng thái
        if(user.getStatus() == null) {
            user.setStatus("ACTIVE");
        }

        // Lưu user mới
        User savedUser = userRepository.save(user);

        // Chuyển sang DTO để trả frontend
        UserDTO userDTO = new UserDTO(savedUser.getUserId(), savedUser.getName(), savedUser.getEmail());

        return new LoginResponse(true, "Đăng ký thành công!", userDTO);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));
        return new UserDTO(user.getUserId(), user.getName(), user.getEmail());
    }
}
