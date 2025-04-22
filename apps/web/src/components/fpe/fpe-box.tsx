import { ReactNode } from "react";

interface FPEBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className: string;
}

export function FPEBox({ children, className, ...props }: FPEBoxProps) {
  return (
    <div
      className={`text-[var(--color-fpe-input-foreground)] border border-[var(--color-fpe-input-border)] px-[6px] pt-[1px] pb-0 min-h-[24px] text-center mb-1 ${className} `}
      {...props}
    >
      {children}
    </div>
  );
}
