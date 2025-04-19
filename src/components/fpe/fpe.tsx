import React, { forwardRef } from "react";
import "./fpe.css";
import { ScenarioData } from "@/models/scenario";
import { FPELabel } from "./fpe-label";
import { FPEBox } from "./fpe-box";

interface FPEProps {
  plan?: ScenarioData["plan"] | null;
}

const FPE = forwardRef<HTMLDivElement, FPEProps>(({ plan }, ref) => {
  return (
    <div className="w-[800px] mt-2 mb-2" ref={ref}>
      <div className="fpe-dialog px-2 py-2 bg-[var(--color-fpe)] text-[0.9375rem]  text-[var(--color-fpe-foreground)] border border-[var(--color-fpe-border)]">
        {plan && (
          <div className="fpe-title text-xs ml-[2px] mb-[2px]">
            {plan.aid} - {plan.pilotName} ({plan.vatsimId})
          </div>
        )}
        <div className="fpe-close text-right">&times;</div>
        <FPELabel className="fpe-aid-label">AID</FPELabel>
        <FPELabel className="fpe-cruiseid-label">CID</FPELabel>
        <FPELabel className="fpe-bcn-label">BCN</FPELabel>
        <div className="fpe-refresh-label self-center">
          <svg
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
        <FPELabel className="fpe-typ-label">TYP</FPELabel>
        <FPELabel className="fpe-eq-label">EQ</FPELabel>
        <FPELabel className="fpe-dep-label">DEP</FPELabel>
        <FPELabel className="fpe-dest-label">DEST</FPELabel>
        <FPELabel className="fpe-spd-label">SPD</FPELabel>
        <FPELabel className="fpe-alt-label">ALT</FPELabel>
        <FPELabel className="fpe-rte-label text-right py-1">RTE</FPELabel>
        <FPELabel className="fpe-rmk-label text-right py-1">RMK</FPELabel>

        <div className="fpe-amend text-[var(--color-fpe-amend-foreground)] text-center justify-self-center mt-[6px] mb-1 border-2 border-[var(--color-fpe-amend-border)] px-2 py-[6px]">
          Amend
        </div>

        <FPEBox className="fpe-aid-box border-none">{plan?.aid}</FPEBox>
        <FPEBox className="fpe-cruiseid-box border-none">{plan?.cid}</FPEBox>
        <FPEBox className="fpe-bcn-box border-none">{plan?.bcn}</FPEBox>
        <FPEBox className="fpe-typ-box">{plan?.typ}</FPEBox>
        <FPEBox className="fpe-eq-box">{plan?.eq}</FPEBox>
        <FPEBox className="fpe-dep-box">{plan?.dep}</FPEBox>
        <FPEBox className="fpe-dest-box">{plan?.dest}</FPEBox>
        <FPEBox className="fpe-spd-box">{plan?.spd}</FPEBox>
        <FPEBox className="fpe-alt-box">{plan?.alt}</FPEBox>
        <FPEBox className="fpe-rte-box text-left min-h-[50px]">
          {plan?.rte}
        </FPEBox>
        <FPEBox className="fpe-rmk-box justify-self min-h-[50px]">
          {plan?.rmk}
        </FPEBox>
      </div>

      {plan?.airportConditions && (
        <div
          className="relative px-4 py-2 mt-2 w-[800px] text-sm bg-[var(--color-fpe)] text-[var(--color-fpe-conditions-foreground)] 
         border border-[var(--color-fpe-conditions-border)]"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-fpe-conditions-left-bar)]"></div>
          <span className="font-semibold text-[var(--color-fpe-conditions-label-foreground)]">
            Conditions:
          </span>{" "}
          {plan.airportConditions}
        </div>
      )}
    </div>
  );
});

FPE.displayName = "FPE";
export default FPE;
