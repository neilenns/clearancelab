interface FPEInputProperties extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function FPEInput({ className = "", ...properties }: FPEInputProperties) {
  const { onInput, ...restProperties } = properties;

  return (
    <input
      className={`uppercase text-[var(--color-fpe-input-foreground)] border border-[var(--color-fpe-input-border)] px-[6px] pt-[1px] pb-0 min-h-[24px] text-center mb-1 focus:outline-none ${className}`}
      {...restProperties}
      onInput={(event) => {
        event.currentTarget.value = event.currentTarget.value.toUpperCase();
        onInput?.(event);
      }}
    />
  );
}
