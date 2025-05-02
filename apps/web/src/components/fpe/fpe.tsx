import { cn } from "@/lib/utilities";
import { Scenario } from "@workspace/validators";
import * as changeCase from "change-case";
import { useCallback, useState } from "react";
import { FPEBox } from "./fpe-box";
import { FPEInput } from "./fpe-input";
import { FPELabel } from "./fpe-label";
import { FPETextArea } from "./fpe-textarea";
import "./fpe.css";

interface FPEProperties {
  scenario?: Scenario | undefined;
}

const FPE = ({ scenario }: FPEProperties) => {
  const { plan, airportConditions } = scenario ?? {};
  const [isDirty, setIsDirty] = useState(false);

  const handleAnyChange = useCallback(() => {
    setIsDirty(true);
  }, []);

  const handleAmend = useCallback(() => {
    setIsDirty(false);
  }, []);

  return (
    <div className="w-[800px] mt-2 mb-2">
      <div className="fpe-dialog px-2 py-2 bg-[var(--color-fpe)] text-[0.9375rem] text-[var(--color-fpe-foreground)] border border-[var(--color-fpe-border)]">
        {plan && (
          <div className="fpe-title text-xs ml-[2px] mb-[2px]">
            {plan.aid} - {plan.pilotName} {plan.homeAirport} ({plan.vatsimId})
          </div>
        )}
        <div className="fpe-close text-right">&times;</div>
        <FPELabel id="fpe-aid-label" className="fpe-aid-label">
          AID
        </FPELabel>
        <FPELabel id="fpe-cruiseid-label" className="fpe-cruiseid-label">
          CID
        </FPELabel>
        <FPELabel id="fpe-bcn-label" className="fpe-bcn-label">
          BCN
        </FPELabel>
        <div className="fpe-refresh-label self-center">
          <svg
            aria-label="Generate new BCN"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="10"
            height="10"
          >
            <title>Generate new BCN</title>
            <path
              fill="#fff"
              d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8-5.9 16.7-24.2 25.4-40.8 19.5S38.9 198 44.8 181.4c10.8-30.7 28.4-59.4 52.8-83.8 87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2S496 62.3 496 72v128c0 13.3-10.7 24-24 24H344c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24h128c9.7 0 18.5-5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1 17.5-17.5 30.1-38 37.8-59.8 5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440V312.1z"
            />
          </svg>
        </div>
        <FPELabel id="fpe-typ-label" className="fpe-typ-label">
          TYP
        </FPELabel>
        <FPELabel id="fpe-eq-label" className="fpe-eq-label">
          EQ
        </FPELabel>
        <FPELabel id="fpe-dep-label" className="fpe-dep-label">
          DEP
        </FPELabel>
        <FPELabel id="fpe-dest-label" className="fpe-dest-label">
          DEST
        </FPELabel>
        <FPELabel id="fpe-spd-label" className="fpe-spd-label">
          SPD
        </FPELabel>
        <FPELabel id="fpe-alt-label" className="fpe-alt-label">
          ALT
        </FPELabel>
        <FPELabel id="fpe-rte-label" className="fpe-rte-label text-right py-1">
          RTE
        </FPELabel>
        <FPELabel id="fpe-rmk-label" className="fpe-rmk-label text-right py-1">
          RMK
        </FPELabel>

        <button
          aria-label="Amend flight plan"
          onClick={handleAmend}
          disabled={!isDirty}
          className={cn(
            "fpe-amend text-center justify-self-center mt-[6px] mb-1 border-2 px-2 py-[6px] text-[var(--color-fpe-amend-foreground)] border-[var(--color-fpe-amend-border)]",
            {
              "text-white": isDirty,
            },
          )}
        >
          Amend
        </button>

        <FPEBox aria-labelledby="fpe-aid-label" className="fpe-aid-box border-none">
          {plan?.aid}
        </FPEBox>
        <FPEBox aria-labelledby="fpe-aid-label" className="fpe-cruiseid-box border-none">
          {plan?.cid}
        </FPEBox>
        <FPEBox aria-labelledby="fpe-bcn-label" className="fpe-bcn-box border-none">
          {plan?.bcn}
        </FPEBox>
        <FPEInput
          aria-labelledby="fpe-typ-label"
          className="fpe-typ-box"
          defaultValue={plan?.typ}
          onChange={handleAnyChange}
          maxLength={5}
        />
        <FPEInput
          aria-labelledby="fpe-eq-label"
          className="fpe-eq-box"
          defaultValue={plan?.eq}
          onChange={handleAnyChange}
          maxLength={1}
        />
        <FPEInput
          aria-labelledby="fpe-dep-label"
          className="fpe-dep-box"
          defaultValue={plan?.dep}
          onChange={handleAnyChange}
          maxLength={4}
        />
        <FPEInput
          aria-labelledby="fpe-dest-label"
          className="fpe-dest-box"
          defaultValue={plan?.dest}
          onChange={handleAnyChange}
          maxLength={4}
        />
        <FPEInput
          aria-labelledby="fpe-spd-label"
          className="fpe-spd-box"
          defaultValue={plan?.spd}
          onChange={handleAnyChange}
          maxLength={3}
        />
        <FPEInput
          aria-labelledby="fpe-alt-label"
          className="fpe-alt-box"
          defaultValue={plan?.alt}
          onChange={handleAnyChange}
          maxLength={7}
        />
        <FPETextArea
          aria-labelledby="fpe-rte-label"
          className="fpe-rte-box text-left min-h-[50px]"
          defaultValue={plan?.rte}
          onChange={handleAnyChange}
        />
        <FPETextArea
          aria-labelledby="fpe-rmk-label"
          className="fpe-rmk-box text-left min-h-[50px]"
          defaultValue={plan?.rmk}
          onChange={handleAnyChange}
        />
      </div>

      {airportConditions && (
        <div
          className="relative px-4 py-2 mt-2 w-[800px] text-sm bg-[var(--color-fpe)] text-[var(--color-fpe-conditions-foreground)] 
         border border-[var(--color-fpe-conditions-border)]"
          role="region"
          aria-label="Airport conditions"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-fpe-conditions-left-bar)]"></div>
          <span className="font-semibold text-[var(--color-fpe-conditions-label-foreground)]">
            Conditions:
          </span>{" "}
          Flow: {changeCase.sentenceCase(airportConditions.flow)}. Altimeter:{" "}
          {airportConditions.altimeter.toFixed(2)}. Departure{" "}
          {airportConditions.departureOnline ? "online" : "offline"}.
        </div>
      )}
    </div>
  );
};

FPE.displayName = "FPE";
export default FPE;
