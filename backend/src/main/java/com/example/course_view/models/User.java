package com.example.course_view.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String userName;
    private String email;
    private String password;
    private String phoneNumber;
    private LocalDate createdAt = LocalDate.now();
    private LocalDate birth;
    private Boolean gender;
    private String state;

    public User(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    public User(String userName, String email, String password, String phoneNumber, LocalDate birth, Boolean gender) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birth = birth;
        this.gender = gender;
    }

    @Setter
    @Getter
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public boolean hasRole(AppRole role) {
        return roles.stream()
                .anyMatch(r -> r.getRoleName() == role);
    }

    public boolean isInstructor() {
        return hasRole(AppRole.ROLE_INSTRUCTOR);
    }

    public boolean isStudent() {
        return hasRole(AppRole.ROLE_USER);
    }

    public boolean isAdmin() {
        return hasRole(AppRole.ROLE_ADMIN);
    }

}