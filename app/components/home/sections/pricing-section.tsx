'use client';
import { SectionHeader } from '@/components/home/section-header';

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="flex flex-col items-center justify-center w-full relative py-20 md:py-32"
    >
      <div className="border-x mx-auto relative w-full max-w-6xl px-6">
        <SectionHeader>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-center max-w-[600px] mx-auto">
            Start for free and upgrade as you grow
          </p>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex flex-col p-6 bg-background border rounded-lg shadow-sm">
            <h3 className="text-xl font-bold">Free</h3>
            <div className="mt-4 text-3xl font-bold">$0</div>
            <p className="mt-2 text-muted-foreground">Perfect for getting started</p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Basic AI chat functionality
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Limited API integrations
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                5 projects
              </li>
            </ul>
            <a
              href="/auth"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </a>
          </div>
          <div className="flex flex-col p-6 bg-background border rounded-lg shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
              Popular
            </div>
            <h3 className="text-xl font-bold">Pro</h3>
            <div className="mt-4 text-3xl font-bold">$19</div>
            <p className="mt-2 text-muted-foreground">Per month, billed annually</p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Advanced AI capabilities
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Full API integrations
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Unlimited projects
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 text-primary">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Priority support
              </li>
            </ul>
            <a
              href="/auth"
              className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Upgrade Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
