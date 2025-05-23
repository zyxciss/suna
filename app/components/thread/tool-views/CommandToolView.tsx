import React from 'react';
import {
  extractCommand,
  extractCommandOutput,
  extractExitCode,
  formatTimestamp,
  getToolTitle
} from './utils';

interface CommandToolViewProps {
  content: string;
  timestamp: string;
  toolName: string;
}

export function CommandToolView({ content, timestamp, toolName }: CommandToolViewProps) {
  const command = extractCommand(content);
  const output = extractCommandOutput(content);
  const exitCode = extractExitCode(content);
  
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
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div className="text-sm font-medium">{getToolTitle(toolName)}</div>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatTimestamp(timestamp)}
        </div>
      </div>
      
      {command && (
        <div className="mt-2">
          <div className="text-xs font-medium text-muted-foreground mb-1">Command</div>
          <div className="text-sm font-mono bg-muted/50 p-2 rounded-md overflow-x-auto">
            {command}
          </div>
        </div>
      )}
      
      {output && (
        <div className="mt-2">
          <div className="text-xs font-medium text-muted-foreground mb-1">Output</div>
          <div className="text-sm font-mono bg-muted/50 p-2 rounded-md overflow-x-auto whitespace-pre-wrap max-h-[300px] overflow-y-auto">
            {output}
          </div>
        </div>
      )}
      
      <div className="mt-2 text-xs">
        Exit code: <span className={exitCode === 0 ? "text-green-500" : "text-red-500"}>{exitCode}</span>
      </div>
    </div>
  );
}
