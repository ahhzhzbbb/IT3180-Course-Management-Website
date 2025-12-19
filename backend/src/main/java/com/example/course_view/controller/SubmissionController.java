package com.example.course_view.controller;

import com.example.course_view.models.Submission;
import com.example.course_view.payload.dto.SubmissionDTO;
import com.example.course_view.payload.request.SubmissionRequest;
import com.example.course_view.payload.response.SubmissionResponse;
import com.example.course_view.services.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @GetMapping("/submissions")
    public ResponseEntity<SubmissionResponse> getSubmissionOfExercise(Long exerciseId) {
        SubmissionResponse response = submissionService.getSubmissionsByExercise(exerciseId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/submissions")
    public ResponseEntity<SubmissionDTO> createSubmission(@RequestBody SubmissionRequest resquest) {
        SubmissionDTO response = submissionService.submitExercise(resquest);
        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PutMapping("/submission/{id}")
    public ResponseEntity<SubmissionDTO> gradeSubmission(@PathVariable("id") Long submissionId, Integer score) {
        SubmissionDTO response = submissionService.gradeSubmission(submissionId, score);
        return ResponseEntity.ok().body(response);
    }
}
