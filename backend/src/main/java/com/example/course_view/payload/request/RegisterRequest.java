package com.example.course_view.payload.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String name;
    private Boolean gender;
    private LocalDate birth;
    private String phoneNumber;
}
