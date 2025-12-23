package com.example.course_view.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    private String username;
    private String name;
    private String password;
    private List<String> roles;

    // Profile fields
    private String phoneNumber;
    private LocalDate birth;
    private Boolean gender;
    private String state;
}
