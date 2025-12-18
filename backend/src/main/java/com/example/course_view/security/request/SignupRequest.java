package com.example.course_view.security.request;

import java.time.LocalDate;
import java.util.Set;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @Getter
    @Setter
    private Set<String> roles;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(min = 10, max = 10)
    private String phoneNumber;

    @NotBlank
    private LocalDate birth;
    private Boolean gender;
}