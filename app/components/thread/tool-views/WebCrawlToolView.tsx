import React from 'react';

interface WebCrawlToolViewProps {
  content: string;
  timestamp: string;
  toolName: string;
  assistantContent?: string;
  toolContent?: string;
  assistantTimestamp?: string;
  toolTimestamp?: string;
  isSuccess?: boolean;
}

export function WebCrawlToolView({ 
  content, 
  timestamp, 
  toolName,
  assistantContent,
  toolContent,
  assistantTimestamp,
  toolTimestamp,
  isSuccess = true
}: WebCrawlToolViewProps) {
  // Implementation will be added later
  return (
    <div className="flex flex-col gap-2">
      {assistantContent && (
        <div className="text-sm">{assistantContent}</div>
      )}
      {toolContent && (
        <div className="text-sm">{toolContent}</div>
      )}
      <div className="text-sm">Crawl content: {content}</div>
      <div className="text-xs text-muted-foreground">Time: {timestamp}</div>
      <div className="text-xs text-muted-foreground">Tool: {toolName}</div>
    </div>
  );
}
