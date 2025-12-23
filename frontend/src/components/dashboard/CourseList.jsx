import React, { useState, useMemo } from 'react';
import CourseCard from './CourseCard';
import styles from './CourseList.module.css';

export default function CourseList({ courses, loading, emptyMessage }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');

  const filtered = useMemo(() => {
    if (!Array.isArray(courses)) return [];
    const q = query.trim().toLowerCase();
    let list = courses;
    if (q) {
      list = list.filter(c => {
        const title = (c.title || c.name || '').toLowerCase();
        const desc = (c.description || '').toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }
    if (sort === 'newest') {
      list = [...list].sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0));
    }
    return list;
  }, [courses, query, sort]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Đang tải khóa học...</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3>{emptyMessage || 'Không có khóa học nào'}</h3>
        
      </div>
    );
  }

  return (
    <>
      <div className={styles.toolbar} role="toolbar" aria-label="Course filters">
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            placeholder={'Tìm khóa học...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={'Tìm khóa học'}
          />
        </div>
        <div className={styles.controls}>
          <select className={styles.select} value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort courses">
            <option value="popular">Phổ biến nhất</option>
            <option value="newest">Mới nhất</option>
          </select>
          <button className="btn-icon" onClick={() => { setQuery(''); setSort('popular'); }} aria-label="Clear filters">✕</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3>Không có kết quả</h3>
          <p className={styles.small}>Hãy thử từ khóa khác hoặc xóa bộ lọc.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
}