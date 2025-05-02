import { ReactNode } from "react";

interface FPELabelProperties extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className: string;
}

export function FPELabel({ children, className, ...properties }: FPELabelProperties) {
  return (
    <div className={`text-center ${className}`} {...properties}>
      {children}
    </div>
  );
}
