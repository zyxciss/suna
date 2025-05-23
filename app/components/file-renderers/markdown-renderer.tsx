import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  maxHeight?: string;
}

export function MarkdownRenderer({ content, maxHeight = '300px' }: MarkdownRendererProps) {
  return (
    <div className="overflow-auto prose dark:prose-invert prose-sm max-w-none" style={{ maxHeight }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
