'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export function Logo({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image 
        src={isDark ? '/images/sapnous-dark.png' : '/images/sapnous-light.png'} 
        alt="SapnousAI Logo" 
        width={32} 
        height={32} 
        className="h-8 w-auto"
      />
      <span className="font-bold text-lg">SapnousAI</span>
    </Link>
  );
}

export function AIRASLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image 
        src="/images/airas-logo.png" 
        alt="AIRAS Logo" 
        width={40} 
        height={40} 
        className="h-10 w-auto"
      />
      <div className="flex flex-col">
        <span className="font-bold text-sm">AIRAS</span>
        <span className="text-xs text-muted-foreground">The Innovations of New Era</span>
      </div>
    </div>
  );
}

export function FooterLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Image 
          src="/images/sapnous-dark.png" 
          alt="SapnousAI Logo" 
          width={24} 
          height={24} 
          className="h-6 w-auto"
        />
        <span className="font-bold">SapnousAI by AIRAS</span>
      </div>
      <div className="text-xs text-center text-muted-foreground">
        Founded by Atah Alam
      </div>
    </div>
  );
}
