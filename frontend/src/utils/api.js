import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name, email, password, confirmPassword) =>
    api.post('/auth/register', { name, email, password, confirmPassword }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () =>
    api.get('/auth/me'),
};

export const folderAPI = {
  getFolders: () =>
    api.get('/folders'),
  createFolder: (name, description) =>
    api.post('/folders', { name, description }),
  updateFolder: (id, name, description) =>
    api.put(`/folders/${id}`, { name, description }),
  deleteFolder: (id) =>
    api.delete(`/folders/${id}`),
};

export const documentAPI = {
  getDocuments: (folderId) =>
    api.get(`/documents/folders/${folderId}/documents`),
  uploadDocument: (folderId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/documents/folders/${folderId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteDocument: (id) =>
    api.delete(`/documents/${id}`),
  downloadDocument: (id) =>
    api.get(`/documents/${id}/download`),
};

export default api;
