export function FacilitatorNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 text-xs italic text-muted-foreground/80 max-w-2xl">
      <span className="font-medium not-italic mr-1">Facilitator:</span>
      {children}
    </p>
  );
}
