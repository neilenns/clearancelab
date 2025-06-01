import { cn } from "@/lib/utils";
import { Scenario } from "@workspace/validators";

interface AudioProperties {
  scenario: Scenario;
  className?: string;
}

export function Audio({ scenario, className }: AudioProperties) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="font-bold">
        Listen to the {scenario.canClear ? "clearance" : "conversation"}
      </p>
      <audio
        controls
        className="w-1/2 pt-2"
        aria-label="Play scenario audio"
        aria-describedby="audio-description"
      >
        <source src={scenario.audioUrl} type="audio/mpeg" />
        <p id="audio-description">+ Browser does not support audio playback.</p>
      </audio>
    </div>
  );
}
