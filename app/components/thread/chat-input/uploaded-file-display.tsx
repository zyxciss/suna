import React from 'react';
import { UploadedFile } from './message-input';

// Simplified uploaded file display component to avoid TypeScript errors
export function UploadedFilesDisplay({ uploadedFiles = [] }: { uploadedFiles?: UploadedFile[] }) {
  if (!uploadedFiles.length) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {uploadedFiles.map((file, index) => (
        <div key={index} className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2 text-xs">
          <span>{file.name}</span>
          <button
            type="button"
            className="rounded-full bg-muted p-1 hover:bg-muted/80"
            aria-label="Remove file"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
