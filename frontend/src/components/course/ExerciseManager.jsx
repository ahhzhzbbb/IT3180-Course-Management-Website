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
  const [submissionText, setSubmissionText] = useState('');
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  // Lưu điểm theo submissionId
  const [gradeScore, setGradeScore] = useState({});

  // Bài nộp của sinh viên hiện tại
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
      console.error('Lỗi tải bài nộp:', e);
    } finally {
      setLoadingSubs(false);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>📝 Bài tập</h3>
        {isInstructor && !isAdding && (
          <button
            className={styles.button}
            onClick={() => setIsAdding(true)}
          >
            ＋ Thêm bài tập
          </button>
        )}
      </div>

      {/* ===== Thêm bài tập ===== */}
      {isInstructor && isAdding && (
        <div className={styles.addForm}>
          <input
            className={styles.input}
            placeholder="Tiêu đề"
            value={newExercise.title}
            onChange={(e) =>
              setNewExercise({ ...newExercise, title: e.target.value })
            }
          />

          <textarea
            className={styles.textArea}
            placeholder="Mô tả"
            value={newExercise.description}
            onChange={(e) =>
              setNewExercise({ ...newExercise, description: e.target.value })
            }
          />

          <div className={styles.buttonGroup}>
            <button
              className={styles.button}
              onClick={() => {
                onAddExercise(newExercise);
                setIsAdding(false);
                setNewExercise({ title: '', description: '' });
              }}
            >
              ✔ Lưu
            </button>

            <button
              className={`${styles.button} ${styles.buttonDanger}`}
              onClick={() => setIsAdding(false)}
            >
              ✖ Hủy
            </button>
          </div>
        </div>
      )}

      {/* ===== Danh sách bài tập ===== */}
      <div style={{ marginTop: 16 }}>
        {exercises.length === 0 && <p>Chưa có bài tập.</p>}

        {exercises.map((ex) => (
          <div key={ex.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <span>{ex.title}</span>
              {isInstructor && (
                <button
                  className={`${styles.button} ${styles.buttonDanger}`}
                  title="Xóa bài tập"
                  onClick={() => onDeleteExercise(ex.id)}
                >
                  ✖
                </button>
              )}
            </div>

            <p>{ex.description}</p>
            <p className={styles.meta}>
              <strong>Số lượt nộp tối đa:</strong> {ex.maxSubmissions || 1}
            </p>

            {/* ===== Instructor ===== */}
            {isInstructor ? (
              <div>
                <button
                  className={styles.button}
                  style={{ marginTop: 10 }}
                  onClick={() => handleToggleSubmissions(ex.id)}
                >
                  {activeExerciseId === ex.id
                    ? 'Ẩn bài nộp'
                    : 'Xem bài nộp & chấm'}
                </button>

                {activeExerciseId === ex.id && (
                  <div className={styles.subsList}>
                    {loadingSubs && <p>Đang tải...</p>}
                    {!loadingSubs && submissions.length === 0 && (
                      <p>Chưa có bài nộp.</p>
                    )}

                    {!loadingSubs &&
                      submissions.map((sub, index) => {
                        const subId = sub.id || sub.submissionId || index;

                        return (
                          <div key={subId} className={styles.subItem}>
                            <p className={styles.studentLabel}>
                              <strong>Học viên:</strong>{' '}
                              {sub.userUsername ||
                                sub.user?.username ||
                                'Unknown'}
                            </p>

                            <p>
                              <strong>Bài làm:</strong>{' '}
                              {sub.solution || sub.content}
                            </p>

                            <div className={styles.gradeBox}>
                              <input
                                type="number"
                                className={styles.gradeInput}
                                placeholder="Điểm"
                                defaultValue={sub.score}
                                onChange={(e) =>
                                  setGradeScore((prev) => ({
                                    ...prev,
                                    [subId]: e.target.value
                                  }))
                                }
                              />

                              <button
                                className={styles.button}
                                onClick={() => {
                                  const score =
                                    gradeScore[subId] ?? sub.score;
                                  if (score !== undefined && score !== '') {
                                    onGradeWork(subId, score);
                                  } else {
                                    alert('Vui lòng nhập điểm!');
                                  }
                                }}
                              >
                                ✔ Chấm
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ) : (
              /* ===== Student ===== */
              <div className={styles.submissionArea}>
                {activeExerciseId !== ex.id && (
                  <button
                    className={styles.button}
                    onClick={async () => {
                      setActiveExerciseId(ex.id);
                      setSubmissionText('');
                      if (onLoadMySubmission) {
                        const mine = await onLoadMySubmission(ex.id);
                        setMySubmission(mine);
                      }
                    }}
                  >
                    ✍ Nộp bài
                  </button>
                )}

                {activeExerciseId === ex.id && (
                  <div style={{ marginTop: 10 }}>
                    <textarea
                      className={styles.textArea}
                      placeholder="Viết lời giải của bạn vào đây..."
                      value={submissionText}
                      onChange={(e) =>
                        setSubmissionText(e.target.value)
                      }
                    />

                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.button}
                        disabled={!submissionText.trim()}
                        onClick={async () => {
                          const created = await onSubmitWork(
                            ex.id,
                            submissionText
                          );
                          setSubmissionText('');
                          if (created) setMySubmission(created);
                        }}
                      >
                        ✔ Xác nhận nộp
                      </button>

                      <button
                        className={`${styles.button} ${styles.buttonDanger}`}
                        onClick={() => {
                          setActiveExerciseId(null);
                          setSubmissionText('');
                        }}
                      >
                        ✖ Hủy
                      </button>
                    </div>

                    {mySubmission ? (
                      <div className={styles.subItem} style={{ marginTop: 10 }}>
                        <p>
                          <strong>Bài nộp của bạn:</strong>{' '}
                          {mySubmission.solution}
                        </p>
                        <p>
                          <strong>Điểm:</strong>{' '}
                          {mySubmission.score ?? 'Chưa có điểm'}
                        </p>
                      </div>
                    ) : (
                      <em>Bạn chưa nộp bài.</em>
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
