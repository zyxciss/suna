'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FileText, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GenericFileRendererProps {
  content?: string | null;
  binaryUrl?: string | null;
  fileName?: string;
  className?: string;
  project?: any;
  markdownRef?: React.RefObject<HTMLPreElement>;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export function GenericFileRenderer({
  content,
  binaryUrl,
  fileName,
  className,
  project,
  markdownRef,
  onDownload,
  isDownloading
}: GenericFileRendererProps) {
  // Get file extension
  const extension = fileName?.split('.').pop()?.toLowerCase() || '';
  
  // Determine if this is a binary file that should be displayed with an iframe
  const isBinaryViewable = ['pdf'].includes(extension);
  
  // Determine if this is an image
  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(extension);
  
  // Determine if this is markdown
  const isMarkdown = ['md', 'markdown'].includes(extension);
  
  // Determine if this is CSV
  const isCsv = ['csv', 'tsv'].includes(extension);
  
  // Render based on file type
  if (isImage && binaryUrl) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full", className)}>
        <img 
          src={binaryUrl} 
          alt={fileName || 'Image'} 
          className="max-w-full max-h-full object-contain"
        />
        {onDownload && (
          <Button 
            onClick={onDownload} 
            className="mt-4" 
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download
              </>
            )}
          </Button>
        )}
      </div>
    );
  }
  
  if (isBinaryViewable && binaryUrl) {
    return (
      <div className={cn("flex flex-col h-full", className)}>
        <iframe 
          src={binaryUrl} 
          className="w-full h-full border-0" 
          title={fileName || 'Document'}
        />
        {onDownload && (
          <Button 
            onClick={onDownload} 
            className="mt-2" 
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download
              </>
            )}
          </Button>
        )}
      </div>
    );
  }
  
  // For text content
  if (content) {
    return (
      <div className={cn("flex flex-col h-full", className)}>
        <pre 
          className="w-full h-full overflow-auto p-4 text-sm bg-muted rounded-md"
          ref={isMarkdown ? markdownRef : undefined}
        >
          {content}
        </pre>
        {onDownload && (
          <Button 
            onClick={onDownload} 
            className="mt-2" 
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download
              </>
            )}
          </Button>
        )}
      </div>
    );
  }
  
  // Fallback for no content
  return (
    <div className={cn("flex flex-col items-center justify-center h-full text-muted-foreground", className)}>
      <FileText className="h-12 w-12 mb-4" />
      <p>No preview available</p>
      {onDownload && (
        <Button 
          onClick={onDownload} 
          className="mt-4" 
          variant="outline"
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download
            </>
          )}
        </Button>
      )}
    </div>
  );
}
