package com.example.course_view.controller;

import com.example.course_view.payload.dto.ExerciseDTO;
import com.example.course_view.payload.dto.LessonDTO;
import com.example.course_view.payload.request.ExerciseRequest;
import com.example.course_view.payload.request.LessonRequest;
import com.example.course_view.services.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/lessons/{lessonId}/exercises")
    public ResponseEntity<ExerciseDTO> createExercise(@PathVariable Long lessonId, @RequestBody ExerciseRequest exerciseRequest) {
        ExerciseDTO newExerciseDTO = exerciseService.createExercise(lessonId, exerciseRequest);
        return new ResponseEntity<>(newExerciseDTO, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @DeleteMapping("/exercises/{exerciseId}")
    public ResponseEntity<ExerciseDTO> deleteExercise(@PathVariable Long exerciseId) {
        ExerciseDTO exerciseDTO = exerciseService.deleteExercise(exerciseId);
        return new ResponseEntity<>(exerciseDTO, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PutMapping("/exercises/{exerciseId}")
    public ResponseEntity<ExerciseDTO>  updateExercise(@PathVariable Long exerciseId, @RequestBody ExerciseRequest exerciseRequest) {
        ExerciseDTO exerciseDTO = exerciseService.updateExercise(exerciseId, exerciseRequest);
        return new ResponseEntity<>(exerciseDTO, HttpStatus.OK);
    }
}
