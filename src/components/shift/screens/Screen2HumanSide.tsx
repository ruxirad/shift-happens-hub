import { useState } from "react";
import { ScreenShell, EyebrowLabel } from "../ScreenShell";
import { FacilitatorNote } from "../FacilitatorNote";

const BULLETS = [
  "Most change fails because of people factors, not bad frameworks.",
  "Disconnection, fear of incompetence, and loss of trust are the real culprits.",
  "The goal isn't eliminating resistance — it's understanding it.",
];

export function Screen2HumanSide() {
  const [revealed, setRevealed] = useState(0);

  return (
    <ScreenShell>
      <EyebrowLabel>The Human Side · 0:03–0:08</EyebrowLabel>
      <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
        Change isn't just operational.
        <br />
        <span className="text-muted-foreground">It's personal.</span>
      </h2>

      <blockquote className="mt-12 border-l-2 border-primary pl-6 md:pl-8">
        <p className="font-serif text-2xl md:text-4xl leading-snug text-foreground italic">
          "Resistance isn't a character flaw. It's a human response to uncertainty."
        </p>
      </blockquote>

      <ul className="mt-12 space-y-5 max-w-2xl">
        {BULLETS.map((b, i) => (
          <li
            key={i}
            className={`flex gap-4 transition-opacity duration-500 ${
              i < revealed ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-primary font-serif text-lg leading-tight pt-0.5">
              0{i + 1}
            </span>
            <span className="text-base md:text-lg text-foreground/90 leading-relaxed">
              {b}
            </span>
          </li>
        ))}
      </ul>

      {revealed < BULLETS.length && (
        <button
          onClick={() => setRevealed((r) => r + 1)}
          className="mt-8 text-xs uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors"
        >
          Reveal next →
        </button>
      )}

      <FacilitatorNote>
        Optional: Share a relatable story — the Excel-to-Salesforce migration, or
        a recent client example. Keep it human.
      </FacilitatorNote>
    </ScreenShell>
  );
}
