package com.example.course_view.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Data
public class UserUpdateRequest {
    private String password;
    private Integer role;
    private String status;
    private String name;
    private Boolean gender;
}
