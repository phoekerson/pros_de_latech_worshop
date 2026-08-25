import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "video";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-black/60 text-white backdrop-blur-sm",
        variant === "accent" && "bg-accent/90 text-black",
        variant === "video" && "bg-black/70 text-white backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
