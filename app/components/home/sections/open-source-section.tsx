'use client';
import { SectionHeader } from '@/components/home/section-header';

export function OpenSourceSection() {
  return (
    <section
      id="open-source"
      className="flex flex-col items-center justify-center w-full relative py-20 md:py-32"
    >
      <div className="border-x mx-auto relative w-full max-w-6xl px-6">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Powered by Open Source
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] text-balance">
              This project leverages the best open source technologies to provide a powerful AI experience.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Next.js</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">OpenRouter</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Supabase</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Tailwind CSS</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
