import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: async (email: string, password: string) => {
    const response = await api.post('/auth/signup', { email, password });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Todo API
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export const todoAPI = {
  getTodos: async (filter: 'all' | 'active' | 'completed' = 'all') => {
    const response = await api.get<Todo[]>(`/todos?filter=${filter}`);
    return response.data;
  },
  createTodo: async (title: string) => {
    const response = await api.post<Todo>('/todos', { title });
    return response.data;
  },
  updateTodo: async (
    id: string,
    data: { title?: string; completed?: boolean }
  ) => {
    const response = await api.patch<Todo>(`/todos/${id}`, data);
    return response.data;
  },
  deleteTodo: async (id: string) => {
    await api.delete(`/todos/${id}`);
  },
};

// User API
export interface UserSettings {
  id: string;
  email: string;
  themePreference: 'light' | 'dark';
}

export const userAPI = {
  getSettings: async () => {
    const response = await api.get<UserSettings>('/user/settings');
    return response.data;
  },
  updateSettings: async (themePreference: 'light' | 'dark') => {
    const response = await api.patch<UserSettings>('/user/settings', {
      themePreference,
    });
    return response.data;
  },
};

export default api;
