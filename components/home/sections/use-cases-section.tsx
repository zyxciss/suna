'use client';
import { SectionHeader } from '@/components/home/section-header';

export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      className="flex flex-col items-center justify-center w-full relative py-20 md:py-32"
    >
      <div className="border-x mx-auto relative w-full max-w-6xl px-6">
        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center">
            Powerful AI Assistant
          </h2>
          <p className="text-muted-foreground text-center max-w-[600px] mx-auto">
            Designed to help with a variety of tasks
          </p>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col p-6 bg-background border rounded-lg shadow-sm">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Research & Writing</h3>
            <p className="mt-2 text-muted-foreground">
              Get help with research, summarizing articles, and writing content.
            </p>
          </div>
          <div className="flex flex-col p-6 bg-background border rounded-lg shadow-sm">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Coding & Development</h3>
            <p className="mt-2 text-muted-foreground">
              Get assistance with coding, debugging, and technical questions.
            </p>
          </div>
          <div className="flex flex-col p-6 bg-background border rounded-lg shadow-sm">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Information & Learning</h3>
            <p className="mt-2 text-muted-foreground">
              Ask questions, learn new topics, and get explanations on complex subjects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
