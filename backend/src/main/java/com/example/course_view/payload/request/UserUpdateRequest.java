package com.example.course_view.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    private String username;
    private String email;
    private String password;
    private List<String> roles;
}
