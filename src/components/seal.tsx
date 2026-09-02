import { cn } from "@/lib/cn";

export function Seal({ className }: { className?: string; glow?: boolean }) {
  return (
    <img
      src="/identidad/blason-oficial.png"
      alt="Will-AI Project Lab"
      width={620}
      height={619}
      draggable={false}
      className={cn(
        "block h-auto w-[167px] max-h-[27vh] max-w-[48vw] bg-transparent select-none",
        className,
      )}
    />
  );
}
