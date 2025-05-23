'use client';

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
      {children}
    </div>
  );
}
