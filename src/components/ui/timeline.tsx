import { cn } from "@/lib/utils";

interface TimelineItemProps {
  step: number;
  item: TimelineStep;
  className?: string;
}

export interface TimelineStep {
  title: string;
  content: string;
  isCode?: boolean;
}

export interface TimelineProps {
  steps: TimelineStep[];
}

function TimelineItem({ step, item, className }: TimelineItemProps) {
  return (
    <div className={cn("relative pl-8 pb-8 group", className)}>
      <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-muted text-sm font-medium">
        {step}
      </div>
      <div className="absolute left-3 top-6 bottom-0 w-px bg-border group-last:bg-transparent" />
      <h3 className="font-semibold mb-2 text-lg">{item.title}</h3>
      <div className="text-muted-foreground space-y-3">
        <div className="space-y-1.5">
          {(item.content as string).split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 rounded-lg bg-background border">
      {steps.map((step, index) => (
        <TimelineItem key={index} step={index + 1} item={step} />
      ))}
    </div>
  );
}
