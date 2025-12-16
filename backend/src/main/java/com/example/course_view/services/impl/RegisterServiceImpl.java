package com.example.course_view.services.impl;

import com.example.course_view.models.User;
import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.request.RegisterRequest;
import com.example.course_view.payload.response.LoginResponse;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<LoginResponse> addNewUser(RegisterRequest registerRequest) {
        User user = userRepository.findByEmail(registerRequest.getEmail()).orElse(null);

        if(user != null) {
            return ResponseEntity.status(409).body(new LoginResponse(false, "Tai Khoan da ton tai!!!", null));
        }
        else {
            user = new User();
            user.setEmail(registerRequest.getEmail());
            user.setPassword(registerRequest.getPassword());
            user.setName(registerRequest.getName());
            user.setGender(registerRequest.getGender());
            user.setBirth(registerRequest.getBirth());
            user.setPhoneNumber(registerRequest.getPhoneNumber());

            userRepository.save(user);
            UserDTO dto = new UserDTO();
            return ResponseEntity.ok(new LoginResponse(true, "Dang ky Tai Khoan thanh cong!!!", null));
        }
    }
}
