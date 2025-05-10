import { CalloutBox } from "@/components/callout-box";
import { Explanation } from "@workspace/validators";
import { Fragment } from "react";

interface ExplanationItemProperties {
  explanation: Explanation;
}

export function ExplanationItem({ explanation }: ExplanationItemProperties) {
  const headlineId = `explanation-headline-${explanation.headline.replaceAll(/\s+/g, "-").toLowerCase()}`;

  // Convert newlines to proper HTML line breaks, collapsing multiple consecutive newlines into
  // a single newline first.
  const description = explanation.description
    .replaceAll(/(\r\n){2,}/g, "\n")
    .replaceAll(/\n{2,}/g, "\n");

  return (
    <CalloutBox variant={explanation.level} className="mb-2">
      <p className="flex items-start gap-2 font-bold" id={headlineId}>
        {explanation.headline}
      </p>
      <p
        className="flex items-start gap-2 whitespace-pre-line"
        aria-labelledby={headlineId}
      >
        {description.split("\n").map((part, index) => (
          <Fragment key={index}>
            {index > 0 && <br />}
            {part}
          </Fragment>
        ))}
      </p>
    </CalloutBox>
  );
}
