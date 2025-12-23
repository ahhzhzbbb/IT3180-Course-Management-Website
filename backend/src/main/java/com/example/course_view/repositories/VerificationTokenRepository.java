package com.example.course_view.repositories;

import com.example.course_view.models.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByIdAndCode(Long id, String code);
}
