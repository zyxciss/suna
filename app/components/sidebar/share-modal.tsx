'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareModalProps {
  url: string;
  title?: string;
  trigger?: React.ReactNode;
}

export function ShareModal({ url, title = 'Share', trigger }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <div className="grid flex-1 gap-2">
            <Input
              value={url}
              readOnly
              className="w-full"
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
          <Button 
            size="sm" 
            className="px-3" 
            onClick={handleCopy}
            variant={copied ? "default" : "secondary"}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="default" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
