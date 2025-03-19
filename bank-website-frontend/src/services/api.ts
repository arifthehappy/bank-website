import axios from 'axios';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async createInvitation() {
    const response = await api.get(API_CONFIG.AUTH.CONNECT);
    return response.data;
  },

  async verifyPresentation(presentationId: string) {
    const response = await api.post(API_CONFIG.AGENT.VERIFY_PRESENTATION, { presentation_id: presentationId });
    return response.data;
  },

  async login(connectionId: string) {
    const response = await api.post(API_CONFIG.AUTH.LOGIN, { connection_id: connectionId });
    return response.data;
  },
};

export const employeeService = {
  async getEmployees() {
    const response = await api.get(API_CONFIG.EMPLOYEES.LIST);
    return response.data;
  },

  async getEmployee(id: string) {
    const response = await api.get(API_CONFIG.EMPLOYEES.GET(id));
    return response.data;
  },
};

export const permissionService = {
  async delegatePermission(data: {
    fromEmployeeId: string;
    toEmployeeId: string;
    permission: string;
  }) {
    const response = await api.post(API_CONFIG.PERMISSIONS.DELEGATE, data);
    return response.data;
  },

  async revokePermission(permissionId: string) {
    const response = await api.post(API_CONFIG.PERMISSIONS.REVOKE, { permission_id: permissionId });
    return response.data;
  },
};

export default api;