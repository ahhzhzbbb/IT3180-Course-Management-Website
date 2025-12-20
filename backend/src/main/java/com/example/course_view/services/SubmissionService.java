package com.example.course_view.services;

import com.example.course_view.payload.dto.SubmissionDTO;
import com.example.course_view.payload.request.SubmissionRequest;
import com.example.course_view.payload.response.SubmissionResponse;
import org.springframework.stereotype.Service;

@Service
public interface SubmissionService {
    SubmissionDTO submitExercise(Long exerciseId, Long userId, SubmissionRequest request);

    SubmissionResponse getSubmissionsByExercise(Long exerciseId);

    SubmissionDTO gradeSubmission(Long submissionId, Integer score);

}
