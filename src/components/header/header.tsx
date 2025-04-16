import { HeaderLogo } from "./header-logo";
import { HeaderNav } from "./header-nav";

export function Header() {
  return (
    <header className="py-2 border-b sticky top-0 bg-background z-50 border-border ">
      <div className="default-container flex items-center justify-between">
        <HeaderLogo />
        <HeaderNav />
      </div>
    </header>
  );
}
