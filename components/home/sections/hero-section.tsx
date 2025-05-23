'use client';
import { SectionHeader } from '@/components/home/section-header';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center w-full relative py-20 md:py-32"
    >
      <div className="border-x mx-auto relative w-full max-w-6xl px-6">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Your AI Agent with API Integration
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] text-balance">
              A powerful AI assistant that can help you with research, writing, and more.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/auth"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
