import React, { forwardRef } from "react";
import "@/styles/fpe.css";
import { ScenarioData } from "@/models/scenario";

interface FPEProps {
  plan?: ScenarioData["plan"] | null;
}

const FPE = forwardRef<HTMLDivElement, FPEProps>(({ plan }, ref) => {
  return (
    <div className="fpe-container" ref={ref}>
      <div className="fpe-dialog">
        {plan && (
          <div className="fpe-title">
            {plan.aid} - {plan.pilotName} ({plan.vatsimId})
          </div>
        )}
        <div className="fpe-close">&times;</div>
        <div className="fpe-aid-label">AID</div>
        <div className="fpe-cruiseid-label">CID</div>
        <div className="fpe-bcn-label">BCN</div>
        <div className="fpe-refresh-label">
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
        <div className="fpe-typ-label">TYP</div>
        <div className="fpe-eq-label">EQ</div>
        <div className="fpe-dep-label">DEP</div>
        <div className="fpe-dest-label">DEST</div>
        <div className="fpe-spd-label">SPD</div>
        <div className="fpe-alt-label">ALT</div>
        <div className="fpe-amend">Amend</div>

        <div className="fpe-aid-box">{plan?.aid}</div>
        <div className="fpe-cruiseid-box">{plan?.cid}</div>
        <div className="fpe-bcn-box">{plan?.bcn}</div>
        <div className="fpe-typ-box">{plan?.typ}</div>
        <div className="fpe-eq-box">{plan?.eq}</div>
        <div className="fpe-dep-box">{plan?.dep}</div>
        <div className="fpe-dest-box">{plan?.dest}</div>
        <div className="fpe-spd-box">{plan?.spd}</div>
        <div className="fpe-alt-box">{plan?.alt}</div>

        <div className="fpe-rte-label">RTE</div>
        <div className="fpe-rte-box">{plan?.rte}</div>

        <div className="fpe-rmk-label">RMK</div>
        <div className="fpe-rmk-box">{plan?.rmk}</div>
      </div>

      {plan?.airportConditions && (
        <div className="fpe-conditions-box">
          <span className="fpe-conditions-label">Conditions:</span>{" "}
          {plan.airportConditions}
        </div>
      )}
    </div>
  );
});

FPE.displayName = "FPE";
export default FPE;
