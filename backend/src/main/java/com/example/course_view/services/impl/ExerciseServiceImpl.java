package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.Chapter;
import com.example.course_view.models.Exercise;
import com.example.course_view.models.Lesson;
import com.example.course_view.models.Submission;
import com.example.course_view.payload.dto.ExerciseDTO;
import com.example.course_view.payload.dto.LessonDTO;
import com.example.course_view.payload.request.ExerciseRequest;
import com.example.course_view.repositories.ExerciseRepository;
import com.example.course_view.repositories.LessonRepository;
import com.example.course_view.repositories.SubmissionRepository;
import com.example.course_view.services.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {
    private final SubmissionRepository submissionRepository;
    private final ExerciseRepository exerciseRepository;
    private final LessonRepository lessonRepository;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public ExerciseDTO createExercise(Long lessonId, ExerciseRequest exerciseRequest) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
        Exercise exercise = modelMapper.map(exerciseRequest, Exercise.class);
        exercise.setLesson(lesson);
        Exercise savedExercise = exerciseRepository.save(exercise);
        return modelMapper.map(savedExercise, ExerciseDTO.class);
    }
    @Transactional
    @Override
    public ExerciseDTO deleteExercise(Long exerciseId) {
        Exercise existingExercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise", "id", exerciseId));
        Lesson lesson = existingExercise.getLesson();
        List<Submission> submissions = existingExercise.getSubmissions();
        if (lesson != null) {
            lesson.getExercises().remove(existingExercise);
            existingExercise.setLesson(null);
        }

        if (submissions != null) {
            submissions.clear();
        }

        exerciseRepository.delete(existingExercise);
        return modelMapper.map(existingExercise, ExerciseDTO.class);
    }
    @Transactional
    @Override
    public ExerciseDTO updateExercise(Long exerciseId, ExerciseRequest exerciseRequest) {
        Exercise existingExercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise", "id", exerciseId));
        modelMapper.map(exerciseRequest, existingExercise);
        Exercise savedExercise = exerciseRepository.save(existingExercise);
        return modelMapper.map(savedExercise, ExerciseDTO.class);
    }
}
