import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthProvider';
import '../styles/global.css';

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

  // Comments State (Lifted Up)
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // Modals State
  const [chapterModal, setChapterModal] = useState({ show: false, isEdit: false, id: null, title: '' });
  const [lessonModal, setLessonModal] = useState({ show: false, isEdit: false, chapterId: null, id: null, title: '', videoUrl: '', description: '' });

  // --- API / DATA LOGIC ---
  const fetchCourse = () => {
    // Only show loading spinner if we don't have course data yet
    if (!course) setLoading(true);

    api.get(`/courses/${courseId}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error("Failed to fetch course:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourse(); }, [courseId]);

  // Set Active Lesson Logic
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

  // Load Comments when Active Lesson Changes
  useEffect(() => {
    if (activeLesson) {
      setCommentsLoading(true);
      api.get(`/public/comments/${activeLesson.id}`)
        .then(res => setComments(res.data.comments || res.data || []))
        .catch(err => console.error(err))
        .finally(() => setCommentsLoading(false));
    }
  }, [activeLesson]);

  // --- HANDLERS ---
  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const handlePostComment = async (content) => {
    try {
      await api.post('/public/comment', { userId: user.id, lessonId: activeLesson.id, content });
      const res = await api.get(`/public/comments/${activeLesson.id}`);
      setComments(res.data.comments || res.data || []);
    } catch (err) { alert("Failed to post comment"); }
  };

  // Exercise Handlers
  const handleAddExercise = async (data) => {
    try {
      await api.post(`/lessons/${activeLesson.id}/exercises`, data);
      fetchCourse(); // Refresh course structure
    } catch (err) { alert("Failed to add exercise"); }
  };

  const handleDeleteExercise = async (exId) => {
    try {
      await api.delete(`/exercises/${exId}`);
      fetchCourse();
    } catch (err) { alert("Failed to delete exercise"); }
  };

  const handleSubmitWork = async (exId, solution) => {
    try {
      await api.post('/submissions', { userId: user.id, exerciseId: exId, solution });
      alert("Submitted!");
    } catch (err) { alert("Failed to submit"); }
  };

  const handleLoadSubmissions = async (exId) => {
    const res = await api.get(`/submissions?exerciseId=${exId}`);
    return res.data.submissions || res.data || [];
  };

  const handleGradeWork = async (subId, score) => {
    try {
      await api.put(`/submission/${subId}?score=${score}`);
      alert("Graded!");
    } catch (err) { alert("Failed to grade"); }
  };

  // Chapter Modal Handlers
  const handleSaveChapter = async (e) => {
    e.preventDefault();
    if (!chapterModal.title.trim()) return;
    try {
      if (chapterModal.isEdit) await api.put(`/chapters/${chapterModal.id}`, { title: chapterModal.title });
      else await api.post(`/courses/${courseId}/chapters`, { title: chapterModal.title });
      setChapterModal({ ...chapterModal, show: false });
      fetchCourse();
    } catch (err) { alert("Failed to save chapter"); }
  };

  const handleDeleteChapter = async (e, chapterId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this chapter?")) return;
    try {
      await api.delete(`/chapters/${chapterId}`);
      if (course.chapters.find(c => c.id === chapterId)?.lessons.some(l => l.id === activeLesson?.id)) setActiveLesson(null);
      fetchCourse();
    } catch (err) { alert("Failed to delete"); }
  };

  // Lesson Modal Handlers
  const handleSaveLesson = async (e) => {
    e.preventDefault();
    if (!lessonModal.title.trim()) return;
    try {
      const payload = { title: lessonModal.title, videoUrl: lessonModal.videoUrl, description: lessonModal.description };
      if (lessonModal.isEdit) await api.put(`/lessons/${lessonModal.id}`, payload);
      else await api.post(`/chapters/${lessonModal.chapterId}/lessons`, payload);
      setLessonModal({ ...lessonModal, show: false });
      fetchCourse();
    } catch (err) { alert("Failed to save lesson"); }
  };

  const handleDeleteLesson = async (e, lessonId) => {
    e.stopPropagation();
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await api.delete(`/lessons/${lessonId}`);
      if (activeLesson?.id === lessonId) setActiveLesson(null);
      fetchCourse();
    } catch (err) { alert("Failed to delete"); }
  };

  // --- RENDER ---
  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading Course...</div>;
  if (!course) return <div style={{ padding: 40, textAlign: 'center' }}>Course not found</div>;

  return (
    <div className="course-container">

      {/* LEFT COLUMN: Player & Details */}
      <div className="course-left-column">
        {activeLesson ? (
          <>
            <VideoPlayer
              videoUrl={activeLesson.videoUrl}
              title={activeLesson.title}
              description={activeLesson.description}
            />

            {/* --- ENSURE THIS IS THE ONLY EXERCISE MANAGER --- */}
            <ExerciseManager
              key={`ex-${activeLesson.id}`}
              exercises={activeLesson.exercises || []}
              isInstructor={isInstructor}
              onAddExercise={handleAddExercise}
              onDeleteExercise={handleDeleteExercise}
              onSubmitWork={handleSubmitWork}
              onGradeWork={handleGradeWork}
              onLoadSubmissions={handleLoadSubmissions}
            />

            <CommentSection
              key={`cm-${activeLesson.id}`}
              comments={comments}
              loading={commentsLoading}
              onPostComment={handlePostComment}
              user={user}
            />
          </>
        ) : (
          <div style={{ padding: 20, color: 'white' }}>Select a lesson to start learning.</div>
        )}
      </div>

      {/* RIGHT COLUMN: Sidebar */}
      <CourseSidebar
        course={course}
        activeLesson={activeLesson}
        expandedChapters={expandedChapters}
        isInstructor={isInstructor}
        onToggleChapter={toggleChapter}
        onSelectLesson={setActiveLesson}
        onAddChapter={() => setChapterModal({ show: true, isEdit: false, id: null, title: '' })}
        onEditChapter={(e, c) => { e.stopPropagation(); setChapterModal({ show: true, isEdit: true, id: c.id, title: c.title }); }}
        onDeleteChapter={handleDeleteChapter}
        onAddLesson={(cId) => { setLessonModal({ show: true, isEdit: false, chapterId: cId, id: null, title: '', videoUrl: '', description: '' }); setExpandedChapters(prev => ({ ...prev, [cId]: true })); }}
        onEditLesson={(e, l) => { e.stopPropagation(); setLessonModal({ show: true, isEdit: true, chapterId: null, id: l.id, title: l.title, videoUrl: l.videoUrl || '', description: l.description || '' }); }}
        onDeleteLesson={handleDeleteLesson}
      />

      {/* MODALS */}
      <ChapterModal
        isOpen={chapterModal.show}
        onClose={() => setChapterModal({ ...chapterModal, show: false })}
        onSave={handleSaveChapter}
        title={chapterModal.title}
        setTitle={(val) => setChapterModal({ ...chapterModal, title: val })}
        isEdit={chapterModal.isEdit}
      />

      <LessonModal
        isOpen={lessonModal.show}
        onClose={() => setLessonModal({ ...lessonModal, show: false })}
        onSave={handleSaveLesson}
        form={lessonModal}
        setForm={setLessonModal}
        isEdit={lessonModal.isEdit}
      />
    </div>
  );
}