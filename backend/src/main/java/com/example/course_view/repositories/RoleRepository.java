package com.example.course_view.repositories;

import com.example.course_view.models.AppRole;
import com.example.course_view.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(AppRole appRole);

}
