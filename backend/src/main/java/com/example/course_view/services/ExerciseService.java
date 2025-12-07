package com.example.course_view.services;

import com.example.course_view.payload.dto.ExerciseDTO;
import com.example.course_view.payload.dto.LessonDTO;
import com.example.course_view.payload.request.ExerciseRequest;

public interface ExerciseService {

    ExerciseDTO createExercise(Long lessonId, ExerciseRequest exerciseRequest);

    ExerciseDTO deleteExercise(Long exerciseId);

    ExerciseDTO updateExercise(Long exerciseId, ExerciseRequest exerciseRequest);
}
