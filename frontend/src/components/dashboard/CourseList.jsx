import React, { useState, useMemo, useEffect } from 'react';
import CourseCard from './CourseCard';
import styles from './CourseList.module.css';
import api from '../../api/axiosConfig';

export default function CourseList({ courses, loading, emptyMessage }) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [grade, setGrade] = useState('all');
  const [subject, setSubject] = useState('all');
  const [studentCounts, setStudentCounts] = useState({});
  
  const getPopularity = (c) => {
    const id = c?.id;
    if (id == null) return 0;
    const count = studentCounts[id];
    return typeof count === 'number' ? count : 0;
  };
  const parseDateToMillis = (v) => {
    if (!v) return 0;
    if (typeof v === 'number') return v;
    const t = Date.parse(v);
    return Number.isNaN(t) ? 0 : t;
  };
  const getCreatedAt = (c) => {
    const v =
      c?.createdAt ??
      c?.created_at ??
      c?.createDate ??
      c?.createdDate ??
      c?.publishedAt ??
      c?.publishDate ??
      c?.created_time ??
      c?.createdTime ??
      null;
    return parseDateToMillis(v);
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
  
  // Fetch number of students per course to use for popularity sorting
  useEffect(() => {
    if (!Array.isArray(courses) || courses.length === 0) return;
    const pendingIds = courses
      .map((c) => c?.id)
      .filter((id) => id != null && studentCounts[id] === undefined);
    if (pendingIds.length === 0) return;

    let cancelled = false;
    const fetchCounts = async () => {
      try {
        const entries = await Promise.all(
          pendingIds.map(async (id) => {
            try {
              const res = await api.get(`/courses/${id}/numberOfStudents`);
              const data = res?.data;
              const count = typeof data === 'number' ? data : (data?.count ?? 0);
              return [id, count];
            } catch (e) {
              return [id, 0];
            }
          })
        );
        if (!cancelled) {
          setStudentCounts((prev) => {
            const next = { ...prev };
            for (const [id, count] of entries) next[id] = count;
            return next;
          });
        }
      } catch {
        // noop
      }
    };
    fetchCounts();
    return () => {
      cancelled = true;
    };
    // Only refetch when course ids change or new ids are missing
  }, [courses, studentCounts]);
  
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
      list = [...list].sort((a, b) => getCreatedAt(b) - getCreatedAt(a));
    } else if (sortBy === 'popular') {
      list = [...list].sort((a, b) => getPopularity(b) - getPopularity(a));
    }
    
    return list;
  }, [courses, query, sortBy, grade, subject, studentCounts]);

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
            <option value="all">Tiêu chí sắp xếp</option>
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