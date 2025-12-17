import React, { useState } from "react";
import CourseItem from "./course-item";

export default function CourseTable({
  title,
  description,
  lessons = [],
  onEditChapter,
  onDeleteChapter,
  onEditLesson,
  onDeleteLesson,
}) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((v) => !v);

  return (
    <div className="course-table-card">
      <button
        className="course-table-header"
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls="chapter-lessons"
      >
        <div className="course-table-header-text">
          <h2 className="course-table-title">{title}</h2>
          {description && <p className="course-table-desc">{description}</p>}
        </div>
        <div className="course-table-header-right">
          <span className="course-table-count">{lessons.length} bài học</span>
          <span className="course-table-chevron">{expanded ? "▾" : "▸"}</span>
        </div>
      </button>

      {/* Hành động trên Chapter */}
      <div className="course-table-actions">
        <button className="course-table-btn" onClick={onEditChapter}>✏️ Chỉnh sửa chương</button>
        <button className="course-table-btn course-table-btn--danger" onClick={onDeleteChapter}>
          🗑️ Xóa chương
        </button>
      </div>

      {expanded && (
        <div id="chapter-lessons" className="chapter-list">
          {lessons.length === 0 ? (
            <div className="chapter-empty">Chưa có bài học</div>
          ) : (
            lessons.map((lesson) => (
              <div key={lesson.id} className="chapter-item">
                <CourseItem
                  title={lesson.title}
                  description={lesson.description}
                  onEdit={() => onEditLesson?.(lesson)}
                  onDelete={() => onDeleteLesson?.(lesson)}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
