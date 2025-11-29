package com.example.coure_view.services.impl;

import com.example.coure_view.exceptions.ResourceNotFoundException;
import com.example.coure_view.models.Chapter;
import com.example.coure_view.models.Course;
import com.example.coure_view.payload.dto.ChapterDTO;
import com.example.coure_view.payload.request.ChapterRequest;
import com.example.coure_view.repositories.ChapterRepository;
import com.example.coure_view.repositories.CourseRepository;
import com.example.coure_view.services.ChapterService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChapterServiceImpl implements ChapterService {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    @Override
    public ChapterDTO createChapter(Long courseId, ChapterRequest chapterRequest) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));
        Chapter chapter = modelMapper.map(chapterRequest, Chapter.class);
        chapter.setCourse(course);
        Chapter savedChapter = chapterRepository.save(chapter);
        return modelMapper.map(savedChapter, ChapterDTO.class);
    }

    @Transactional
    @Override
    public ChapterDTO deleteChapter(Long chapterId) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "id", chapterId));
        Course course = chapter.getCourse();
        if (course != null) {
            course.getChapters().remove(chapter);
            chapter.setCourse(null);
        }
        chapterRepository.delete(chapter);
        return modelMapper.map(chapter, ChapterDTO.class);
    }

    @Transactional
    @Override
    public ChapterDTO updateChapter(Long chapterId, ChapterRequest chapterRequest) {
        Chapter existingChapter =  chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter", "id", chapterId));
        modelMapper.map(chapterRequest, existingChapter);
        Chapter updatedChapter = chapterRepository.save(existingChapter);
        return modelMapper.map(updatedChapter, ChapterDTO.class);
    }

}

