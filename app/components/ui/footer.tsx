import React from 'react';
import { FooterLogo, AIRASLogo } from '@/components/ui/logo';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center gap-4 px-4 md:flex-row md:justify-between">
        <FooterLogo />
        
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-right">
            <p>© {new Date().getFullYear()} SapnousAI by AIRAS</p>
            <p>All rights reserved.</p>
          </div>
          
          <AIRASLogo className="mt-2 md:mt-0" />
        </div>
      </div>
    </footer>
  );
}
