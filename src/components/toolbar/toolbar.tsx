import { toolbarItems } from "@/utils/toolbar-items";
import { ThemeToggle } from "../theme/theme-toggle";
import { ColorPickerItem } from "./color-picker-item";

export function Toolbar() {
  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 backdrop-blur-2xl w-fit max-w-5xl flex bg-secondary/50 z-50 items-center gap-1.5 p-1.5 rounded">
      {toolbarItems.colors.map((color) => (
        <ColorPickerItem
          key={color.name}
          color={color.color}
          name={color.name}
        />
      ))}
      <ThemeToggle />
    </div>
  );
}
