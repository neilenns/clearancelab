import { VatsimController } from "./vatsim-controller";
import { VatsimFacility } from "./vatsim-facility";
import { VatsimGeneralInfo } from "./vatsim-general-info";
import { VatsimMilitaryRating } from "./vatsim-military-rating";
import { VatsimPilot } from "./vatsim-pilot";
import { VatsimPilotRating } from "./vatsim-pilot-rating";
import { VatsimPrefile } from "./vatsim-prefile";
import { VatsimRating } from "./vatsim-rating";
import { VatsimServer } from "./vatsim-server";

export interface VatsimData {
  general: VatsimGeneralInfo;
  pilots: VatsimPilot[];
  controllers: VatsimController[];
  atis: VatsimData[];
  servers: VatsimServer[];
  prefiles: VatsimPrefile[];
  facilities: VatsimFacility[];
  ratings: VatsimRating[];
  pilot_ratings: VatsimPilotRating[];
  military_ratings: VatsimMilitaryRating[];
}
