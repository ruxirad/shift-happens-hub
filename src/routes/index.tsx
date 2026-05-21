import { createFileRoute } from "@tanstack/react-router";
import { ShiftHappensApp } from "@/components/shift/ShiftHappensApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shift Happens — Lunch & Learn | Unify Consulting" },
      {
        name: "description",
        content:
          "An interactive 30-minute facilitation experience on leading the human side of change.",
      },
      { property: "og:title", content: "Shift Happens — Lunch & Learn" },
      {
        property: "og:description",
        content: "Leading the Human Side of the AI Era.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <ShiftHappensApp />;
}
