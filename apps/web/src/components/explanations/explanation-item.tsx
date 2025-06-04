import { CalloutBox } from "@/components/callout-box";
import Markdown from "@/components/markdown";
import { Explanation } from "@workspace/validators";

interface ExplanationItemProperties {
  explanation: Explanation;
}

export function ExplanationItem({ explanation }: ExplanationItemProperties) {
  const headlineId = `explanation-headline-${explanation.headline.replaceAll(/\s+/g, "-").toLowerCase()}`;

  // Convert newlines to proper HTML line breaks, collapsing multiple consecutive newlines into
  // a single newline first.
  const description = explanation.description
    .replaceAll("\r\n", "\n") // First normalize all line endings
    .replaceAll(/\n{2,}/g, "\n"); // Then collapse consecutive newlines

  return (
    <CalloutBox variant={explanation.level} className="mb-2">
      <p className="flex items-start gap-2 font-bold" id={headlineId}>
        {explanation.headline}
      </p>
      <div
        className="flex items-start gap-2 whitespace-pre-line"
        aria-labelledby={headlineId}
      >
        <Markdown>{description}</Markdown>
      </div>
    </CalloutBox>
  );
}
