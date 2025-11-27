package com.example.coure_view.services;

import com.example.coure_view.models.User;
import com.example.coure_view.payload.dto.UserDTO;
import com.example.coure_view.payload.request.LoginRequest;
import com.example.coure_view.payload.response.LoginResponse;
import com.example.coure_view.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<LoginResponse> checkUserLogin(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if(user == null) {
            return ResponseEntity.status(404).body(new LoginResponse(false, "Email khong ton tai", null));
        }

        if(!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body(new LoginResponse(false, "Sai mat khau", null));
        }

        UserDTO userDTO = new UserDTO(user.getUserId(), user.getName(), user.getEmail());
        return ResponseEntity.ok(new LoginResponse(true, "Dang nhap thanh cong!", userDTO));
    }
}
