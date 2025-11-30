package com.example.coure_view.controller;

import com.example.coure_view.payload.dto.UserDTO;
import com.example.coure_view.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private UserService userService;

    @PutMapping("/grant-teacher/{userId}")
    public ResponseEntity<UserDTO> grantTeacher(@PathVariable Long userId) {
        UserDTO userDTO = userService.grantTeacherRole(userId);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/revoke-teacher/{userId}")
    public ResponseEntity<UserDTO> revokeTeacher(@PathVariable Long userId) {
        UserDTO userDTO = userService.revokeTeacherRole(userId);
        return ResponseEntity.ok(userDTO);
    }
}
