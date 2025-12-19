import React from "react";
import { useState } from "react";

export default function CourseItem({ title, description, onLink}) {

  return (
    <div
      className="courseitem-card"
      onClick={onLink}
    > 
      <div className="courseitem-content">
        <h3 className="courseitem-title">{title}</h3>
        {description && <p className="courseitem-desc">{description}</p>}
      </div>
    </div>
  );
}
