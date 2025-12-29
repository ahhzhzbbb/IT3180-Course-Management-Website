import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExerciseManager from './ExerciseManager';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('ExerciseManager', () => {
  test('student can submit an exercise and see their submission', async () => {
    const onSubmitWork = vi.fn().mockResolvedValue({ solution: 'My solution', score: null });

    render(
      <ExerciseManager
        exercises={[{ id: 1, title: 'Ex 1', description: 'desc' }]}
        isInstructor={false}
        onSubmitWork={onSubmitWork}
      />
    );

    expect(screen.getByText('Ex 1')).toBeInTheDocument();

    const submitBtn = screen.getByText('Nộp bài');
    fireEvent.click(submitBtn);

    const textarea = await screen.findByPlaceholderText(/Viết lời giải của cưng vào đây/i);
    fireEvent.change(textarea, { target: { value: 'My solution' } });

    const confirmBtn = screen.getByText('Xác nhận nộp');
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(onSubmitWork).toHaveBeenCalledWith(1, 'My solution');
    });

    const submitted = await screen.findByText(/Bài nộp của bạn:/i);
    expect(submitted).toBeInTheDocument();
    expect(screen.getByText(/My solution/)).toBeInTheDocument();
  });

  test('instructor can load submissions and grade them', async () => {
    const submissions = [
      { id: 'sub1', userUsername: 'student1', solution: 'sol 1', score: null },
    ];
    const onLoadSubmissions = vi.fn().mockResolvedValue(submissions);
    const onGradeWork = vi.fn().mockResolvedValue({});

    render(
      <ExerciseManager
        exercises={[{ id: 2, title: 'Ex 2', description: 'desc' }]}
        isInstructor={true}
        onLoadSubmissions={onLoadSubmissions}
        onGradeWork={onGradeWork}
      />
    );

    const viewBtn = screen.getByText('Xem bài nộp & chấm');
    fireEvent.click(viewBtn);

    expect(onLoadSubmissions).toHaveBeenCalledWith(2);

    const studentLabel = await screen.findByText(/Học viên:/i);
    expect(studentLabel).toBeInTheDocument();
    expect(screen.getByText(/student1/)).toBeInTheDocument();

    const gradeInput = screen.getByPlaceholderText('Điểm');
    fireEvent.change(gradeInput, { target: { value: '95' } });

    const gradeBtn = screen.getByText('Chấm');
    fireEvent.click(gradeBtn);

    await waitFor(() => {
      expect(onGradeWork).toHaveBeenCalledWith('sub1', '95');
    });
  });
});