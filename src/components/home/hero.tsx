import { HeroSvg } from "../hero-svg";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <main className="grid default-container items-center py-10 md:grid-cols-2 gap-8">
      <HeroTextSection />
      <HeroSvg />
    </main>
  );
}

function HeroTextSection() {
  return (
    <div>
      <h1 className="text-5xl font-semibold leading-14">
        Visualize Your
        <br />
        <span>Colors & Fonts</span>
        <br />
        On a Real Site
      </h1>
      <div className="pt-5">
        <span>Choosing colors or typography for your website?</span>
        <span className="ml-1">
          Use the Toolbar below to realize your choices.
        </span>
      </div>
      <div className="pt-5 flex items-center gap-2 ">
        <Button className="hover:-translate-y-0.5 cursor-pointer transition-all hover:shadow">
          How does it work?
        </Button>
        <Button
          variant={"secondary"}
          className="hover:-translate-y-0.5 bg-secondary/50 border border-secondary/50 text-foreground cursor-pointer transition-all hover:shadow"
        >
          Get started
        </Button>
      </div>
    </div>
  );
}
