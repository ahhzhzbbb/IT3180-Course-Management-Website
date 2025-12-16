package com.example.course_view.controller;

import com.example.course_view.payload.dto.UserDTO;
import com.example.course_view.payload.request.UserCreateRequest;
import com.example.course_view.payload.request.UserUpdateRequest;
import com.example.course_view.payload.response.UserRespond;
import com.example.course_view.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserCreateRequest request) {
        UserDTO addUser = userService.createUser(request);
        return  new ResponseEntity<>(addUser, HttpStatus.CREATED);
    }

    @GetMapping("/users")
    public ResponseEntity<UserRespond> getUsers() {
        UserRespond respond = userService.getUsers();
        return ResponseEntity.ok().body(respond);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        UserDTO respond = userService.getUser(id);
        return ResponseEntity.ok().body(respond);
    }

    @DeleteMapping("/users/{userID}")
    String deleteUser(@PathVariable Long userID) {
        boolean check = userService.deleteUser(userID);
        if (check) return "Da xoa user";
        return "Khong ton tai user";
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id,@RequestBody UserUpdateRequest request) {
        UserDTO updateUser = userService.updateUser(request, id);
        return  ResponseEntity.ok().body(updateUser);
    }
}
