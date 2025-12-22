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
    public ResponseEntity<SubmissionResponse> getSubmissionOfExercise(@RequestParam("exerciseId") Long exerciseId) {
        SubmissionResponse response = submissionService.getSubmissionsByExercise(exerciseId);
        return ResponseEntity.ok().body(response);
    }

    // Endpoint for a student to fetch their own submission for an exercise
    @GetMapping("/submissions/my")
    public ResponseEntity<?> getMySubmission(@RequestParam("exerciseId") Long exerciseId, java.security.Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        String username = principal.getName();
        SubmissionDTO dto = submissionService.getSubmissionByExerciseAndUsername(exerciseId, username);
        if (dto == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(dto);
    }

    @PostMapping("exercise/{exerciseId}/submissions/{userId}")
    public ResponseEntity<SubmissionDTO> createSubmission(@PathVariable Long exerciseId, @PathVariable Long userId, @RequestBody SubmissionRequest resquest) {
        SubmissionDTO response = submissionService.submitExercise(exerciseId, userId, resquest);
        return ResponseEntity.ok().body(response);
    }

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PutMapping("/submission/{id}/{score}")
    public ResponseEntity<SubmissionDTO> gradeSubmission(@PathVariable("id") Long submissionId, @PathVariable("score") Integer score) {
        SubmissionDTO response = submissionService.gradeSubmission(submissionId, score);
        return ResponseEntity.ok().body(response);
    }
}
