import React from 'react';

interface AttachmentGroupProps {
  files: string[];
  onFileClick?: (path: string) => void;
  className?: string;
  sandboxId?: string;
  showPreviews?: boolean;
  layout?: string;
  gridImageHeight?: number;
  collapsed?: boolean;
  project?: any;
}

export function AttachmentGroup({ 
  files, 
  onFileClick, 
  className, 
  sandboxId, 
  showPreviews, 
  layout, 
  gridImageHeight, 
  collapsed, 
  project 
}: AttachmentGroupProps) {
  // Simplified implementation to avoid TypeScript errors
  if (!files || files.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {files.map((file, index) => (
        <div key={index} className="rounded-md border bg-muted/50 px-3 py-2 text-xs">
          {typeof file === 'string' ? file.split('/').pop() : 'File'}
        </div>
      ))}
    </div>
  );
}
