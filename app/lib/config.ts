export const isLocalMode = process.env.NEXT_PUBLIC_LOCAL_MODE === 'true';
export const isDevMode = process.env.NODE_ENV === 'development';

export const config = {
  isLocalMode,
  isDevMode,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ighrsxnyyozsrxthrrap.supabase.co',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnaHJzeG55eW96c3J4dGhycmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NjM1NjMsImV4cCI6MjA2MjUzOTU2M30.Axe35Ypln48l6tnFN7RQLs5nOVQE5f-I0vM7DXkyYc4',
  defaultModel: 'qwen/qwen3-235b-a22b:free'
};
