import React, { useState } from "react";
import "./AssignmentPage.css";

export default function AssignmentPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`assignment-layout ${collapsed ? "collapsed" : ""}`}>
      {/* SIDEBAR */}
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

      {/* CONTENT */}
      <main className="content">
        <h1 className="title">Tên Bài Tập: HTML Basics</h1>

        {/* VIDEO */}
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

        {/* ASSIGNMENT LIST */}
        <section className="assignment-box">
          <div className="assignment-header">
            <h2>Bài tập</h2>
            <button className="add-btn">+ Thêm bài tập</button>
          </div>

          <ul className="assignment-list">
            <li className="assignment-item">
              <span>Bài tập 1: HTML cơ bản</span>
              <div className="actions">
                <button className="edit-btn">Sửa</button>
                <button className="delete-btn">Xóa</button>
              </div>
            </li>

            <li className="assignment-item">
              <span>Bài tập 2: CSS Layout</span>
              <div className="actions">
                <button className="edit-btn">Sửa</button>
                <button className="delete-btn">Xóa</button>
              </div>
            </li>
          </ul>
        </section>
      </main>

      {/* STUDENT LIST */}
      <aside className="student-list">
        <div className="student-header">
          <h3>Học viên</h3>
          <input
            type="text"
            placeholder="Tìm học viên..."
            className="student-search"
          />
        </div>

        <ul className="student-items">
          <li className="student-item">
            <div className="student-info">
              <strong>Nguyễn Văn A</strong>
              <span>emailA@gmail.com</span>
            </div>
            <button className="view-btn">Xem bài nộp</button>
          </li>

          <li className="student-item">
            <div className="student-info">
              <strong>Trần Thị B</strong>
              <span>emailB@gmail.com</span>
            </div>
            <button className="view-btn">Xem bài nộp</button>
          </li>
        </ul>
      </aside>
    </div>
  );
}
