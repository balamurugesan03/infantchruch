import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('church_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('church_admin_token');
      localStorage.removeItem('church_admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

// ─── Auth ───────────────────────────────────────────────
export const authService = {
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// ─── Pages ──────────────────────────────────────────────
export const pageService = {
  getPage: (slug) => api.get(`/pages/${slug}`),
  updatePage: (slug, data) => api.put(`/pages/${slug}`, data),
  getAllPages: () => api.get('/pages'),
};

// ─── Gallery ────────────────────────────────────────────
export const galleryService = {
  getGallery: (category = 'all') =>
    api.get('/gallery', { params: category !== 'all' ? { category } : {} }),
  getAllGallery: () => api.get('/gallery/admin'),
  addImage: (formData) =>
    api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateImage: (id, data) => api.put(`/gallery/${id}`, data),
  deleteImage: (id) => api.delete(`/gallery/${id}`),
};

// ─── Contact ────────────────────────────────────────────
export const contactService = {
  sendMessage: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact'),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
  deleteMessage: (id) => api.delete(`/contact/${id}`),
};

// ─── Events ─────────────────────────────────────────────
export const eventService = {
  getEvents: () => api.get('/events'),
  getAllEvents: () => api.get('/events/admin'),
  createEvent: (data) => api.post('/events', data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
};

export default api;
