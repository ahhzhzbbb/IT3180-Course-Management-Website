package com.example.course_view.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {
    private Long userId;
    private Integer role;
    private String status;
    private String name;
    private Boolean gender;
    private String email;

    public UserDTO(Long userId, String name, String email, Boolean gender) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.gender = gender;
    }
}