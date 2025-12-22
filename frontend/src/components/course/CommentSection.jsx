import React, { useState } from 'react';
import styles from './CommentSection.module.css';

export default function CommentSection({ comments = [], loading, onPostComment }) {
  const [newComment, setNewComment] = useState("");

  return (
    <div className={styles.section}>
      <h3>Thảo luận</h3>
      <div className={styles.inputRow}>
        <input className={styles.input} type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Đặt câu hỏi ..." />
        <button className="btn-primary" onClick={() => { if (newComment.trim()) { onPostComment(newComment); setNewComment(""); } }}>Đăng</button>
      </div>
      {loading ? <p>Đang tải...</p> : (
        <div>
          {comments.length === 0 && <p style={{ color: '#888' }}>Chưa có bình luận.</p>}
          {comments.map(c => (
            <div key={c.id} className={styles.item}>
              <div className={styles.meta}>{c.userName || "Người dùng"}</div>
              <div style={{ marginTop: 5 }}>{c.content}</div>
              <div className={styles.date}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}