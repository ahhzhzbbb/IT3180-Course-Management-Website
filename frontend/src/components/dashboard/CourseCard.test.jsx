import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseCard from './CourseCard';
import '@testing-library/jest-dom';

describe('CourseCard', () => {
  test('displays student count when available', () => {
    const course = {
      id: 1,
      title: 'Test Course',
      description: 'desc',
      studentsCount: 123,
      chapters: []
    };

    render(<CourseCard course={course} />);

    expect(screen.getByText(/123 học viên/)).toBeInTheDocument();
  });

  test('falls back to students array length', () => {
    const course = {
      id: 2,
      title: 'Course 2',
      students: [{ id: 1 }, { id: 2 }],
      chapters: []
    };

    render(<CourseCard course={course} />);

    expect(screen.getByText(/2 học viên/)).toBeInTheDocument();
  });
});