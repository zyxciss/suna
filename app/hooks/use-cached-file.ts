import { useState, useEffect } from 'react';

// Define a simple in-memory cache for file content
interface CacheEntry {
  content: string;
  timestamp: number;
}

// Cache implementation with expiration
export const FileCache = {
  _cache: new Map<string, CacheEntry>(),
  
  get: (id: string): string | null => {
    const entry = FileCache._cache.get(id);
    if (!entry) return null;
    
    // Check if cache entry is expired (30 minutes)
    const now = Date.now();
    if (now - entry.timestamp > 30 * 60 * 1000) {
      FileCache._cache.delete(id);
      return null;
    }
    
    return entry.content;
  },
  
  set: (id: string, content: string): void => {
    FileCache._cache.set(id, {
      content,
      timestamp: Date.now()
    });
  },
  
  delete: (id: string): void => {
    FileCache._cache.delete(id);
  },
  
  preload: async (sandboxId: string, attachments: string[], token: string): Promise<void> => {
    // Implementation for preloading files
    if (!sandboxId || !attachments || attachments.length === 0) return;
    
    // Fetch files that aren't already cached
    const uncachedFiles = attachments.filter(path => !FileCache.get(`${sandboxId}:${path}`));
    
    // Fetch in parallel with a limit
    const batchSize = 5;
    for (let i = 0; i < uncachedFiles.length; i += batchSize) {
      const batch = uncachedFiles.slice(i, i + batchSize);
      await Promise.all(batch.map(async (path) => {
        try {
          const url = `/api/sandbox/${sandboxId}/files/content?path=${encodeURIComponent(path || "")}`;
          const headers: HeadersInit = {};
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }
          
          const response = await fetch(url, { headers });
          if (response.ok) {
            const content = await response.text();
            FileCache.set(`${sandboxId}:${path}`, content);
          }
        } catch (error) {
          console.error(`Failed to preload file ${path}:`, error);
        }
      }));
    }
  },
  
  clear: (): void => {
    FileCache._cache.clear();
  },
  
  // File type detection utilities
  isImageFile: (path: string): boolean => {
    const ext = path.split('.').pop()?.toLowerCase() || '';
    return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(ext);
  },
  
  isPdfFile: (path: string): boolean => {
    const ext = path.split('.').pop()?.toLowerCase() || '';
    return ext === 'pdf';
  },
  
  getContentTypeFromPath: (path: string): 'text' | 'blob' | 'json' => {
    const ext = path.split('.').pop()?.toLowerCase() || '';
    
    // Binary file types
    if (['pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'xlsx', 'xls', 'docx', 'doc', 'pptx', 'ppt'].includes(ext)) {
      return 'blob';
    }
    
    // JSON file types
    if (['json'].includes(ext)) {
      return 'json';
    }
    
    // Default to text for all other file types
    return 'text';
  },
  
  getMimeTypeFromPath: (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase() || '';
    const mimeTypes: Record<string, string> = {
      // Images
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'bmp': 'image/bmp',
      
      // Documents
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      
      // Text
      'txt': 'text/plain',
      'html': 'text/html',
      'htm': 'text/html',
      'css': 'text/css',
      'csv': 'text/csv',
      'md': 'text/markdown',
      'markdown': 'text/markdown',
      
      // Code
      'js': 'application/javascript',
      'json': 'application/json',
      'ts': 'application/typescript',
      'py': 'text/x-python',
      'java': 'text/x-java',
      'c': 'text/x-c',
      'cpp': 'text/x-c++',
      
      // Other
      'zip': 'application/zip',
      'tar': 'application/x-tar',
      'gz': 'application/gzip'
    };
    
    return mimeTypes[ext] || 'application/octet-stream';
  },
  
  has: (id: string): boolean => {
    return FileCache._cache.has(id);
  }
};

// Function to get a cached file (for direct use without hooks)
export function getCachedFile(
  sandboxId: string, 
  path: string, 
  options?: { 
    contentType?: 'text' | 'blob' | 'json', 
    force?: boolean, 
    token?: string 
  }
): string | null {
  if (!sandboxId || !path) return null;
  
  // If force refresh is requested, skip cache
  if (options?.force) {
    // This would normally fetch from API, but for simplicity just return null
    // to indicate cache miss
    return null;
  }
  
  return FileCache.get(`${sandboxId}:${path}`);
}

// React hook for accessing cached files
export function useCachedFile(sandboxId: string | undefined, path: string | undefined, options?: { contentType?: 'text' | 'blob' | 'json', force?: boolean }) {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (!sandboxId || !path) {
      setData(null);
      setError(null);
      return;
    }
    
    const cacheKey = `${sandboxId}:${path}`;
    const cachedContent = !options?.force ? FileCache.get(cacheKey) : null;
    
    if (cachedContent) {
      setData(cachedContent);
      return;
    }
    
    async function fetchFile() {
      setIsLoading(true);
      setError(null);
      
      try {
        const url = `/api/sandbox/${sandboxId}/files/content?path=${encodeURIComponent(path || "")}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        
        const fileContent = await response.text();
        FileCache.set(cacheKey, fileContent);
        setData(fileContent);
      } catch (err) {
        console.error('Error fetching file:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchFile();
  }, [sandboxId, path, options?.force]);
  
  return { data, isLoading, error };
}
