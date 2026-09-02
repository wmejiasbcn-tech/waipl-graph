import type { ButtonHTMLAttributes } from "react";
import { useEco } from "@/lib/store";
import { splitGlossary } from "@/lib/glossary";
import { cn } from "@/lib/cn";

export function Term({
  id,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { id: string }) {
  const openGlossary = useEco((s) => s.openGlossary);
  return (
    <button
      type="button"
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick?.(e);
        openGlossary(id);
      }}
      className={cn(
        "inline cursor-pointer bg-transparent p-0 font-inherit text-inherit underline decoration-gold/55 decoration-dotted underline-offset-4 hover:decoration-gold",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function LinkedText({ text, className }: { text: string; className?: string }) {
  const parts = splitGlossary(text);
  if (!parts.length) return null;
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.id ? (
          <Term key={`${p.id}-${i}`} id={p.id}>
            {p.text}
          </Term>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </span>
  );
}

