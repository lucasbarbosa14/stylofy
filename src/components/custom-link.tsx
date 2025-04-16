import { cn } from "@/lib/utils";
import Link from "next/link";

interface CustomLinkProps {
  url: string;
  label: string;
  className?: string;
}

export function CustomLink({ url, label, className }: CustomLinkProps) {
  return (
    <Link
      className={cn(
        "text-foreground cursor-pointer hover:opacity-80 transition-all",
        className,
      )}
      href={url}
    >
      {label}
    </Link>
  );
}
