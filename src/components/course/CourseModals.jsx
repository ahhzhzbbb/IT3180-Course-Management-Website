import React from 'react';

export function ChapterModal({ isOpen, onClose, onSave, title, setTitle, isEdit }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? 'Edit Chapter' : 'Add New Chapter'}</h3>
        <form onSubmit={onSave}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
            placeholder="Chapter Title"
          />
          <div style={{ marginTop: 15, display: 'flex', gap: 10 }}>
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LessonModal({ isOpen, onClose, onSave, form, setForm, isEdit }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? 'Edit Lesson' : 'Add New Lesson'}</h3>
        <form onSubmit={onSave} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Lesson Title"
          />
          <input
            value={form.videoUrl}
            onChange={e => setForm({ ...form, videoUrl: e.target.value })}
            placeholder="Video URL"
          />
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            placeholder="Description"
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}