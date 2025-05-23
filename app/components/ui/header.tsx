import React from 'react';
import { Logo } from '@/components/ui/logo';

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Logo />
        <nav className="ml-auto flex gap-4">
          <a href="/chat" className="text-sm font-medium hover:underline">Chat</a>
          <a href="/auth" className="text-sm font-medium hover:underline">Sign In</a>
        </nav>
      </div>
    </header>
  );
}
