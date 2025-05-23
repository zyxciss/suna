import React from 'react';

interface FileOperationToolViewProps {
  name?: string;
  assistantContent?: string;
  toolContent?: string;
  assistantTimestamp?: string;
  toolTimestamp?: string;
  isSuccess?: boolean;
  isStreaming?: boolean;
}

export function FileOperationToolView({
  assistantContent,
  toolContent,
  assistantTimestamp,
  toolTimestamp,
  isSuccess = true,
  isStreaming = false
}: FileOperationToolViewProps) {
  // Simple implementation that just displays the content
  return (
    <div className="flex flex-col gap-2">
      {assistantContent && (
        <div className="text-sm">{assistantContent}</div>
      )}
      {toolContent && (
        <div className="text-sm">{toolContent}</div>
      )}
    </div>
  );
}
