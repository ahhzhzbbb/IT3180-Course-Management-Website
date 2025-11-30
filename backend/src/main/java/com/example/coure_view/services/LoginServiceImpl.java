// LoginServiceImpl.java
package com.example.coure_view.services;

import com.example.coure_view.models.User;
import com.example.coure_view.payload.dto.UserDTO;
import com.example.coure_view.payload.request.LoginRequest;
import com.example.coure_view.payload.response.LoginResponse;
import com.example.coure_view.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null) {
            return new LoginResponse(false, "Email không tồn tại", null);
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return new LoginResponse(false, "Mật khẩu không đúng", null);
        }

        UserDTO userDTO = new UserDTO(user.getUserId(), user.getName(), user.getEmail());
        return new LoginResponse(true, "Đăng nhập thành công", userDTO);
    }
}
