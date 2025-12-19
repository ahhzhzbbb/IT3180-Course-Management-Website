package com.example.course_view.services.impl;

import com.example.course_view.exceptions.ResourceNotFoundException;
import com.example.course_view.models.Chapter;
import com.example.course_view.models.Lesson;
import com.example.course_view.payload.dto.LessonDTO;
import com.example.course_view.payload.request.LessonRequest;
import com.example.course_view.repositories.ChapterRepository;
import com.example.course_view.repositories.LessonRepository;
import com.example.course_view.services.LessonService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    private final LessonRepository lessonRepository;
    private final ChapterRepository chapterRepository;
    private final ModelMapper modelMapper;

    @Override
    public LessonDTO getLessonById(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
        return modelMapper.map(lesson, LessonDTO.class);
    }

    @Transactional
    @Override
    public LessonDTO createLesson(Long chapterId, LessonRequest lessonRequest) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "id", chapterId));
        Lesson lesson = modelMapper.map(lessonRequest, Lesson.class);
        lesson.setChapter(chapter);
        Lesson savedLesson = lessonRepository.save(lesson);
        return modelMapper.map(savedLesson, LessonDTO.class);
    }

    @Transactional
    @Override
    public LessonDTO deleteLesson(Long lessonId) {
        Lesson existingLesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
        Chapter chapter = existingLesson.getChapter();
        if (chapter != null) {
            chapter.getLessons().remove(existingLesson);
            existingLesson.setChapter(null);
        }
        lessonRepository.delete(existingLesson);
        return modelMapper.map(existingLesson, LessonDTO.class);
    }

    @Transactional
    @Override
    public LessonDTO updateLesson(Long lessonId, LessonRequest lessonRequest) {
        Lesson existingLesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
        modelMapper.map(lessonRequest, existingLesson);
        Lesson savedLesson = lessonRepository.save(existingLesson);
        return modelMapper.map(savedLesson, LessonDTO.class);
    }

}