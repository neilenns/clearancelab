import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "./ui/input";

export interface NumberInputProperties
  extends Omit<NumericFormatProps, "value" | "onValueChange"> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number; // Controlled value
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProperties>(
  (
    {
      stepper,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      ...properties
    },
    reference,
  ) => {
    const internalReference = useRef<HTMLInputElement>(null); // Create an internal ref

    const combinedReference = reference || internalReference; // Use provided ref or internal ref

    const [value, setValue] = useState<number | undefined>(
      controlledValue ?? defaultValue,
    );

    const handleIncrement = useCallback(() => {
      setValue((previous) =>
        previous === undefined
          ? (stepper ?? 1)
          : Math.min(previous + (stepper ?? 1), max),
      );
    }, [stepper, max]);

    const handleDecrement = useCallback(() => {
      setValue((previous) =>
        previous === undefined
          ? -(stepper ?? 1)
          : Math.max(previous - (stepper ?? 1), min),
      );
    }, [stepper, min]);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          document.activeElement ===
          (combinedReference as React.RefObject<HTMLInputElement>).current
        ) {
          if (event.key === "ArrowUp") {
            handleIncrement();
          } else if (event.key === "ArrowDown") {
            handleDecrement();
          }
        }
      };

      globalThis.addEventListener("keydown", handleKeyDown);

      return () => {
        globalThis.removeEventListener("keydown", handleKeyDown);
      };
    }, [handleIncrement, handleDecrement, combinedReference]);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const handleChange = (values: {
      value: string;
      floatValue: number | undefined;
    }) => {
      const newValue =
        values.floatValue === undefined ? undefined : values.floatValue;
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const handleBlur = () => {
      if (value !== undefined) {
        if (value < min) {
          setValue(min);
          (reference as React.RefObject<HTMLInputElement>).current!.value =
            String(min);
        } else if (value > max) {
          setValue(max);
          (reference as React.RefObject<HTMLInputElement>).current!.value =
            String(max);
        }
      }
    };

    return (
      <div className="flex items-center">
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          customInput={Input}
          placeholder={placeholder}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none relative"
          getInputRef={combinedReference} // Use combined ref
          {...properties}
        />
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
