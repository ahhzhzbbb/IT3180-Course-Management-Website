import React from 'react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../Profile';

// Mock the api module
vi.mock('../../api/axiosConfig', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  }
}));

import api from '../../api/axiosConfig';

describe('Profile page', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('loads and displays user data', async () => {
    api.get.mockResolvedValueOnce({ data: { name: 'User A', username: 'usera', phoneNumber: '0123' } });
    render(<Profile />);

    expect(await screen.findByDisplayValue('User A')).toBeTruthy();
    expect(screen.getByDisplayValue('usera')).toBeTruthy();
    expect(screen.getByDisplayValue('0123')).toBeTruthy();
  });


});
