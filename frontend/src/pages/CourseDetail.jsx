import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthProvider';
import styles from './CourseDetail.module.css'; // Import Module

// Child Components
import CommentSection from '../components/course/CommentSection';
import ExerciseManager from '../components/course/ExerciseManager';
import VideoPlayer from '../components/course/VideoPlayer';
import CourseSidebar from '../components/course/CourseSidebar';
import { ChapterModal, LessonModal } from '../components/course/CourseModals';

export default function CourseDetail() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const isInstructor = user?.roles?.includes('ROLE_INSTRUCTOR');

  // --- STATE ---
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState({});

  // Comments State
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Modals State
  const [chapterModal, setChapterModal] = useState({ show: false, isEdit: false, id: null, title: '' });
  const [lessonModal, setLessonModal] = useState({ show: false, isEdit: false, chapterId: null, id: null, title: '', videoUrl: '', description: '' });

  // --- API LOGIC (Same as before) ---
  const fetchCourse = () => {
    if (!course) setLoading(true);
    api.get(`/courses/${courseId}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourse(); }, [courseId]);

  useEffect(() => {
    if (course?.chapters?.length > 0) {
      if (activeLesson) {
        const found = course.chapters.flatMap(c => c.lessons).find(l => l.id === activeLesson.id);
        if (found) { setActiveLesson(found); return; }
      }
      const firstChapter = course.chapters[0];
      if (firstChapter?.lessons?.length > 0) {
        setActiveLesson(firstChapter.lessons[0]);
        setExpandedChapters(prev => ({ ...prev, [firstChapter.id]: true }));
      }
    }
  }, [course]);

  useEffect(() => {
    if (activeLesson) {
      setCommentsLoading(true);
      api.get(`/public/comments/${activeLesson.id}`)
        .then(res => setComments(res.data.comments || res.data || []))
        .catch(console.error)
        .finally(() => setCommentsLoading(false));
    }
  }, [activeLesson]);

  // --- HANDLERS (Same as before) ---
  const toggleChapter = (id) => setExpandedChapters(p => ({ ...p, [id]: !p[id] }));
  const handlePostComment = async (content) => {
    await api.post('/public/comment', { userId: user.id, lessonId: activeLesson.id, content });
    const res = await api.get(`/public/comments/${activeLesson.id}`);
    setComments(res.data.comments || res.data || []);
  };
  const handleAddExercise = async (data) => { await api.post(`/lessons/${activeLesson.id}/exercises`, data); fetchCourse(); };
  const handleDeleteExercise = async (exId) => { await api.delete(`/exercises/${exId}`); fetchCourse(); };
  const handleSubmitWork = async (exId, solution) => {
    try {
      // Lưu ý: Kiểm tra xem backend yêu cầu field là 'solution' hay 'content'
      // Ở đây tôi giữ 'solution' theo code cũ của bạn, nhưng bọc trong object
      const res = await api.post(`/exercise/${exId}/submissions/${user.id}`, { 
        solution: solution 
      }); 
      
      alert("Nộp bài thành công!");
      return res.data;
    } catch (error) {
      console.error("Lỗi khi nộp bài:", error);
      alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.");
      return null;
    }
  };

  const handleLoadSubmissions = async (exId) => {
    try {
      const res = await api.get(`/submissions?exerciseId=${exId}`);
      console.log("Dữ liệu thô từ API Submissions:", res.data);

      // Kiểm tra cấu trúc của SubmissionResponse
      // Thông thường sẽ là res.data.content hoặc res.data.submissions
      const data = res.data.content || res.data.submissions || res.data || [];
      
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Lỗi khi load bài nộp:", err);
      return [];
    }
  };
  const handleGradeWork = async (subId, score) => {
    if (!subId || subId === "undefined") {
      alert("Không tìm thấy ID bài nộp!");
      return;
    }

    try {
      // API yêu cầu: /api/submission/{id}/{score}
      // Lưu ý: Bỏ /api ở đầu nếu axiosConfig đã có sẵn prefix /api
      await api.put(`/submission/${subId}/${score}`); 
      
      alert("Đã chấm điểm thành công!");
      // Refresh lại dữ liệu nếu cần
      if (typeof fetchCourse === 'function') fetchCourse(); 
    } catch (error) {
      console.error("Lỗi chấm điểm:", error.response?.data || error.message);
      alert("Lỗi: " + (error.response?.data?.message || "Không thể chấm điểm"));
    }
  };

  const handleSaveChapter = async (e) => {
    e.preventDefault();
    if (chapterModal.isEdit) await api.put(`/chapters/${chapterModal.id}`, { title: chapterModal.title });
    else await api.post(`/courses/${courseId}/chapters`, { title: chapterModal.title });
    setChapterModal({ ...chapterModal, show: false }); fetchCourse();
  };
  const handleDeleteChapter = async (e, id) => {
    if (!window.confirm("Delete?")) return;
    await api.delete(`/chapters/${id}`);
    if (course.chapters.find(c => c.id === id)?.lessons.some(l => l.id === activeLesson?.id)) setActiveLesson(null);
    fetchCourse();
  };
  const handleSaveLesson = async (e) => {
    e.preventDefault();
    const payload = { title: lessonModal.title, videoUrl: lessonModal.videoUrl, description: lessonModal.description };
    if (lessonModal.isEdit) await api.put(`/lessons/${lessonModal.id}`, payload);
    else await api.post(`/chapters/${lessonModal.chapterId}/lessons`, payload);
    setLessonModal({ ...lessonModal, show: false }); fetchCourse();
  };
  const handleDeleteLesson = async (e, id) => {
    if (!window.confirm("Delete?")) return;
    await api.delete(`/lessons/${id}`);
    if (activeLesson?.id === id) setActiveLesson(null);
    fetchCourse();
  };

  if (loading) return <div className={styles.placeholder}>Loading...</div>;
  if (!course) return <div className={styles.placeholder}>Course not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        {activeLesson ? (
          <>
            <VideoPlayer videoUrl={activeLesson.videoUrl} title={activeLesson.title} description={activeLesson.description} />
            <ExerciseManager
              key={`ex-${activeLesson.id}`}
              exercises={activeLesson.exercises || []} isInstructor={isInstructor}
              onAddExercise={handleAddExercise} onDeleteExercise={handleDeleteExercise}
              onSubmitWork={handleSubmitWork} onGradeWork={handleGradeWork} onLoadSubmissions={handleLoadSubmissions}
              // student-specific: function to load the current user's submission for an exercise
              onLoadMySubmission={async (exId) => {
                try {
                  const res = await api.get(`/submissions/my?exerciseId=${exId}`);
                  return res.status === 204 ? null : res.data;
                } catch (err) {
                  if (err.response?.status === 204) return null;
                  console.error('Lỗi tải bài nộp của bạn:', err);
                  return null;
                }
              }}
              // pass the current user so ExerciseManager can identify the student's own submission
              user={user}
            />
            <CommentSection key={`cm-${activeLesson.id}`} comments={comments} loading={commentsLoading} onPostComment={handlePostComment} />
          </>
        ) : (
          <div className={styles.placeholder}>Select a lesson to start learning.</div>
        )}
      </div>

      <CourseSidebar
        course={course} activeLesson={activeLesson} expandedChapters={expandedChapters} isInstructor={isInstructor}
        onToggleChapter={toggleChapter} onSelectLesson={setActiveLesson}
        onAddChapter={() => setChapterModal({ show: true, isEdit: false, id: null, title: '' })}
        onEditChapter={(e, c) => { e.stopPropagation(); setChapterModal({ show: true, isEdit: true, id: c.id, title: c.title }); }}
        onDeleteChapter={handleDeleteChapter}
        onAddLesson={(cId) => { setLessonModal({ show: true, isEdit: false, chapterId: cId, id: null, title: '', videoUrl: '', description: '' }); setExpandedChapters(prev => ({ ...prev, [cId]: true })); }}
        onEditLesson={(e, l) => { e.stopPropagation(); setLessonModal({ show: true, isEdit: true, chapterId: null, id: l.id, title: l.title, videoUrl: l.videoUrl || '', description: l.description || '' }); }}
        onDeleteLesson={handleDeleteLesson}
      />

      <ChapterModal isOpen={chapterModal.show} onClose={() => setChapterModal({ ...chapterModal, show: false })} onSave={handleSaveChapter} title={chapterModal.title} setTitle={(val) => setChapterModal({ ...chapterModal, title: val })} isEdit={chapterModal.isEdit} />
      <LessonModal isOpen={lessonModal.show} onClose={() => setLessonModal({ ...lessonModal, show: false })} onSave={handleSaveLesson} form={lessonModal} setForm={setLessonModal} isEdit={lessonModal.isEdit} />
    </div>
  );
}