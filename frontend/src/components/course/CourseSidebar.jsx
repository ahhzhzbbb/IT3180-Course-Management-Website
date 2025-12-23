import React from 'react';
import styles from './CourseSidebar.module.css';

export default function CourseSidebar({
  course, activeLesson, expandedChapters, isInstructor,
  onToggleChapter, onSelectLesson,
  onAddChapter, onEditChapter, onDeleteChapter,
  onAddLesson, onEditLesson, onDeleteLesson
}) {
  return (
    <div className={styles.sidebar}>
      <h3>Nội Dung Khoá Học</h3>
      <div style={{ paddingBottom: 10 }}>
        {isInstructor && (
          <div style={{ padding: '0 15px 10px 15px' }}>
            <button className="btn-primary" style={{ width: '100%' }} onClick={onAddChapter}>+ New Chapter</button>
          </div>
        )}
        {course.chapters && course.chapters.map(chapter => (
          <div key={chapter.id} className={styles.chapterItem}>
            <div className={styles.chapterHeader} onClick={() => onToggleChapter(chapter.id)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className={`${styles.arrow} ${expandedChapters[chapter.id] ? styles.open : ''}`}>▼</span>
                <span>{chapter.title}</span>
              </div>
              {isInstructor && (
                <div>
                  <button className="btn-icon btn-edit" onClick={(e) => onEditChapter(e, chapter)}>✏️</button>
                  <button className="btn-icon btn-delete" onClick={(e) => onDeleteChapter(e, chapter.id)}>🗑️</button>
                </div>
              )}
            </div>
            <div className={`${styles.lessonList} ${expandedChapters[chapter.id] ? styles.expanded : styles.collapsed}`}>
              <ul>
                {chapter.lessons && chapter.lessons.map(lesson => (
                  <li key={lesson.id} className={`${styles.lessonItem} ${activeLesson?.id === lesson.id ? styles.active : ''}`} onClick={() => onSelectLesson(lesson)}>
                    <div style={{ flex: 1 }}>{lesson.title}</div>
                    {isInstructor && (
                      <div style={{ minWidth: '50px', textAlign: 'right' }}>
                        <button className="btn-icon btn-edit" onClick={(e) => onEditLesson(e, lesson)}>✏️</button>
                        <button className="btn-icon btn-delete" onClick={(e) => onDeleteLesson(e, lesson.id)}>🗑️</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {isInstructor && (
                <div style={{ padding: '5px 20px', background: '#f8f9fa' }}>
                  <button style={{ fontSize: '0.8rem', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => onAddLesson(chapter.id)}>+ Add Lesson</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}