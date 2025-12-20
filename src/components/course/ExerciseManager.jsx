import React, { useState } from 'react';

export default function ExerciseManager({
  exercises = [],
  isInstructor,
  onAddExercise,
  onDeleteExercise,
  onSubmitWork,
  onGradeWork,
  onLoadSubmissions // Parent function that returns a Promise with submissions
}) {

  // Local UI State (Forms, Toggles)
  const [isAdding, setIsAdding] = useState(false);
  const [newExercise, setNewExercise] = useState({ title: '', description: '' });
  const [submissionText, setSubmissionText] = useState("");
  const [activeExerciseId, setActiveExerciseId] = useState(null);

  // Local Data State (fetched via parent prop)
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [gradeScore, setGradeScore] = useState({});

  // --- HANDLERS (Calling Parent Props) ---

  const handleAddClick = () => {
    onAddExercise(newExercise);
    setIsAdding(false);
    setNewExercise({ title: '', description: '' });
  };

  const handleSubmitClick = (exId) => {
    onSubmitWork(exId, submissionText);
    setSubmissionText("");
    setActiveExerciseId(null);
  };

  const handleToggleSubmissions = async (exId) => {
    if (activeExerciseId === exId) {
      setActiveExerciseId(null);
      return;
    }
    setActiveExerciseId(exId);
    setLoadingSubs(true);
    try {
      // Call parent to get data, then set local state for display
      const data = await onLoadSubmissions(exId);
      setSubmissions(data || []);
    } catch (error) {
      console.error(error);
      setSubmissions([]);
    } finally {
      setLoadingSubs(false);
    }
  };

  const handleGradeClick = (subId) => {
    const score = gradeScore[subId];
    if (score !== undefined) onGradeWork(subId, score);
  };

  return (
    <div className="exercise-section" style={{ marginTop: '20px', padding: '20px', background: '#f0f8ff', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>📝 Exercises</h3>
        {isInstructor && !isAdding && (
          <button onClick={() => setIsAdding(true)} style={{ fontSize: '0.8em' }}>+ Add Exercise</button>
        )}
      </div>

      {/* ADD FORM */}
      {isInstructor && isAdding && (
        <div style={{ background: 'white', padding: '10px', marginTop: '10px', borderRadius: '5px' }}>
          <input placeholder="Title" value={newExercise.title} onChange={e => setNewExercise({ ...newExercise, title: e.target.value })} style={{ display: 'block', marginBottom: '5px', width: '100%' }} />
          <textarea placeholder="Description" value={newExercise.description} onChange={e => setNewExercise({ ...newExercise, description: e.target.value })} style={{ display: 'block', marginBottom: '5px', width: '100%' }} />
          <button onClick={handleAddClick}>Save</button>
          <button onClick={() => setIsAdding(false)} style={{ marginLeft: '5px', background: '#ccc' }}>Cancel</button>
        </div>
      )}

      {/* LIST */}
      <div style={{ marginTop: '15px' }}>
        {exercises.length === 0 && <p>No exercises assigned.</p>}

        {exercises.map(ex => (
          <div key={ex.id} style={{ background: 'white', padding: '15px', marginBottom: '10px', borderRadius: '5px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{ex.title}</strong>
              {isInstructor && <button className="btn-icon btn-delete" onClick={() => onDeleteExercise(ex.id)}>🗑️</button>}
            </div>
            <p>{ex.description}</p>

            {/* INSTRUCTOR: VIEW SUBS */}
            {isInstructor ? (
              <div>
                <button onClick={() => handleToggleSubmissions(ex.id)} style={{ fontSize: '0.8rem', marginTop: '10px' }}>
                  {activeExerciseId === ex.id ? 'Hide Submissions' : 'View Submissions & Grade'}
                </button>
                {activeExerciseId === ex.id && (
                  <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                    {loadingSubs && <p>Loading...</p>}
                    {!loadingSubs && submissions.length === 0 && <p>No submissions.</p>}
                    {submissions.map(sub => (
                      <div key={sub.id} style={{ background: '#fafafa', padding: '5px', marginBottom: '5px', fontSize: '0.9rem' }}>
                        <p><strong>Solution:</strong> {sub.solution}</p>
                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                          <input type="number" defaultValue={sub.score} onChange={(e) => setGradeScore({ ...gradeScore, [sub.id]: e.target.value })} style={{ width: '60px' }} />
                          <button onClick={() => handleGradeClick(sub.id)} style={{ padding: '2px 8px' }}>Grade</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* STUDENT: SUBMIT */
              <div>
                {activeExerciseId !== ex.id && <button onClick={() => setActiveExerciseId(ex.id)} style={{ marginTop: '10px' }}>Submit Work</button>}
                {activeExerciseId === ex.id && (
                  <div style={{ marginTop: '10px' }}>
                    <textarea placeholder="Type solution..." value={submissionText} onChange={e => setSubmissionText(e.target.value)} style={{ width: '100%', height: '80px' }} />
                    <div style={{ marginTop: '5px' }}>
                      <button onClick={() => handleSubmitClick(ex.id)}>Submit</button>
                      <button onClick={() => setActiveExerciseId(null)} style={{ marginLeft: '5px', background: '#ccc' }}>Cancel</button>
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