'use client';
import { SectionHeader } from '@/components/home/section-header';

export function CTASection() {
  return (
    <section
      id="cta"
      className="flex flex-col items-center justify-center w-full relative py-20 md:py-32"
    >
      <div className="border-x mx-auto relative w-full max-w-6xl px-6">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px] text-balance">
              Try our AI assistant today and experience the power of AI with API integration.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/auth"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
