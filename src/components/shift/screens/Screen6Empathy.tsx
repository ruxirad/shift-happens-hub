import { useState } from "react";
import { ScreenShell, EyebrowLabel } from "../ScreenShell";
import { FacilitatorNote } from "../FacilitatorNote";
import type { Response } from "../ShiftHappensApp";

export function Screen6Empathy({
  responses,
  onAdd,
}: {
  responses: Response[];
  onAdd: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    onAdd(v.slice(0, 120));
    setText("");
  };

  return (
    <ScreenShell>
      <EyebrowLabel>Empathy + Structure · 0:25–0:28</EyebrowLabel>
      <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
        Empathy alone isn't enough.
        <br />
        <span className="text-muted-foreground">Neither is structure.</span>
      </h2>
      <p className="mt-6 text-base md:text-lg text-foreground/85 leading-relaxed max-w-2xl">
        The ADKAR model gives us a scaffold: Awareness, Desire, Knowledge,
        Ability, Reinforcement. But it only works when paired with genuine human
        connection.
      </p>

      <div className="mt-10 p-6 md:p-8 rounded-lg bg-card border border-border">
        <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug">
          What's one thing you wish leaders did more of during change?
        </p>

        <form onSubmit={submit} className="mt-6 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your answer…"
            maxLength={120}
            className="flex-1 px-4 py-3 rounded-md bg-surface-2 border border-border focus:border-primary focus:outline-none text-sm md:text-base placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Share
          </button>
        </form>

        <div className="relative mt-8 h-72 md:h-80 rounded-md bg-background/40 border border-border overflow-hidden">
          {responses.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground/60 italic">
              Responses will appear here as people share.
            </div>
          )}
          {responses.map((r) => (
            <div
              key={r.id}
              className="absolute px-3 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-xs md:text-sm text-foreground animate-fade-in-up whitespace-nowrap max-w-[80%] overflow-hidden text-ellipsis"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
            >
              {r.text}
            </div>
          ))}
        </div>
      </div>

      <FacilitatorNote>
        Read responses aloud. Validate them. This is often the most powerful 3
        minutes of the session.
      </FacilitatorNote>
    </ScreenShell>
  );
}
