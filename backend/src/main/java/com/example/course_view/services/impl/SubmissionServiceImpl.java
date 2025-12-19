package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.Exercise;
import com.example.course_view.models.Submission;
import com.example.course_view.models.User;
import com.example.course_view.payload.dto.SubmissionDTO;
import com.example.course_view.payload.request.SubmissionRequest;
import com.example.course_view.payload.response.SubmissionResponse;
import com.example.course_view.repositories.ExerciseRepository;
import com.example.course_view.repositories.SubmissionRepository;
import com.example.course_view.repositories.UserRepository;
import com.example.course_view.services.SubmissionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SubmissionServiceImpl implements SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    public SubmissionDTO submitExercise(SubmissionRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Exercise exercise = exerciseRepository.findById(request.getExerciseId())
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        Submission newSubmission = new Submission();
        newSubmission.setUser(user);
        newSubmission.setExercise(exercise);
        newSubmission.setSolution(request.getSolution());

        Submission savedSubmission = submissionRepository.save(newSubmission);

        return modelMapper.map(savedSubmission, SubmissionDTO.class);
    }

    @Override
    public SubmissionResponse getSubmissionsByExercise(Long exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new RuntimeException("exercise not found"));
        List<Submission> submissionList = submissionRepository.findAllByExerciseId(exerciseId);
        List<SubmissionDTO> submissionDTOList = submissionList.stream()
                .map(submission -> modelMapper.map(submission, SubmissionDTO.class))
                .toList();

        SubmissionResponse response = new SubmissionResponse(submissionDTOList);
        return response;
    }

    @Override
    public SubmissionDTO gradeSubmission(Long submissionId, Integer score) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Submission", "id", submissionId));
        submission.setScore(score);
        submissionRepository.save(submission);
        return modelMapper.map(submission, SubmissionDTO.class);
    }
}
