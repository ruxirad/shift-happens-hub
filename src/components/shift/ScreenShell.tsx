export function ScreenShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-16 animate-fade-in-up">
      {children}
    </div>
  );
}

export function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
      {children}
    </div>
  );
}
