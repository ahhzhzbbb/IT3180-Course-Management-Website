import React from "react";
import { useState } from "react";

export default function CourseItem({ title, description, onEdit, onDelete , onLink}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="courseitem-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onLink}
    >
        
      <div className="courseitem-content">
        <h3 className="courseitem-title">{title}</h3>
        {description && <p className="courseitem-desc">{description}</p>}
      </div>

      {/* Action buttons shown on hover */}
      <div className={`courseitem-actions ${hovered ? "is-visible" : ""}`}>
        <button className="courseitem-btn" onClick={(e) => {
            e.stopPropagation(); // ngăn onLink chạy
            onEdit && onEdit(e);
          }} aria-label="Chỉnh sửa">
          ✏️ Chỉnh sửa
        </button>
        <button
          className="courseitem-btn courseitem-btn--danger"
          onClick={(e) => {
            e.stopPropagation(); // ngăn onLink chạy
            onDelete && onDelete(e);
          }}
          aria-label="Xóa"
        >
          🗑️ Xóa
        </button>
      </div>
    </div>
  );
}
