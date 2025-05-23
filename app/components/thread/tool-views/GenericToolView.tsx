import React from 'react';

interface GenericToolViewProps {
  assistantContent?: string;
  toolContent?: string;
  assistantTimestamp?: string;
  toolTimestamp?: string;
  isSuccess?: boolean;
  isStreaming?: boolean;
  name?: string;
}

export function GenericToolView({ 
  assistantContent, 
  toolContent,
  assistantTimestamp,
  toolTimestamp,
  isSuccess = true,
  isStreaming = false,
  name
}: GenericToolViewProps) {
  return (
    <div className="flex flex-col gap-2">
      {assistantContent && (
        <div className="text-sm">{assistantContent}</div>
      )}
      {toolContent && (
        <div className="text-sm">{toolContent}</div>
      )}
      {name && (
        <div className="text-xs text-muted-foreground">Tool: {name}</div>
      )}
      {assistantTimestamp && (
        <div className="text-xs text-muted-foreground">Assistant time: {assistantTimestamp}</div>
      )}
      {toolTimestamp && (
        <div className="text-xs text-muted-foreground">Tool time: {toolTimestamp}</div>
      )}
      <div className="text-xs text-muted-foreground">
        Status: {isSuccess ? 'Success' : 'Failed'} {isStreaming ? '(Streaming)' : ''}
      </div>
    </div>
  );
}
