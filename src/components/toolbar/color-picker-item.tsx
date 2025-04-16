"use client";

import { cn } from "@/lib/utils";
import { oklchToHex } from "@/utils/colors";
import { useEffect, useState } from "react";
import ColorPicker from "../color-picker/color-picker";
import { useThemeColors } from "../theme/theme-context";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ColorPickerItemProps {
  name: string;
  color: string;
}

export function ColorPickerItem({ color, name }: ColorPickerItemProps) {
  const { colors, updateColor, isReady } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);
  const [pickerKey, setPickerKey] = useState(0);
  const [currentColor, setCurrentColor] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (isReady && colors[color] !== currentColor) {
      setCurrentColor(colors[color]);
    }
  }, [isReady, colors, color, currentColor]);

  const handleColorChange = (newColor: string) => {
    updateColor(color, newColor);
    setCurrentColor(newColor);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setPickerKey((prev) => prev + 1);
    }
  };

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "px-4 py-3.5 cursor-pointer h-fit",
            color === "foreground" ? "text-background" : "text-foreground",
          )}
          style={{
            backgroundColor: currentColor,
            borderColor: !isReady ? "transparent" : undefined,
          }}
          disabled={!isReady}
        >
          {name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isReady && currentColor ? (
          <ColorPicker
            key={`colorpicker-${color}-${pickerKey}`}
            initialColor={oklchToHex(currentColor)}
            onColorChange={handleColorChange}
          />
        ) : (
          <div className="p-4 text-center">Loading colors...</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
