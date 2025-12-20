import React, { useState } from 'react';
import styles from './CommentSection.module.css';

export default function CommentSection({ comments = [], loading, onPostComment }) {
  const [newComment, setNewComment] = useState("");

  return (
    <div className={styles.section}>
      <h3>Discussion</h3>
      <div className={styles.inputRow}>
        <input className={styles.input} type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Ask a question..." />
        <button className="btn-primary" onClick={() => { if (newComment.trim()) { onPostComment(newComment); setNewComment(""); } }}>Post</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div>
          {comments.length === 0 && <p style={{ color: '#888' }}>No comments yet.</p>}
          {comments.map(c => (
            <div key={c.id} className={styles.item}>
              <div className={styles.meta}>{c.userName || "User"}</div>
              <div style={{ marginTop: 5 }}>{c.content}</div>
              <div className={styles.date}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}