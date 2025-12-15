package com.example.course_view.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private Integer role;

    @Column(nullable = true)
    private String password;
    private LocalDate createAt = LocalDate.now();
    private String status;
    private String name;
    private Boolean gender;
    private LocalDate birth;


    @Column(nullable = false, unique = true)
    private String email;
    private String phoneNumber;
}