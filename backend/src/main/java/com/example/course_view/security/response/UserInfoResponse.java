package com.example.course_view.security.response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String jwtToken;
    private String username;
    private String name;
    private List<String> roles;

    // Profile fields
    private String phoneNumber;
    private LocalDate birth;
    private Boolean gender;
    private String state;

    public UserInfoResponse(Long id, String username, String name, List<String> roles) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.roles = roles;
    }



    public UserInfoResponse(Long id, String username, String name, List<String> roles, String phoneNumber, LocalDate birth, Boolean gender, String state) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.roles = roles;
        this.phoneNumber = phoneNumber;
        this.birth = birth;
        this.gender = gender;
        this.state = state;
    }



}