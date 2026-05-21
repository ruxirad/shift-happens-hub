import { ScreenShell, EyebrowLabel } from "../ScreenShell";
import { FacilitatorNote } from "../FacilitatorNote";

export function Screen1Welcome() {
  return (
    <ScreenShell>
      <EyebrowLabel>Welcome · 0:00–0:03</EyebrowLabel>
      <h1 className="font-serif text-5xl md:text-7xl font-semibold tracking-tight">
        Shift Happens
      </h1>
      <p className="mt-4 text-lg md:text-xl text-muted-foreground font-serif italic">
        Leading the Human Side of the AI Era
      </p>
      <p className="mt-10 text-base md:text-lg leading-relaxed max-w-2xl text-foreground/90">
        Change is constant, personal, and often uncomfortable — and that's exactly
        what we're here to talk about.
      </p>

      <div className="mt-12 p-8 md:p-10 rounded-lg bg-card border border-border">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary mb-4">
          Icebreaker
        </div>
        <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground">
          Share a recent change at work that made you laugh, groan, or adapt
          unexpectedly.
        </p>
      </div>

      <FacilitatorNote>
        Go around the room or use chat. Give it 2–3 minutes. This sets the tone.
      </FacilitatorNote>
    </ScreenShell>
  );
}
