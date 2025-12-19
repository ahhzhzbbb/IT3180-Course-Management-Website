import api from './axiosConfig';

export const authService = {
    login: (credentials) => api.post('/auth/signin', credentials),
    signup: (data) => api.post('/auth/signup', data),
    getCurrentUser: () => api.get('/auth/username'),
};

export const courseService = {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    create: (data) => api.post('/courses', data),
    // Nested resources
    addChapter: (courseId, data) => api.post(`/courses/${courseId}/chapters`, data),
};

export const lessonService = {
    // Creating a lesson inside a chapter
    create: (chapterId, data) => api.post(`/chapters/${chapterId}/lessons`, data),
    getComments: (lessonId) => api.get(`/public/comments/${lessonId}`),
};

// Add similar services for users, exercises, etc.
