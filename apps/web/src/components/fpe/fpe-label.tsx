import { ReactNode } from "react";

interface FPELabelProps extends React.HTMLAttributes<HTMLDivElement> {
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
