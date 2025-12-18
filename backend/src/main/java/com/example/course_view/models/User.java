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
    private String username;
    private String password;
    private String name;
    private String phoneNumber;
    private LocalDate createdAt = LocalDate.now();
    private LocalDate birth;
    private Boolean gender;
    private String state;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, String name, String phoneNumber, LocalDate birth, Boolean gender) {
        this.username = username;
        this.password = password;
        this.name = name;
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