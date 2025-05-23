'use client';
import { SectionHeader } from '@/components/home/section-header';

export function FooterSection() {
  return (
    <footer className="flex flex-col items-center justify-center w-full relative py-12">
      <div className="border-x mx-auto relative w-full max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold">Suna Clone</h3>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
