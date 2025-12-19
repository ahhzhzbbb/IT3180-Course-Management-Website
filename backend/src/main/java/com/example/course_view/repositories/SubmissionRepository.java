package com.example.course_view.repositories;

import com.example.course_view.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findAllByExerciseId(Long submissionId);
}
