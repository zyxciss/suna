import React from 'react';

// Simplified file content hook that accepts undefined parameters
export function useFileContent(filePath?: string, token?: string) {
  return {
    data: "Sample file content",
    isLoading: false,
    error: null
  };
}
