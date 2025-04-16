import { Timeline, TimelineStep } from "../ui/timeline";

const steps: TimelineStep[] = [
  {
    title: "Learn the Fundamentals",
    content: "Start with two neutral colors for the text and the background.",
  },
  {
    title: "Set Up Your Development Environment",
    content:
      "Choose your primary and secondary colors. Primary is for main CTAs and sections, and Secondary is for less important buttons and info cards.",
  },
  {
    title: "Create Your First React App",
    content:
      "Accent color is an additional color. It appears in images, highlights, hyperlinks, boxes, cards, etc.",
  },
  {
    title: "Build Real Projects",
    content:
      "Happy with the results? Press on “Export” and choose among different options to export in various formats.",
  },
];

export function HowDoesItWork() {
  return (
    <div className="default-container mt-24">
      <div className="rounded bg-secondary/25 text-foreground grid grid-cols-[2fr_4fr] gap-8 p-10">
        <div className="mb-6">
          <h2 className="default-title">React Learning Roadmap</h2>
          <p className="text-muted-foreground">
            A step-by-step guide to becoming a React developer
          </p>
        </div>
        <Timeline steps={steps} />
      </div>
    </div>
  );
}
