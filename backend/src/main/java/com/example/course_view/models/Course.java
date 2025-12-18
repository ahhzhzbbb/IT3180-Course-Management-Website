package com.example.course_view.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.EAGER ,orphanRemoval = true)
    private List<Chapter> chapters;

    public void setChapters(List<Chapter> chapters) {
        if (chapters != null) {
            for (Chapter chapter : chapters) {
                chapter.setCourse(this);
            }
        }
        this.chapters = chapters;
    }
    @OneToMany(mappedBy = "course")
    Set<CourseStudent> students;

    @OneToMany(mappedBy = "course")
    Set<CourseInstructor> instructors;
}