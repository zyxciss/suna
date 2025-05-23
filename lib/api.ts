import { createClient } from '@supabase/supabase-js';

// API configuration for frontend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ighrsxnyyozsrxthrrap.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnaHJzeG55eW96c3J4dGhycmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NjM1NjMsImV4cCI6MjA2MjUzOTU2M30.Axe35Ypln48l6tnFN7RQLs5nOVQE5f-I0vM7DXkyYc4';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API endpoints
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  THREAD: '/api/thread',
  THREAD_MESSAGE: (threadId: string) => `/api/thread/${threadId}/message`,
  AGENT_START: (threadId: string) => `/api/thread/${threadId}/agent/start`,
  PROJECT: '/api/project',
  PROJECT_DETAIL: (projectId: string) => `/api/project/${projectId}`,
  PROJECT_SANDBOX: (projectId: string) => `/api/project/${projectId}/sandbox/ensure-active`,
  SEARCH: '/api/search',
  SCRAPE: '/api/scrape',
  GENERATE: '/api/generate',
  BILLING_STATUS: '/api/billing/status',
};

// API client for making requests
export const apiClient = {
  async get(url: string, token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  },
  
  async post(url: string, data: any, token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  },
  
  async put(url: string, data: any, token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  },
  
  async delete(url: string, token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Special method for streaming responses
  getStream(url: string, data: any, token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  },
};
