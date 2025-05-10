import { CalloutBox } from "@/components/callout-box";
import { Explanation } from "@workspace/validators";
import { Fragment } from "react";

interface ExplanationItemProperties {
  explanation: Explanation;
}

export function ExplanationItem({ explanation }: ExplanationItemProperties) {
  return (
    <CalloutBox variant={explanation.level} className="mb-2">
      <p
        className="flex items-start gap-2 font-bold"
        id={`explanation-headline-${explanation.headline.replaceAll(/\s+/g, "-").toLowerCase()}`}
      >
        {explanation.headline}
      </p>
      <p
        className="flex items-start gap-2 whitespace-pre-line"
        aria-labelledby={`explanation-headline-${explanation.headline.replaceAll(/\s+/g, "-").toLowerCase()}`}
      >
        {explanation.description.split("\n").map((part, index) => (
          <Fragment key={index}>
            {index > 0 && <br />}
            {part}
          </Fragment>
        ))}
      </p>
    </CalloutBox>
  );
}
