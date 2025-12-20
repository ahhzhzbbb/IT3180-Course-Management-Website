import React from 'react';

export default function CourseSidebar({
  course,
  activeLesson,
  expandedChapters,
  isInstructor,
  onToggleChapter,
  onSelectLesson,
  // Instructor Actions
  onAddChapter,
  onEditChapter,
  onDeleteChapter,
  onAddLesson,
  onEditLesson,
  onDeleteLesson
}) {
  return (
    <div className="course-right-column">
      <h3>Course Content</h3>
      <div style={{ paddingBottom: 10 }}>

        {isInstructor && (
          <div style={{ padding: '0 15px 10px 15px' }}>
            <button className="btn-primary" style={{ width: '100%' }} onClick={onAddChapter}>
              + New Chapter
            </button>
          </div>
        )}

        {course.chapters && course.chapters.map(chapter => (
          <div key={chapter.id} className="chapter-item">
            {/* CHAPTER HEADER */}
            <div className="chapter-header" onClick={() => onToggleChapter(chapter.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className={`chapter-arrow ${expandedChapters[chapter.id] ? 'open' : ''}`}>▼</span>
                <span>{chapter.title}</span>
              </div>

              {isInstructor && (
                <div style={{ display: 'flex' }}>
                  <button className="btn-icon btn-edit" onClick={(e) => onEditChapter(e, chapter)}>✏️</button>
                  <button className="btn-icon btn-delete" onClick={(e) => onDeleteChapter(e, chapter.id)}>🗑️</button>
                </div>
              )}
            </div>

            {/* LESSON LIST */}
            <div className={`lesson-list-container ${expandedChapters[chapter.id] ? 'expanded' : 'collapsed'}`}>
              <ul className="lesson-list">
                {chapter.lessons && chapter.lessons.map(lesson => (
                  <li
                    key={lesson.id}
                    className={`lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''}`}
                    onClick={() => onSelectLesson(lesson)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                      <span>{activeLesson?.id === lesson.id ? '▶' : '🎥'}</span>
                      <span style={{ flex: 1 }}>{lesson.title}</span>
                    </div>

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
                <div style={{ padding: '5px 20px', background: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                  <button
                    style={{ fontSize: '0.8rem', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => onAddLesson(chapter.id)}
                  >
                    + Add Lesson
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}