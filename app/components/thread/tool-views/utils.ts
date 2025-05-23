// Utility functions for tool views with null/undefined checks
import { useState } from 'react';

// Helper function to safely parse content
export const parseToolContent = (content: string | undefined) => {
  if (!content) return null;
  
  // Check for file path in various formats
  const filePathMatch = 
    content.match(/<str-replace\s+file_path=["']([\s\S]*?)["']/i) ||
    content.match(/<delete[^>]*file_path=["']([\s\S]*?)["']/i) ||
    content.match(/<delete-file[^>]*>([^<]+)<\/delete-file>/i);
  
  if (filePathMatch && filePathMatch[1]) {
    return { filePath: filePathMatch[1] };
  }
  
  // Check if content is related to deletion
  const isDeleteOperation = content && (
    content.toLowerCase().includes('delete') ||
    content.includes('delete-file')
  );
  
  if (isDeleteOperation) {
    const deletePathMatch = content.match(
      /(?:delete|remove|rm)(?:\s+(?:file|directory|dir|folder))?(?:\s+["']?([\w\-./\\]+)["']?)/i
    );
    
    if (deletePathMatch && deletePathMatch[1]) {
      return { filePath: deletePathMatch[1] };
    }
    
    const fileMatch = content.match(/["']?([\w\-./\\]+\.\w+)["']?/);
    if (fileMatch && fileMatch[1]) {
      return { filePath: fileMatch[1] };
    }
  }
  
  return null;
};

// Type-safe function to handle search results
export const parseSearchResults = (content: string | undefined) => {
  if (!content) return { results: [] };
  
  try {
    const parsedContent = JSON.parse(content);
    if (parsedContent && parsedContent.results && Array.isArray(parsedContent.results)) {
      return {
        results: parsedContent.results.map((result: any) => ({
          title: result.title || 'Untitled',
          url: result.url || '',
          snippet: result.snippet || ''
        }))
      };
    }
  } catch (e) {
    console.error('Failed to parse search results:', e);
  }
  
  return { results: [] };
};

// Additional utility functions needed by other components
export const cleanUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.toString();
  } catch (e) {
    return url;
  }
};

export const formatTimestamp = (timestamp: string | number | Date): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const getToolTitle = (toolName: string): string => {
  const toolTitles: Record<string, string> = {
    'browser_navigate': 'Browser Navigation',
    'browser_click': 'Browser Click',
    'browser_input': 'Browser Input',
    'browser_scroll': 'Browser Scroll',
    'file_read': 'File Read',
    'file_write': 'File Write',
    'shell_exec': 'Shell Command',
    'search_web': 'Web Search',
    'scrape_web': 'Web Scrape'
  };
  
  return toolTitles[toolName] || toolName;
};

export const extractSearchResults = (content: string | undefined) => {
  if (!content) return [];
  
  try {
    const data = JSON.parse(content);
    if (data && Array.isArray(data.results)) {
      return data.results;
    }
    return [];
  } catch (e) {
    console.error('Failed to parse search results:', e);
    return [];
  }
};

// Additional missing utility functions
export const extractSearchQuery = (content: string | undefined): string => {
  if (!content) return '';
  
  try {
    const match = content.match(/query['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    if (match) {
      return match[2] || match[1] || '';
    }
  } catch (e) {
    console.error('Failed to extract search query:', e);
  }
  
  return '';
};

export const extractCrawlUrl = (content: string | undefined): string => {
  if (!content) return '';
  
  try {
    const match = content.match(/url['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    if (match) {
      return match[2] || match[1] || '';
    }
  } catch (e) {
    console.error('Failed to extract crawl URL:', e);
  }
  
  return '';
};

export const extractWebpageContent = (content: string | undefined): string => {
  if (!content) return '';
  
  try {
    const data = JSON.parse(content);
    if (data && typeof data.content === 'string') {
      return data.content;
    }
    return '';
  } catch (e) {
    console.error('Failed to extract webpage content:', e);
    return '';
  }
};

// Format content for Markdown components
export const formatContent = (content: string | null): string => {
  if (!content) return '';
  return content;
};

// Extract file path from content
export const extractFilePath = (content: string | undefined): string => {
  if (!content) return '';
  
  try {
    const match = content.match(/file_path['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    if (match) {
      return match[2] || match[1] || '';
    }
    
    // Try alternative patterns
    const altMatch = content.match(/path['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    if (altMatch) {
      return altMatch[2] || altMatch[1] || '';
    }
  } catch (e) {
    console.error('Failed to extract file path:', e);
  }
  
  return '';
};

// Extract string replace content
export const extractStrReplaceContent = (content: string | undefined): { oldStr?: string, newStr?: string } => {
  if (!content) return {};
  
  try {
    const data = JSON.parse(content);
    return {
      oldStr: data.old_str || data.oldStr || '',
      newStr: data.new_str || data.newStr || ''
    };
  } catch (e) {
    // Try regex patterns if JSON parsing fails
    const oldStrMatch = content.match(/old_str['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    const newStrMatch = content.match(/new_str['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    
    return {
      oldStr: oldStrMatch ? (oldStrMatch[2] || oldStrMatch[1] || '') : '',
      newStr: newStrMatch ? (newStrMatch[2] || newStrMatch[1] || '') : ''
    };
  }
};

// Browser tool utilities
export const extractBrowserUrl = (content: string | undefined): string => {
  if (!content) return '';
  
  try {
    const match = content.match(/url['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    if (match) {
      return match[2] || match[1] || '';
    }
  } catch (e) {
    console.error('Failed to extract browser URL:', e);
  }
  
  return '';
};

export const extractBrowserOperation = (content: string | undefined): string => {
  if (!content) return '';
  
  try {
    const match = content.match(/operation['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    if (match) {
      return match[2] || match[1] || '';
    }
  } catch (e) {
    console.error('Failed to extract browser operation:', e);
  }
  
  return '';
};

// Command tool utilities
export const extractCommand = (content: string | undefined): string => {
  if (!content) return '';
  
  try {
    const match = content.match(/command['":\s]+([^"'\s,}]+|["']([^"']+)["'])/i);
    if (match) {
      return match[2] || match[1] || '';
    }
  } catch (e) {
    console.error('Failed to extract command:', e);
  }
  
  return '';
};

export const extractCommandOutput = (content: string | undefined): string => {
  if (!content) return '';
  
  try {
    const data = JSON.parse(content);
    if (data && typeof data.output === 'string') {
      return data.output;
    }
    return '';
  } catch (e) {
    console.error('Failed to extract command output:', e);
    return '';
  }
};

export const extractExitCode = (content: string | undefined): number => {
  if (!content) return 0;
  
  try {
    const data = JSON.parse(content);
    if (data && typeof data.exit_code === 'number') {
      return data.exit_code;
    }
    return 0;
  } catch (e) {
    console.error('Failed to extract exit code:', e);
    return 0;
  }
};
