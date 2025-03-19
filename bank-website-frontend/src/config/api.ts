export const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',

  
  // ACA-Py agent endpoints
  AGENT: {
    CREATE_INVITATION: '/agent/connections/create-invitation',
    RECEIVE_INVITATION: '/agent/connections/receive-invitation',
    PROOF_REQUEST: '/agent/present-proof/send-request',
    VERIFY_PRESENTATION: '/agent/present-proof/verify',
  },
  
  // Authentication endpoints
  AUTH: {
    CONNECT: '/auth/connect',
    LOGIN: '/auth/login',
    VERIFY: '/auth/verify',
    LOGOUT: '/auth/logout',
  },
  
  // Employee management endpoints
  EMPLOYEES: {
    LIST: '/employees',
    GET: (id: string) => `/employees/${id}`,
    UPDATE: (id: string) => `/employees/${id}`,
  },
  
  // Permission management endpoints
  PERMISSIONS: {
    LIST: '/permissions',
    DELEGATE: '/permissions/delegate',
    VERIFY: '/permissions/verify',
    REVOKE: '/permissions/revoke',
  },
};

export const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/bank_portal';