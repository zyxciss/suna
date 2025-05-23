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
  SANDBOX_FILES: (sandboxId: string) => `/api/sandbox/${sandboxId}/files`,
  SANDBOX_FILE_CONTENT: (sandboxId: string) => `/api/sandbox/${sandboxId}/files/content`,
};

// File information type
export interface FileInfo {
  name: string;
  path: string;
  is_dir: boolean;
  size?: number;
  modified?: string;
}

// Project type
export interface Project {
  id: string;
  name: string;
  description?: string;
  sandbox?: {
    id: string;
    status: string;
  };
  created_at?: string;
  updated_at?: string;
}

// Message type
export interface Message {
  id: string;
  thread_id?: string; // Made optional to match ApiMessageType
  role: 'user' | 'assistant' | 'system';
  content: string;
  attachments?: string[];
  created_at?: string;
  updated_at?: string;
  metadata?: string | Record<string, any>; // Allow both string and object to match ApiMessageType
}

// Project operations
export async function updateProject(projectId: string, data: Partial<Project>): Promise<Project> {
  const url = `${API_ENDPOINTS.PROJECT_DETAIL(projectId)}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update project: ${response.statusText}`);
  }
  
  return response.json();
}

// Sandbox file operations
export async function listSandboxFiles(sandboxId: string, path: string = ''): Promise<FileInfo[]> {
  const url = `${API_ENDPOINTS.SANDBOX_FILES(sandboxId)}?path=${encodeURIComponent(path)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to list files: ${response.statusText}`);
  }
  return response.json();
}

export async function getSandboxFileContent(sandboxId: string, path: string): Promise<string> {
  const url = `${API_ENDPOINTS.SANDBOX_FILE_CONTENT(sandboxId)}?path=${encodeURIComponent(path)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to get file content: ${response.statusText}`);
  }
  return response.text();
}

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
