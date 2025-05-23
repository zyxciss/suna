import { createClient } from '@supabase/supabase-js';

// API configuration for frontend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ighrsxnyyozsrxthrrap.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnaHJzeG55eW96c3J4dGhycmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NjM1NjMsImV4cCI6MjA2MjUzOTU2M30.Axe35Ypln48l6tnFN7RQLs5nOVQE5f-I0vM7DXkyYc4';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnaHJzeG55eW96c3J4dGhycmFwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Njk2MzU2MywiZXhwIjoyMDYyNTM5NTYzfQ.yl8ZlAi1DXIoIKz9NKkLqQicLWj1TcldifV6FMcEzlw';

// API keys
export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
export const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
export const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'qwen/qwen3-235b-a22b:free';
export const TAVILY_API_KEY = process.env.TAVILY_API_KEY || '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';
export const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-45c2b71b7f4b41b583fbf08cc4dd3367';
export const DAYTONA_API_KEY = process.env.DAYTONA_API_KEY || 'dtn_8077657f368b923468f1a8bf3c3bb6952c4460719508402a26e115d892af734e';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create admin Supabase client
export const createSupabaseAdmin = () => {
  return createClient(supabaseUrl, supabaseServiceKey);
};

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
