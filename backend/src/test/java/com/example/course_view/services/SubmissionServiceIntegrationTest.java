package com.example.course_view.services;

import com.example.course_view.models.Exercise;
import com.example.course_view.models.Submission;
import com.example.course_view.models.User;
import com.example.course_view.repositories.ExerciseRepository;
import com.example.course_view.repositories.SubmissionRepository;
import com.example.course_view.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class SubmissionServiceIntegrationTest {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Test
    void gradeSubmission_updatesScoreInDatabase() {
        User student = new User("int-student", "pw");
        student = userRepository.save(student);

        Exercise ex = new Exercise();
        ex.setTitle("Integration Exercise");
        ex.setDescription("desc");
        ex.setMaxSubmissions(3);
        ex = exerciseRepository.save(ex);

        Submission sub = new Submission();
        sub.setUser(student);
        sub.setExercise(ex);
        sub.setSolution("my solution");
        sub = submissionRepository.save(sub);

        // Act
        submissionService.gradeSubmission(sub.getId(), 92);

        // Assert
        Submission updated = submissionRepository.findById(sub.getId()).orElseThrow();
        assertThat(updated.getScore()).isEqualTo(92);
    }
}
