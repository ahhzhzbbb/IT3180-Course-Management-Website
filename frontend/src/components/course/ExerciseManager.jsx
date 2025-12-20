import React, { useState } from 'react';
import styles from './ExerciseManager.module.css';

export default function ExerciseManager({ exercises = [], isInstructor, onAddExercise, onDeleteExercise, onSubmitWork, onGradeWork, onLoadSubmissions }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExercise, setNewExercise] = useState({ title: '', description: '' });
  const [submissionText, setSubmissionText] = useState("");
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [gradeScore, setGradeScore] = useState({});

  const handleToggleSubmissions = async (exId) => {
    if (activeExerciseId === exId) { setActiveExerciseId(null); return; }
    setActiveExerciseId(exId); setLoadingSubs(true);
    try { const data = await onLoadSubmissions(exId); setSubmissions(data || []); } catch (e) { console.error(e); } finally { setLoadingSubs(false); }
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h3>📝 Exercises</h3>
        {isInstructor && !isAdding && <button onClick={() => setIsAdding(true)} style={{ fontSize: '0.8em' }}>+ Add Exercise</button>}
      </div>

      {isInstructor && isAdding && (
        <div className={styles.addForm}>
          <input className={styles.input} placeholder="Title" value={newExercise.title} onChange={e => setNewExercise({ ...newExercise, title: e.target.value })} />
          <textarea className={styles.input} placeholder="Description" value={newExercise.description} onChange={e => setNewExercise({ ...newExercise, description: e.target.value })} />
          <div className={styles.buttonGroup}>
            <button onClick={() => { onAddExercise(newExercise); setIsAdding(false); setNewExercise({ title: '', desc: '' }); }}>Save</button>
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
              {isInstructor && <button className="btn-icon btn-delete" onClick={() => onDeleteExercise(ex.id)}>🗑️</button>}
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
                    {submissions.map(sub => (
                      <div key={sub.id} className={styles.subItem}>
                        <p><strong>Solution:</strong> {sub.solution}</p>
                        <div className={styles.gradeBox}>
                          <input type="number" className={styles.gradeInput} defaultValue={sub.score} onChange={(e) => setGradeScore({ ...gradeScore, [sub.id]: e.target.value })} />
                          <button onClick={() => { if (gradeScore[sub.id]) onGradeWork(sub.id, gradeScore[sub.id]); }} style={{ padding: '2px 8px' }}>Grade</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.submissionArea}>
                {activeExerciseId !== ex.id && <button onClick={() => setActiveExerciseId(ex.id)}>Submit Work</button>}
                {activeExerciseId === ex.id && (
                  <>
                    <textarea className={styles.textArea} placeholder="Type solution..." value={submissionText} onChange={e => setSubmissionText(e.target.value)} />
                    <div className={styles.buttonGroup}>
                      <button onClick={() => { onSubmitWork(ex.id, submissionText); setSubmissionText(""); setActiveExerciseId(null); }}>Submit</button>
                      <button onClick={() => setActiveExerciseId(null)} style={{ background: '#ccc' }}>Cancel</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}