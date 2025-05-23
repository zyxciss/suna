import React from 'react';
import {
  extractFilePath,
  extractStrReplaceContent,
  cleanUrl,
  formatTimestamp,
  getToolTitle
} from './utils';

interface StrReplaceToolViewProps {
  content: string;
  timestamp: string;
  toolName: string;
}

export function StrReplaceToolView({ content, timestamp, toolName }: StrReplaceToolViewProps) {
  const filePath = extractFilePath(content);
  const { oldStr, newStr } = extractStrReplaceContent(content);
  
  return (
    <div className="flex flex-col gap-2 p-2 rounded-md bg-muted/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary p-1 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
            </svg>
          </div>
          <div className="text-sm font-medium">{getToolTitle(toolName)}</div>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatTimestamp(timestamp)}
        </div>
      </div>
      
      {filePath && (
        <div className="mt-2">
          <div className="text-xs font-medium text-muted-foreground mb-1">File Path</div>
          <div className="text-sm break-all">{filePath}</div>
        </div>
      )}
      
      <div className="mt-2">
        <div className="text-xs font-medium text-muted-foreground mb-1">Old String</div>
        <div className="text-sm max-h-[150px] overflow-y-auto p-2 bg-muted/50 rounded-md whitespace-pre-wrap">
          {oldStr || 'No old string specified'}
        </div>
      </div>
      
      <div className="mt-2">
        <div className="text-xs font-medium text-muted-foreground mb-1">New String</div>
        <div className="text-sm max-h-[150px] overflow-y-auto p-2 bg-muted/50 rounded-md whitespace-pre-wrap">
          {newStr || 'No new string specified'}
        </div>
      </div>
    </div>
  );
}
