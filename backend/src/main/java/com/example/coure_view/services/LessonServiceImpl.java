package com.example.coure_view.services;

import com.example.coure_view.exceptions.ResourceNotFoundException;
import com.example.coure_view.models.Chapter;
import com.example.coure_view.models.Lesson;
import com.example.coure_view.payload.dto.LessonDTO;
import com.example.coure_view.payload.request.LessonRequest;
import com.example.coure_view.repositories.ChapterRepository;
import com.example.coure_view.repositories.LessonRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LessonServiceImpl implements LessonService {
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private ChapterRepository chapterRepository;
    @Autowired
    private ModelMapper modelMapper;

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
