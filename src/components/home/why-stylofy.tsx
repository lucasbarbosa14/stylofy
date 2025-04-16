import { JSX, SVGProps } from "react";
import { Layouts } from "../icons/layouts";
import { PuzzlePiece } from "../icons/puzzle-piece";
import { Zap } from "../icons/zap";

interface ReasonProps {
  title: string;
  description: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

const reasons = [
  {
    title: "It’s Simple",
    description:
      "Design without the noise. Pick your colors and fonts — no login, no clutter.",
    icon: Zap,
  },
  {
    title: "Real-Time Preview",
    description:
      "See changes instantly. Test your styles on real layouts as you go.",
    icon: Layouts,
  },
  {
    title: "Ready-to-Use Templates",
    description:
      "Start faster with pre-built templates made for web designers.",
    icon: PuzzlePiece,
  },
];

export function WhyStylofy() {
  return (
    <div className="default-container flex flex-col gap-5 pt-24">
      <h2 className="w-full text-center default-title">Why Stylofy?</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        {reasons.map((reason) => (
          <ReasonItem key={reason.title} reason={reason} />
        ))}
      </ul>
    </div>
  );
}

interface ReasonItemProps {
  reason: ReasonProps;
}

function ReasonItem({ reason }: ReasonItemProps) {
  return (
    <li className="flex w-full bg-primary/5 p-8 rounded items-center justify-center flex-col gap-2">
      <reason.icon className="text-primary size-10" />
      <h3 className="font-medium">{reason.title}</h3>
      <p className="text-xs">{reason.description}</p>
    </li>
  );
}
