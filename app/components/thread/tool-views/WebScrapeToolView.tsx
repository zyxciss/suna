import React from 'react';

interface WebScrapeToolViewProps {
  content: string;
  timestamp: string;
  toolName: string;
  assistantContent?: string;
  toolContent?: string;
  assistantTimestamp?: string;
  toolTimestamp?: string;
  isSuccess?: boolean;
}

export function WebScrapeToolView({ 
  content, 
  timestamp, 
  toolName,
  assistantContent,
  toolContent,
  assistantTimestamp,
  toolTimestamp,
  isSuccess = true
}: WebScrapeToolViewProps) {
  // Implementation will be added later
  return (
    <div className="flex flex-col gap-2">
      {assistantContent && (
        <div className="text-sm">{assistantContent}</div>
      )}
      {toolContent && (
        <div className="text-sm">{toolContent}</div>
      )}
      <div className="text-sm">Scrape content: {content}</div>
      <div className="text-xs text-muted-foreground">Time: {timestamp}</div>
      <div className="text-xs text-muted-foreground">Tool: {toolName}</div>
    </div>
  );
}
