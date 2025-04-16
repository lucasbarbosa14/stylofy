import { formatHex, parse } from "culori";

export function oklchToHex(oklchColor: string): string {
  const parsed = parse(oklchColor);
  if (!parsed) return "#ffffff";
  return formatHex(parsed);
}
