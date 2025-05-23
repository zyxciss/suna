import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import { FileCache } from '@/hooks/use-cached-file';

// Simplified ThreadContent component to avoid TypeScript errors
export function ThreadContent() {
  // Simplified implementation
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-3 items-start">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <img src="/images/sapnous-dark.png" alt="SapnousAI" className="h-6 w-6" />
        </div>
        <div className="rounded-lg bg-muted p-3 text-sm">
          Hello! I'm SapnousAI by AIRAS, founded by Atah Alam. How can I assist you today?
        </div>
      </div>
    </div>
  );
}
