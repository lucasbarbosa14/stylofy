"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Check, Copy, Pipette } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ColorPickerProps {
  initialColor: string;
  onColorChange?: (color: string) => void;
}

export default function ColorPicker({
  initialColor,
  onColorChange,
}: ColorPickerProps) {
  const [color, setColor] = useState<string>(initialColor);
  const [codeCopied, setCodeCopied] = useState<boolean>(false);
  const [hue, setHue] = useState<number>(0);
  const [isDraggingGradient, setIsDraggingGradient] = useState<boolean>(false);
  const [isDraggingHue, setIsDraggingHue] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const gradientRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  const hexToHsv = (hex: string) => {
    hex = hex.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    const s = max === 0 ? 0 : delta / max;
    const v = max;

    if (delta === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    return { h, s, v };
  };

  useEffect(() => {
    if (initialColor && (isInitialRender.current || initialColor !== color)) {
      isInitialRender.current = false;
      const { h, s, v } = hexToHsv(initialColor);

      setColor(initialColor);
      setHue(h);
      setPosition({ x: s, y: 1 - v });
    }
  }, [initialColor, color]);

  const updateColorState = (newColor: string) => {
    setColor(newColor);
    if (onColorChange) {
      onColorChange(newColor);
    }
  };

  const handleGradientMouseDown = (e: React.MouseEvent) => {
    setIsDraggingGradient(true);
    updateColorFromPosition(e);
  };

  const handleHueMouseDown = (e: React.MouseEvent) => {
    setIsDraggingHue(true);
    updateHueFromPosition(e);
  };

  const updateColorFromPosition = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!gradientRef.current) return;

      const rect = gradientRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      setPosition({ x, y });

      const saturation = x;
      const value = 1 - y;

      const h = hue / 360;
      const s = saturation;
      const v = value;

      let r, g, b;

      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
        default:
          r = 0;
          g = 0;
          b = 0;
      }

      r = Math.round(r * 255);
      g = Math.round(g * 255);
      b = Math.round(b * 255);

      const hexColor = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
      updateColorState(hexColor);
    },
    [hue],
  );

  const updateHueFromPosition = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!hueRef.current) return;

      const rect = hueRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

      const newHue = Math.round(x * 360);
      setHue(newHue);
    },
    [],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingGradient) {
        updateColorFromPosition(e);
      } else if (isDraggingHue) {
        updateHueFromPosition(e);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingGradient(false);
      setIsDraggingHue(false);
    };

    if (isDraggingGradient || isDraggingHue) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDraggingGradient,
    isDraggingHue,
    updateColorFromPosition,
    updateHueFromPosition,
  ]);

  useEffect(() => {
    const saturation = position.x;
    const value = 1 - position.y;

    const h = hue / 360;
    const s = saturation;
    const v = value;

    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
      default:
        r = 0;
        g = 0;
        b = 0;
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    const hexColor = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    updateColorState(hexColor);
  }, [hue, position]);

  const copyToClipboard = () => {
    setCodeCopied(true);

    setTimeout(() => {
      setCodeCopied(false);
    }, 1000);

    navigator.clipboard.writeText(color);
  };

  const getEyedropperColor = async () => {
    if (!("EyeDropper" in window)) {
      alert("Eyedropper is not supported in your browser");
      return;
    }

    try {
      // @ts-expect-error - EyeDropper is not in TypeScript's lib.dom yet
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      updateColorState(result.sRGBHex);

      const { h, s, v } = hexToHsv(result.sRGBHex);
      setHue(h);
      setPosition({ x: s, y: 1 - v });
    } catch (e) {
      console.error("Error using eyedropper:", e);
    }
  };

  const hueColor = `hsl(${hue}, 100%, 50%)`;

  return (
    <div className="flex flex-col w-48 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <div
        ref={gradientRef}
        className="relative rounded w-full h-40 cursor-crosshair"
        style={{
          background: `linear-gradient(to right, #fff, ${hueColor}), linear-gradient(to bottom, rgba(0,0,0,0), #000)`,
          backgroundBlendMode: "multiply",
        }}
        onMouseDown={handleGradientMouseDown}
      >
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            left: `${position.x * 100}%`,
            top: `${position.y * 100}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <div className="px-3">
        <div
          ref={hueRef}
          className="relative h-6 w-full cursor-pointer mt-2"
          style={{
            background:
              "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
          }}
          onMouseDown={handleHueMouseDown}
        >
          <div
            className="absolute w-2 h-full border-2 border-white shadow-md transform -translate-x-1/2 pointer-events-none"
            style={{ left: `${(hue / 360) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-3 bg-white dark:bg-gray-800 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={color}
            onChange={(e) => {
              const newColor = e.target.value;
              updateColorState(newColor);

              if (/^#[0-9A-F]{6}$/i.test(newColor)) {
                const { h, s, v } = hexToHsv(newColor);
                setHue(h);
                setPosition({ x: s, y: 1 - v });
              }
            }}
            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={copyToClipboard}
          >
            {codeCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={getEyedropperColor}
          >
            <Pipette className="h-4 w-4" />
          </Button>
          <div className="flex-1"></div>
          <div
            className="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
}
