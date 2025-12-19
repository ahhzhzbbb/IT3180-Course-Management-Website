import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import '../App.css';

export default function CourseDetail() {
  const { courseId } = useParams();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const isInstructor = user?.roles?.includes('ROLE_INSTRUCTOR');

  // --- FETCH DATA ---
  const fetchCourse = () => {
    api.get(`/courses/${courseId}`)
      .then(res => {
        setCourse(res.data);
        // If no lesson is active, set the first one automatically
        if (!activeLesson && res.data.chapters?.length > 0 && res.data.chapters[0].lessons?.length > 0) {
          setActiveLesson(res.data.chapters[0].lessons[0]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  // --- ACTIONS ---

  // 1. DELETE CHAPTER FUNCTION
  const handleDeleteChapter = async (chapterId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ENTIRE chapter? All lessons inside it will be lost.");
    if (!confirmDelete) return;

    try {
      await api.delete(`/chapters/${chapterId}`);

      // If the currently playing lesson was inside this deleted chapter, clear the player
      const chapterDeleted = course.chapters.find(c => c.id === chapterId);
      const isPlayingDeletedLesson = chapterDeleted?.lessons.some(l => l.id === activeLesson?.id);

      if (isPlayingDeletedLesson) {
        setActiveLesson(null);
      }

      fetchCourse(); // Refresh the list
    } catch (err) {
      console.error("Error deleting chapter:", err);
      alert("Failed to delete chapter. Please try again.");
    }
  };

  const handleDeleteLesson = async (e, lessonId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await api.delete(`/lessons/${lessonId}`);
      if (activeLesson?.id === lessonId) setActiveLesson(null);
      fetchCourse();
    } catch (err) {
      alert("Failed to delete lesson");
    }
  };

  const openEditModal = (e, lesson) => {
    e.stopPropagation();
    setEditingLesson({ ...lesson });
  };

  const handleUpdateLesson = async () => {
    if (!editingLesson) return;
    try {
      await api.put(`/lessons/${editingLesson.id}`, {
        title: editingLesson.title,
        description: editingLesson.description,
        videoUrl: editingLesson.videoUrl
      });
      setEditingLesson(null);
      fetchCourse();

      if (activeLesson?.id === editingLesson.id) {
        setActiveLesson(editingLesson);
      }
    } catch (err) {
      alert("Failed to update lesson");
    }
  };

  // --- HELPER: VIDEO PLAYER ---
  const renderVideo = (url) => {
    if (!url) return <div style={{ color: 'white' }}>No Video URL Provided</div>;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const embedUrl = url.replace('watch?v=', 'embed/');
      return <iframe src={embedUrl} title="Lesson Video" frameBorder="0" allowFullScreen></iframe>;
    } else {
      return <video src={url} controls />;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="course-container">

      {/* LEFT: PLAYER SECTION */}
      <div className="video-section">
        <div className="video-wrapper">
          {activeLesson ? renderVideo(activeLesson.videoUrl) : <div style={{ color: 'white' }}>Select a lesson to start</div>}
        </div>

        {activeLesson && (
          <div className="lesson-details">
            <h2>{activeLesson.title}</h2>
            <p>{activeLesson.description || "No description available."}</p>
          </div>
        )}
      </div>

      {/* RIGHT: CURRICULUM LIST */}
      <div className="curriculum-section">
        <h2>Course Content</h2>
        {isInstructor && <button className="btn-primary" onClick={() => {
          const t = prompt("Enter Chapter Title:");
          if (t) api.post(`/courses/${courseId}/chapters`, { title: t }).then(fetchCourse);
        }}>+ New Chapter</button>}

        {course.chapters && course.chapters.map(chapter => (
          <div key={chapter.id} className="chapter-item">
            <div className="chapter-header">
              <strong>{chapter.title}</strong>

              {/* 2. CONNECTED DELETE BUTTON */}
              {isInstructor && (
                <button
                  className="btn-icon btn-delete"
                  onClick={() => handleDeleteChapter(chapter.id)}
                  title="Delete Chapter"
                >
                  🗑️
                </button>
              )}
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              {chapter.lessons && chapter.lessons.map(lesson => (
                <li
                  key={lesson.id}
                  className={`lesson-item ${activeLesson?.id === lesson.id ? 'active' : ''}`}
                  onClick={() => setActiveLesson(lesson)}
                >
                  <span>🎥 {lesson.title}</span>

                  {isInstructor && (
                    <div className="actions">
                      <button
                        className="btn-icon btn-edit"
                        onClick={(e) => openEditModal(e, lesson)}
                        title="Edit Lesson"
                      >
                        ✏️
                      </button>

                      <button
                        className="btn-icon btn-delete"
                        onClick={(e) => handleDeleteLesson(e, lesson.id)}
                        title="Delete Lesson"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {isInstructor && (
              <button
                style={{ fontSize: '12px', marginTop: '5px' }}
                onClick={() => {
                  const t = prompt("Lesson Title?");
                  const v = prompt("Video URL?");
                  if (t) api.post(`/chapters/${chapter.id}/lessons`, { title: t, videoUrl: v, description: "" }).then(fetchCourse);
                }}
              >
                + Add Lesson
              </button>
            )}
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingLesson && (
        <div className="modal-overlay" onClick={() => setEditingLesson(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Edit Lesson</h3>

            <label>Title</label>
            <input
              value={editingLesson.title}
              onChange={e => setEditingLesson({ ...editingLesson, title: e.target.value })}
            />

            <label>Description</label>
            <textarea
              value={editingLesson.description || ''}
              onChange={e => setEditingLesson({ ...editingLesson, description: e.target.value })}
            />

            <label>Video URL</label>
            <input
              value={editingLesson.videoUrl || ''}
              onChange={e => setEditingLesson({ ...editingLesson, videoUrl: e.target.value })}
            />

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handleUpdateLesson} style={{ backgroundColor: '#4CAF50', color: 'white' }}>Save Changes</button>
              <button onClick={() => setEditingLesson(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}