package com.example.coure_view.services;

import com.example.coure_view.payload.dto.ChapterDTO;
import com.example.coure_view.payload.request.ChapterRequest;

public interface ChapterService {
    ChapterDTO createChapter(Long courseId, ChapterRequest chapterRequest);

    ChapterDTO deleteChapter(Long chapterId);

    ChapterDTO updateChapter(Long chapterId, ChapterRequest chapterRequest);
}
