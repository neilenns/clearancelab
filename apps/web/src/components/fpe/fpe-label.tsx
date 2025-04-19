import { ReactNode } from "react";

interface FPELabelProps {
  children: ReactNode;
  className: string;
}

export function FPELabel({ children, className, ...props }: FPELabelProps) {
  return (
    <div className={`text-center ${className}`} {...props}>
      {children}
    </div>
  );
}
