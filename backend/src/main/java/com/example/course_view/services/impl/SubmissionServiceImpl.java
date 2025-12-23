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
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    @Override
    public SubmissionDTO submitExercise(Long exerciseId, Long userId, SubmissionRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        long submissionCount = submissionRepository.countByExerciseIdAndUserId(exerciseId, userId);

        Integer limit = exercise.getMaxSubmissions() != null ? exercise.getMaxSubmissions() : 1;

        if (submissionCount >= limit) {
            throw new RuntimeException("Bạn đã đạt giới hạn số lần nộp bài (" + limit + " lần)!");
        }

        Submission newSubmission = new Submission();
        newSubmission.setUser(user);
        newSubmission.setExercise(exercise);
        newSubmission.setSolution(request.getSolution());

        Submission savedSubmission = submissionRepository.save(newSubmission);

        SubmissionDTO dto = modelMapper.map(savedSubmission, SubmissionDTO.class);
        if (savedSubmission.getUser() != null) dto.setUserUsername(savedSubmission.getUser().getUsername());
        return dto;
    }

    @Override
    public SubmissionResponse getSubmissionsByExercise(Long exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new RuntimeException("exercise not found"));
        List<Submission> submissionList = submissionRepository.findAllByExerciseId(exerciseId);
        List<SubmissionDTO> submissionDTOList = submissionList.stream()
                .map(submission -> {
                    SubmissionDTO dto = modelMapper.map(submission, SubmissionDTO.class);
                    if (submission.getUser() != null) dto.setUserUsername(submission.getUser().getUsername());
                    return dto;
                })
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
        SubmissionDTO dto = modelMapper.map(submission, SubmissionDTO.class);
        if (submission.getUser() != null) dto.setUserUsername(submission.getUser().getUsername());
        return dto;
    }

    @Override
    public SubmissionDTO getSubmissionByExerciseAndUsername(Long exerciseId, String username) {
        return submissionRepository.findFirstByExerciseIdAndUserUsername(exerciseId, username)
                .map(sub -> modelMapper.map(sub, SubmissionDTO.class))
                .orElse(null);
    }
}
