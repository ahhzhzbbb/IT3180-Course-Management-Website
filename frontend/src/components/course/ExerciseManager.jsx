import React, { useState } from 'react';
import styles from './ExerciseManager.module.css';

export default function ExerciseManager({ 
  exercises = [], 
  isInstructor, 
  onAddExercise, 
  onDeleteExercise, 
  onSubmitWork, 
  onGradeWork, 
  onLoadSubmissions 
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExercise, setNewExercise] = useState({ title: '', description: '' });
  const [submissionText, setSubmissionText] = useState("");
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  
  // State lưu điểm số theo ID bài nộp
  const [gradeScore, setGradeScore] = useState({});

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
        <h3>📝 Exercises</h3>
        {isInstructor && !isAdding && (
          <button onClick={() => setIsAdding(true)} style={{ fontSize: '0.8em' }}>+ Add Exercise</button>
        )}
      </div>

      {isInstructor && isAdding && (
        <div className={styles.addForm}>
          <input 
            className={styles.input} 
            placeholder="Title" 
            value={newExercise.title} 
            onChange={e => setNewExercise({ ...newExercise, title: e.target.value })} 
          />
          <textarea 
            className={styles.input} 
            placeholder="Description" 
            value={newExercise.description} 
            onChange={e => setNewExercise({ ...newExercise, description: e.target.value })} 
          />
          <div className={styles.buttonGroup}>
            <button onClick={() => { onAddExercise(newExercise); setIsAdding(false); setNewExercise({ title: '', description: '' }); }}>Save</button>
            <button onClick={() => setIsAdding(false)} style={{ background: '#ccc' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '15px' }}>
        {exercises.length === 0 && <p>No exercises assigned.</p>}
        {exercises.map(ex => (
          <div key={ex.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <span>{ex.title}</span>
              {isInstructor && (
                <button className="btn-icon btn-delete" onClick={() => onDeleteExercise(ex.id)}>🗑️</button>
              )}
            </div>
            <p>{ex.description}</p>

            {isInstructor ? (
              <div>
                <button onClick={() => handleToggleSubmissions(ex.id)} style={{ fontSize: '0.8rem', marginTop: 10 }}>
                  {activeExerciseId === ex.id ? 'Hide Submissions' : 'View Submissions & Grade'}
                </button>
                
                {activeExerciseId === ex.id && (
                  <div className={styles.subsList}>
                    {loadingSubs && <p>Loading...</p>}
                    {!loadingSubs && submissions.length === 0 && <p>No submissions.</p>}
                    {!loadingSubs && submissions.map((sub, index) => {
                      // Ưu tiên lấy ID. Nếu cả id và submissionId đều không có, dùng index làm fallback (không khuyến khích)
                      const currentSubId = sub.id || sub.submissionId;

                      return (
                        <div key={currentSubId || index} className={styles.subItem}>
                          <p><strong>Solution:</strong> {sub.solution || sub.content}</p>
                          <div className={styles.gradeBox}>
                            <input 
                              type="number" 
                              className={styles.gradeInput} 
                              placeholder="Score"
                              // Hiển thị điểm đang có trong DB nếu chưa gõ điểm mới
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
                                // Lấy điểm: Nếu state trống thì lấy chính sub.score hiện tại
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
                              Grade
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
                  <button onClick={() => {
                    setActiveExerciseId(ex.id);
                    setSubmissionText("");
                  }}>
                    Submit Work
                  </button>
                )}
                
                {activeExerciseId === ex.id && (
                  <div style={{ marginTop: '10px' }}>
                    <textarea 
                      className={styles.textArea} 
                      placeholder="Type your solution here..." 
                      value={submissionText} 
                      onChange={e => setSubmissionText(e.target.value)} 
                    />
                    <div className={styles.buttonGroup}>
                      <button 
                        disabled={!submissionText.trim()}
                        onClick={async () => {
                          await onSubmitWork(ex.id, submissionText); 
                          setSubmissionText(""); 
                          setActiveExerciseId(null); 
                        }}
                      >
                        Confirm Submit
                      </button>
                      <button 
                        onClick={() => {
                          setActiveExerciseId(null);
                          setSubmissionText("");
                        }} 
                        style={{ background: '#ccc' }}
                      >
                        Cancel
                      </button>
                    </div>
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