import React, { useState } from "react";
import "./AssignmentPage.css";

export default function AssignmentPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`assignment-layout ${collapsed ? "collapsed" : ""}`}>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? ">" : "<"}
        </button>


        {!collapsed && (
          <>
            <h2>Teacher</h2>
            <nav>
              <ul>
                <li>Dashboard</li>
                <li className="active">Bài tập</li>
                <li>Học viên</li>
                <li>Cài đặt</li>
              </ul>
            </nav>
          </>
        )}
      </aside>

      <main className="content">
        <h1 className="title">Tên Bài Tập: HTML Basics</h1>

        <section className="video-box">
          <label>Video YouTube (URL):</label>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </section>
      </main>

      <aside className="student-list">
        <h3>Danh sách học viên</h3>
        <ul>
          <li>Nguyễn Văn A</li>
          <li>Trần Thị B</li>
          <li>Lê Văn C</li>
        </ul>
      </aside>
    </div>
  );
}
