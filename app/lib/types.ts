export interface Thread {
  id: string;
  thread_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  account_id: string;
  is_public?: boolean;
  messages?: Message[];
  sandbox?: any; // Add sandbox property
}

export interface Message {
  id: string;
  thread_id: string;
  type: 'user' | 'assistant' | 'system' | 'cost' | 'summary';
  content: string;
  is_llm_message?: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  account_id: string;
  is_public?: boolean;
  files?: ProjectFile[];
  sandbox?: any; // Add sandbox property
  sandbox_status?: 'active' | 'inactive' | 'starting';
}

export interface ProjectFile {
  id: string;
  project_id: string;
  name: string;
  path: string;
  content_type: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface ScrapeResult {
  url: string;
  content: string;
  title: string;
  links: string[];
}

export interface GenerateResult {
  text: string;
}

export interface BillingStatus {
  tier: string;
  active: boolean;
  usage: {
    current: number;
    limit: number;
    percentage: number;
  };
  features: {
    [key: string]: any;
  };
}
