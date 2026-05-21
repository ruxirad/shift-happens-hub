export function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5 w-full">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
            i === current
              ? "bg-primary shadow-[0_0_12px_oklch(0.58_0.14_255_/_0.6)]"
              : i < current
              ? "bg-muted-foreground/40"
              : "bg-border"
          }`}
        />
      ))}
    </div>
  );
}
