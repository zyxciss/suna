import React from 'react';

// Simplified image content hook
export function useImageContent(filePath?: string, token?: string) {
  return {
    data: null,
    isLoading: false,
    error: null
  };
}
