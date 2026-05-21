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
