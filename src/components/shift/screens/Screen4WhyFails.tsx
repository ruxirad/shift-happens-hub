import { useState } from "react";
import { ScreenShell, EyebrowLabel } from "../ScreenShell";
import { FacilitatorNote } from "../FacilitatorNote";

const CARDS = [
  {
    title: "Disconnection",
    body: "When people don't understand the 'why,' they fill the silence with fear.",
  },
  {
    title: "Fear of incompetence",
    body: "Most resistance is really about not wanting to look bad in front of peers.",
  },
  {
    title: "Loss of trust",
    body: "Change breaks trust fast. Rebuilding it takes consistency over time — not just communication.",
  },
];

export function Screen4WhyFails() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ScreenShell>
      <EyebrowLabel>Why Change Fails · 0:13–0:18</EyebrowLabel>
      <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
        It's not the framework.
        <br />
        <span className="text-muted-foreground">It's the people.</span>
      </h2>

      <div className="mt-10 space-y-3">
        {CARDS.map((c, i) => {
          const isOpen = open === i;
          return (
            <button
              key={c.title}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left p-6 md:p-7 rounded-lg bg-card border border-border hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl md:text-2xl text-foreground">
                  {c.title}
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
                <p className="overflow-hidden text-base md:text-lg text-foreground/85 leading-relaxed">
                  {c.body}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 border-l-2 border-primary pl-6 md:pl-8">
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Case in point
        </div>
        <p className="font-serif text-lg md:text-xl text-foreground/90 italic leading-relaxed">
          At a private foundation adopting AI tools, the technology was ready in
          week 2. The team wasn't ready for 6 months — because no one had
          addressed what they were afraid of losing.
        </p>
      </div>

      <FacilitatorNote>
        Ask the room: "Which of these three feels most true for your
        organization right now?"
      </FacilitatorNote>
    </ScreenShell>
  );
}
