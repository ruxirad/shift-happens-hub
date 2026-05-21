import { useState } from "react";
import { ScreenShell, EyebrowLabel } from "../ScreenShell";
import { FacilitatorNote } from "../FacilitatorNote";

const SHIFTS = [
  {
    title: "Process Pruning",
    body: "For every new initiative, remove one outdated process. Change shouldn't only add — it should also subtract.",
    try: "What's one thing your team is still doing out of habit, not necessity?",
  },
  {
    title: "Co-Creation",
    body: "Ask your team what work feels outdated and what excites them. People support what they help build.",
    try: "Run a 10-minute 'Keep / Kill / Create' exercise at your next team meeting.",
  },
  {
    title: "Shorter Time Horizons",
    body: "Stop asking people to commit to the whole mountain. Ask them to try the next right thing.",
    try: "Frame your next change initiative as a 30-day experiment, not a permanent shift.",
  },
];

export function Screen5MicroShifts() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ScreenShell>
      <EyebrowLabel>Micro-Shifts · 0:18–0:25</EyebrowLabel>
      <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
        You don't have to move the mountain.
        <br />
        <span className="text-muted-foreground">Just the next rock.</span>
      </h2>
      <p className="mt-5 text-base md:text-lg text-muted-foreground">
        Three practical approaches — pick one for your team.
      </p>

      <div className="mt-10 space-y-3">
        {SHIFTS.map((s, i) => {
          const isOpen = open === i;
          return (
            <button
              key={s.title}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left p-6 md:p-8 rounded-lg bg-card border border-border hover:border-primary/40 transition-all"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                  {s.title}
                </h3>
                <span className="text-primary text-xl leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </div>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                    {s.body}
                  </p>
                  <div className="mt-5 p-4 rounded-md bg-surface-2 border-l-2 border-primary">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-primary mb-1">
                      Try it
                    </div>
                    <p className="text-sm md:text-base text-foreground/90">{s.try}</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <FacilitatorNote>
        Breakout option: Small groups pick one approach and brainstorm one
        application. 4 minutes, then share back.
      </FacilitatorNote>
    </ScreenShell>
  );
}
