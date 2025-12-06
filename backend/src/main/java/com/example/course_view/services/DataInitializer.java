package com.example.course_view.services;

import com.example.course_view.models.Chapter;
import com.example.course_view.models.Course;
import com.example.course_view.models.Lesson;
import com.example.course_view.repositories.ChapterRepository;
import com.example.course_view.repositories.CourseRepository;
import com.example.course_view.repositories.LessonRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@AllArgsConstructor
public class DataInitializer {
    private final LessonRepository lessonRepository;
    private final ChapterRepository chapterRepository;
    private final CourseRepository courseRepository;


    @Bean
    public CommandLineRunner initializeData() {
        return args -> {

            Course course1 = new Course();
            Course course2 = new Course();
            Course course3 = new Course();
            course1.setTitle("Toán 10");
            course2.setTitle("Vật lí 11");
            course3.setTitle("Hóa học 12");
            courseRepository.save(course1);
            courseRepository.save(course2);
            courseRepository.save(course3);

            Chapter chapter1 = new Chapter();
            Chapter chapter2 = new Chapter();
            Chapter chapter3 = new Chapter();
            chapter1.setTitle("Logic, Tập hợp");
            chapter2.setTitle("Phương trình, hệ phương trình");
            chapter3.setTitle("Bất đẳng thức");
            course1.setChapters(List.of(
                    chapter1,
                    chapter2,
                    chapter3
            ));
            chapterRepository.save(chapter1);
            chapterRepository.save(chapter2);
            chapterRepository.save(chapter3);

            Lesson lesson1 = new Lesson();
            Lesson lesson2 = new Lesson();
            lesson1.setTitle("Giới thiệu về logic");
            lesson2.setTitle("Giới thiệu về tập hợp");
            chapter1.setLessons(List.of(lesson1, lesson2));
            lessonRepository.save(lesson1);
            lessonRepository.save(lesson2);



        };
    }
}