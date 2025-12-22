import React from 'react';
import styles from './CourseModals.module.css';

export function ChapterModal({ isOpen, onClose, onSave, title, setTitle, isEdit }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <h3>{isEdit ? 'Chỉnh sửa chương' : 'Thêm chương mới'}</h3>
        <form onSubmit={onSave} className={styles.form}>
          <input
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
            placeholder="VD. Chương 1: Giới thiệu"
          />
          <div className={styles.actions}>
            <div className={styles.saveBtnWrapper}>
              <button type="submit" className="btn-primary">Lưu</button>
            </div>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Hủy</button>
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
        <h3>{isEdit ? 'Chỉnh sửa bài học' : 'Thêm bài học'}</h3>
        <form onSubmit={onSave} className={styles.form}>
          <input
            className={styles.input}
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Tên bài học"
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
            placeholder="Mô tả bài học"
          />
          <div className={styles.actions}>
            <div className={styles.saveBtnWrapper}>
              <button type="submit" className="btn-primary">Lưu</button>
            </div>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
}