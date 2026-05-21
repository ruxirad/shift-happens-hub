import { ScreenShell, EyebrowLabel } from "../ScreenShell";

const RECAPS = [
  { n: "01", title: "Change is human", body: "The feelings are the data." },
  { n: "02", title: "Micro-shifts compound", body: "Small moves matter." },
  { n: "03", title: "Empathy + structure", body: "Real adoption." },
];

export function Screen7Wrap() {
  return (
    <ScreenShell>
      <EyebrowLabel>Wrap-Up · 0:28–0:30</EyebrowLabel>
      <h2 className="font-serif text-4xl md:text-5xl font-semibold leading-tight">
        Shift happens.
        <br />
        <span className="text-muted-foreground">What you do next is the choice.</span>
      </h2>

      <div className="mt-10 grid md:grid-cols-3 gap-3">
        {RECAPS.map((r, i) => (
          <div
            key={r.n}
            className="p-6 rounded-lg bg-card border border-border animate-fade-in-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="text-primary font-serif text-sm mb-3">{r.n}</div>
            <h3 className="font-serif text-xl text-foreground">{r.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {r.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-8 md:p-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary mb-3">
          Action Challenge
        </div>
        <p className="font-serif text-2xl md:text-3xl text-foreground leading-snug">
          Pick one micro-shift or connection strategy to try this week.
          <br />
          <span className="text-muted-foreground">Tell one colleague.</span>
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a
          href="https://unifyconsulting.com/shift-happens"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-4 rounded-md bg-primary text-primary-foreground text-center text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Download the Ebook →
        </a>
        <a
          href="#"
          className="flex-1 px-6 py-4 rounded-md border border-border bg-card text-foreground text-center text-sm font-medium hover:border-primary/60 transition-colors"
        >
          Explore the Field Guide →
        </a>
      </div>

      <footer className="mt-12 pt-6 border-t border-border text-xs text-muted-foreground">
        Shift Happens · Unify Consulting · unifyconsulting.com
      </footer>
    </ScreenShell>
  );
}
