import React from 'react';
import { Logo } from '@/components/ui/logo';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <Logo className="h-12 w-auto" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Welcome to SapnousAI by AIRAS
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Your intelligent AI assistant for research, coding, and creative tasks
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  href="/chat"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Start Chatting
                </a>
                <a
                  href="/auth"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Powered by Advanced AI
              </h2>
              <p className="max-w-[700px] text-muted-foreground">
                SapnousAI leverages cutting-edge AI models to help you with research, coding, content creation, and more.
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m4.9 4.9 14.2 14.2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Research Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Search the web, analyze data, and compile research findings
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Code Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Write, debug, and explain code in multiple programming languages
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m2 12 5.45 5.45"></path>
                      <path d="M2 12h10"></path>
                      <path d="m12 2 5.45 5.45"></path>
                      <path d="m12 2v10"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Creative Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate content, brainstorm ideas, and enhance your creativity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Founded by Atah Alam
              </h2>
              <p className="max-w-[700px] text-muted-foreground">
                SapnousAI is a product of AIRAS - The Innovations of New Era
              </p>
              <div className="mt-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-24 w-24 overflow-hidden rounded-full">
                    <img src="/images/airas-logo.png" alt="AIRAS Logo" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AIRAS</h3>
                    <p className="text-sm text-muted-foreground">The Innovations of New Era</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
