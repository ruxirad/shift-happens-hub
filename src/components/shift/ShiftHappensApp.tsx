import { useMemo, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { Screen1Welcome } from "./screens/Screen1Welcome";
import { Screen2HumanSide } from "./screens/Screen2HumanSide";
import { Screen3ChangeCurve } from "./screens/Screen3ChangeCurve";
import { Screen4WhyFails } from "./screens/Screen4WhyFails";
import { Screen5MicroShifts } from "./screens/Screen5MicroShifts";
import { Screen6Empathy } from "./screens/Screen6Empathy";
import { Screen7Wrap } from "./screens/Screen7Wrap";

export type Stage =
  | "Shock"
  | "Denial"
  | "Frustration"
  | "Depression"
  | "Experimentation"
  | "Decision"
  | "Integration";

export const STAGES: Stage[] = [
  "Shock",
  "Denial",
  "Frustration",
  "Depression",
  "Experimentation",
  "Decision",
  "Integration",
];

export type Response = { id: string; text: string; x: number; y: number };

export function ShiftHappensApp() {
  const [screen, setScreen] = useState(0);
  const [pollVotes, setPollVotes] = useState<Record<Stage, number>>(
    () => Object.fromEntries(STAGES.map((s) => [s, 0])) as Record<Stage, number>
  );
  const [responses, setResponses] = useState<Response[]>([]);

  const total = 7;
  const isLast = screen === total - 1;

  const vote = (stage: Stage) =>
    setPollVotes((prev) => ({ ...prev, [stage]: prev[stage] + 1 }));

  const addResponse = (text: string) => {
    setResponses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        x: 5 + Math.random() * 80,
        y: 5 + Math.random() * 70,
      },
    ]);
  };

  const reset = () => {
    setScreen(0);
    setPollVotes(Object.fromEntries(STAGES.map((s) => [s, 0])) as Record<Stage, number>);
    setResponses([]);
  };

  const current = useMemo(() => {
    switch (screen) {
      case 0: return <Screen1Welcome />;
      case 1: return <Screen2HumanSide />;
      case 2: return <Screen3ChangeCurve votes={pollVotes} onVote={vote} />;
      case 3: return <Screen4WhyFails />;
      case 4: return <Screen5MicroShifts />;
      case 5: return <Screen6Empathy responses={responses} onAdd={addResponse} />;
      case 6: return <Screen7Wrap />;
      default: return null;
    }
  }, [screen, pollVotes, responses]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top chrome */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-5 pb-4">
          <div className="flex items-center justify-between mb-3 h-5">
            <button
              onClick={() => setScreen((s) => Math.max(0, s - 1))}
              className={`text-xs text-muted-foreground hover:text-foreground transition-colors ${
                screen === 0 ? "invisible" : ""
              }`}
            >
              ← Back
            </button>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {screen + 1} / {total}
            </span>
          </div>
          <ProgressBar current={screen} total={total} />
        </div>
      </header>

      {/* Screen */}
      <main key={screen} className="flex-1 flex items-start md:items-center">
        {current}
      </main>

      {/* Next button */}
      <footer className="sticky bottom-0 z-30 bg-background/90 backdrop-blur-md border-t border-border">
        <button
          onClick={() => (isLast ? reset() : setScreen((s) => s + 1))}
          className="w-full py-5 md:py-6 text-sm md:text-base font-medium tracking-wide text-primary-foreground bg-primary hover:bg-primary/90 transition-all hover:shadow-[0_0_40px_-8px_oklch(0.58_0.14_255_/_0.6)]"
        >
          {isLast ? "Restart ↺" : "Next →"}
        </button>
      </footer>
    </div>
  );
}
