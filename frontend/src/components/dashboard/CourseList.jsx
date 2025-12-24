import React, { useState, useMemo } from 'react';
import CourseCard from './CourseCard';
import styles from './CourseList.module.css';

export default function CourseList({ courses, loading, emptyMessage }) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [grade, setGrade] = useState('all');
  const [subject, setSubject] = useState('all');
  
  const getCreatedAt = (c) => c?.createdAt || c?.created_at || 0;
  const getPopularity = (c) => {
    const candidates = [
      c?.popularity,
      c?.popular,
      c?.enrolledCount,
      c?.enrollmentCount,
      c?.enrollCount,
      c?.studentsCount,
      c?.learnersCount,
      c?.views,
      c?.viewCount,
    ];
    for (const v of candidates) {
      if (typeof v === 'number') return v;
      if (Array.isArray(v)) return v.length;
    }
    if (Array.isArray(c?.enrollments)) return c.enrollments.length;
    if (Array.isArray(c?.students)) return c.students.length;
    return 0;
  };
  const parseTitleParts = (titleLike) => {
    const title = typeof titleLike === 'string' ? titleLike.trim() : '';
    if (!title) return { subject: null, grade: null };
    // Match: "<subject> [-(khối|lớp)] <gradeNumber>" e.g., "Toán 10", "Vật lý - 11", "Hóa học khối 12"
    const re = /^(.+?)(?:\s*[-–—]?\s*(?:khối|lớp))?\s*(\d{1,2})\s*$/iu;
    const m = title.match(re);
    if (m) {
      const subject = m[1]?.trim() || null;
      const grade = m[2]?.trim() || null;
      return { subject, grade };
    }
    return { subject: null, grade: null };
  };
  const getGrade = (c) => {
    const { grade } = parseTitleParts(c?.title || c?.name || '');
    return grade ?? c?.grade ?? c?.gradeLevel ?? c?.grade_level ?? c?.level ?? c?.class;
  };
  const getSubject = (c) => {
    const { subject } = parseTitleParts(c?.title || c?.name || '');
    return subject ?? c?.subject ?? c?.category ?? c?.topic;
  };
  
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
    if (grade !== 'all') {
      const gq = String(grade).toLowerCase();
      list = list.filter(c => {
        const g = getGrade(c);
        return g != null && String(g).toLowerCase() === gq;
      });
    }

    if (subject !== 'all') {
      const sq = String(subject).toLowerCase();
      list = list.filter(c => {
        const s = getSubject(c);
        return s != null && String(s).toLowerCase() === sq;
      });
    }

    if (sortBy === 'newest') {
      list = [...list].sort((a, b) => new Date(getCreatedAt(b)) - new Date(getCreatedAt(a)));
    } else if (sortBy === 'popular') {
      list = [...list].sort((a, b) => getPopularity(b) - getPopularity(a));
    }

    return list;
  }, [courses, query, sortBy, grade, subject]);

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
          <select className={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sắp xếp khóa học">
            <option value="popular">Phổ biến nhất</option>
            <option value="newest">Mới nhất</option>
          </select>

          <select className={styles.select} value={grade} onChange={(e) => setGrade(e.target.value)} aria-label="Lọc theo khối">
            <option value="all">Tất cả khối</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>

          <select className={styles.select} value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Lọc theo môn">
            <option value="all">Tất cả môn</option>
            <option value="Toán">Toán</option>
            <option value="Vật lý">Vật lý</option>
            <option value="Hóa học">Hóa học</option>
            <option value="Sinh học">Sinh học</option>
            <option value="Ngữ văn">Ngữ văn</option>
            <option value="Lịch sử">Lịch sử</option>
            <option value="Địa lý">Địa lý</option>
            <option value="Tiếng Anh">Tiếng Anh</option>
          </select>
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
          { filtered.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
}