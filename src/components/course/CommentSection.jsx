import React, { useState } from 'react';

export default function CommentSection({ comments = [], loading, onPostComment, user }) {
  const [newComment, setNewComment] = useState("");

  const handlePost = () => {
    if (!newComment.trim()) return;
    onPostComment(newComment); // Call parent handler
    setNewComment("");
  };

  return (
    <div className="comment-section" style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h3>Discussion</h3>

      {/* Input */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ask a question..."
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button onClick={handlePost} className="btn-primary">Post</button>
      </div>

      {/* List */}
      {loading ? <p>Loading comments...</p> : (
        <div className="comment-list">
          {comments.length === 0 && <p style={{ color: '#888' }}>No comments yet.</p>}
          {comments.map((c) => (
            <div key={c.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.9em' }}>{c.userName || "User"}</div>
              <div style={{ marginTop: '5px' }}>{c.content}</div>
              <div style={{ fontSize: '0.8em', color: '#999', marginTop: '5px' }}>
                {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}