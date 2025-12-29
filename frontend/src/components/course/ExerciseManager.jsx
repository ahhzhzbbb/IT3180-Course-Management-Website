import React, { useState } from 'react';
import styles from './ExerciseManager.module.css';

export default function ExerciseManager({ 
  exercises = [], 
  isInstructor, 
  onAddExercise, 
  onDeleteExercise, 
  onSubmitWork, 
  onGradeWork, 
  onLoadSubmissions,
  onLoadMySubmission,
  user
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExercise, setNewExercise] = useState({ title: '', description: '' });
  const [submissionText, setSubmissionText] = useState("");
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  
  const [gradeScore, setGradeScore] = useState({});

  const [mySubmission, setMySubmission] = useState(null);

  const handleToggleSubmissions = async (exId) => {
    if (activeExerciseId === exId) {
      setActiveExerciseId(null);
      return;
    }
    setActiveExerciseId(exId);
    setLoadingSubs(true);
    try {
      const data = await onLoadSubmissions(exId);
      setSubmissions(data || []);
    } catch (e) {
      console.error("Lỗi tải danh sách bài nộp:", e);
    } finally {
      setLoadingSubs(false);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>📝 Bài tập</h3>
        {isInstructor && !isAdding && (
          <button className={`${styles.btn} ${styles['btn-primary']}`} onClick={() => setIsAdding(true)}>+ Thêm bài tập</button>
        )}
      </div>

      {isInstructor && isAdding && (
        <div className={styles.addForm}>
          <input 
            className={styles.input} 
            placeholder="Tiêu đề" 
            value={newExercise.title} 
            onChange={e => setNewExercise({ ...newExercise, title: e.target.value })} 
          />
          <textarea 
            className={styles.input} 
            placeholder="Mô tả" 
            value={newExercise.description} 
            onChange={e => setNewExercise({ ...newExercise, description: e.target.value })} 
          />
          <div className={styles.buttonGroup}>
            <button className={`${styles.btn} ${styles['btn-primary']}`} onClick={() => { onAddExercise(newExercise); setIsAdding(false); setNewExercise({ title: '', description: '' }); }}>Lưu</button>
            <button className={`${styles.btn} ${styles['btn-secondary']}`} onClick={() => setIsAdding(false)}>Hủy</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '15px' }}>
        {exercises.length === 0 && <p>Chưa có bài tập.</p>}
        {exercises.map(ex => (
          <div key={ex.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <span>{ex.title}</span>
              {isInstructor && (
                <button className={`${styles['btn-icon']} ${styles['btn-delete']}`} onClick={() => onDeleteExercise(ex.id)}>🗑️</button>
              )}
            </div>
            <p>{ex.description}</p>
            <p className={styles.meta}><strong>Số lượt nộp tối đa:</strong> {ex.maxSubmissions || 1}</p>

            {isInstructor ? (
              <div>
                <button onClick={() => handleToggleSubmissions(ex.id)} style={{ fontSize: '0.8rem', marginTop: 10 }}>
                  {activeExerciseId === ex.id ? 'Ẩn bài nộp' : 'Xem bài nộp & chấm'}
                </button>
                
                {activeExerciseId === ex.id && (
                  <div className={styles.subsList}>
                    {loadingSubs && <p>Đang tải...</p>}
                    {!loadingSubs && submissions.length === 0 && <p>Chưa có bài nộp.</p>}
                    {!loadingSubs && submissions.map((sub, index) => {
                      const currentSubId = sub.id || sub.submissionId;

                      return (
                        <div key={currentSubId || index} className={styles.subItem}>
                          <p className={styles.studentLabel}><strong>Học viên:</strong> {sub.userUsername || (sub.user && sub.user.username) || 'Unknown'}</p>
                          <p><strong>Bài làm:</strong> {sub.solution || sub.content}</p>
                          <div className={styles.gradeBox}>
                            <input 
                              type="number" 
                              className={styles.gradeInput} 
                              placeholder="Điểm"
                              defaultValue={sub.score} 
                              onChange={(e) => {
                                const val = e.target.value;
                                setGradeScore(prev => ({ 
                                  ...prev, 
                                  [currentSubId]: val 
                                }));
                              }} 
                            />
                            <button 
                              onClick={() => { 
                                const scoreToSubmit = gradeScore[currentSubId] !== undefined ? gradeScore[currentSubId] : sub.score;
                                
                                console.log("ID bài nộp:", currentSubId, "Điểm chấm:", scoreToSubmit);

                                if (currentSubId && scoreToSubmit !== undefined && scoreToSubmit !== "") {
                                  onGradeWork(currentSubId, scoreToSubmit); 
                                } else {
                                  alert("Vui lòng nhập điểm hoặc kiểm tra ID bài nộp!");
                                }
                              }} 
                              style={{ padding: '2px 8px' }}
                            >
                              Chấm
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.submissionArea}>
                {activeExerciseId !== ex.id && (
                  <button onClick={async () => {
                    setActiveExerciseId(ex.id);
                    setSubmissionText("");

                    if (typeof onLoadMySubmission === 'function') {
                      try {
                        const mine = await onLoadMySubmission(ex.id);
                        setMySubmission(mine);
                      } catch (e) {
                        console.error('Không thể tải bài nộp của bạn:', e);
                      }
                    }
                  }}>
                    Nộp bài
                  </button>
                )}
                
                {activeExerciseId === ex.id && (
                  <div style={{ marginTop: '10px' }}>
                    <textarea 
                      className={styles.textArea} 
                      placeholder="Viết lời giải của cưng vào đây..." 
                      value={submissionText} 
                      onChange={e => setSubmissionText(e.target.value)} 
                    />
                    <div className={styles.buttonGroup}>
                      <button 
                        disabled={!submissionText.trim()}
                        onClick={async () => {
                          const created = await onSubmitWork(ex.id, submissionText);
                          setSubmissionText("");
                          setActiveExerciseId(ex.id);
                          if (created) setMySubmission(created);
                        }}
                      >
                        Xác nhận nộp
                      </button>
                      <button 
                        onClick={() => {
                          setActiveExerciseId(null);
                          setSubmissionText("");
                        }} 
                        style={{ background: '#ccc' }}
                      >
                        Hủy
                      </button>
                    </div>

                    {mySubmission ? (
                      <div style={{ marginTop: 10, padding: 10, border: '1px solid #eee', background: '#fff' }}>
                        <p><strong>Bài nộp của bạn:</strong> {mySubmission.solution}</p>
                        <p><strong>Điểm:</strong> {mySubmission.score !== null && mySubmission.score !== undefined ? mySubmission.score : 'Chưa có điểm'}</p>
                      </div>
                    ) : (
                      <div style={{ marginTop: 10 }}><em>You haven't submitted yet.</em></div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}