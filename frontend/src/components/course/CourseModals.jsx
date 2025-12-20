import React from 'react';
import styles from './CourseModals.module.css';

export function ChapterModal({ isOpen, onClose, onSave, title, setTitle, isEdit }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? 'Edit Chapter' : 'Add New Chapter'}</h3>
        <form onSubmit={onSave} className={styles.form}>
          <input
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
            placeholder="e.g. Chapter 1: Introduction"
          />
          <div className={styles.actions}>
            <div className={styles.saveBtnWrapper}>
              <button type="submit" className="btn-primary">Save</button>
            </div>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LessonModal({ isOpen, onClose, onSave, form, setForm, isEdit }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? 'Edit Lesson' : 'Add New Lesson'}</h3>
        <form onSubmit={onSave} className={styles.form}>
          <input
            className={styles.input}
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Lesson Title"
          />
          <input
            className={styles.input}
            value={form.videoUrl}
            onChange={e => setForm({ ...form, videoUrl: e.target.value })}
            placeholder="Video URL (YouTube)"
          />
          <textarea
            className={styles.textarea}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            placeholder="Brief description of this lesson..."
          />
          <div className={styles.actions}>
            <div className={styles.saveBtnWrapper}>
              <button type="submit" className="btn-primary">Save</button>
            </div>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}