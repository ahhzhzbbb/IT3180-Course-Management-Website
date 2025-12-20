package com.example.course_view.repositories;

import com.example.course_view.models.Submission;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findAllByExerciseId(Long submissionId);

    @Query("SELECT COUNT(s) FROM Submission s WHERE s.exercise.id = :exerciseId AND s.user.userId = :userId")
    long countByExerciseIdAndUserId(@Param("exerciseId") Long exerciseId, @Param("userId") Long userId);
}
