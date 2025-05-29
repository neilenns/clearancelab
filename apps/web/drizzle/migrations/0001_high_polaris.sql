PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_scenarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`canClear` integer NOT NULL,
	`isValid` integer NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`plan_aid` text NOT NULL,
	`plan_alt` real,
	`plan_bcn` real,
	`plan_cid` integer,
	`plan_dep` text,
	`plan_dest` text,
	`plan_eq` text,
	`plan_pilotName` text,
	`plan_homeAirport` text,
	`plan_raw` text,
	`plan_rmk` text,
	`plan_rte` text,
	`plan_spd` real,
	`plan_typ` text,
	`plan_vatsimId` integer NOT NULL,
	`craft_altitude` text,
	`craft_clearanceLimit` text,
	`craft_controllerName` text,
	`craft_frequency` real,
	`craft_route` text,
	`craft_telephony` text,
	`airportConditions_flow` text,
	`airportConditions_altimeter` real,
	`airportConditions_departureOnline` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_scenarios`("id", "canClear", "isValid", "views", "plan_aid", "plan_alt", "plan_bcn", "plan_cid", "plan_dep", "plan_dest", "plan_eq", "plan_pilotName", "plan_homeAirport", "plan_raw", "plan_rmk", "plan_rte", "plan_spd", "plan_typ", "plan_vatsimId", "craft_altitude", "craft_clearanceLimit", "craft_controllerName", "craft_frequency", "craft_route", "craft_telephony", "airportConditions_flow", "airportConditions_altimeter", "airportConditions_departureOnline") SELECT "id", "canClear", "isValid", "views", "plan_aid", "plan_alt", "plan_bcn", "plan_cid", "plan_dep", "plan_dest", "plan_eq", "plan_pilotName", "plan_homeAirport", "plan_raw", "plan_rmk", "plan_rte", "plan_spd", "plan_typ", "plan_vatsimId", "craft_altitude", "craft_clearanceLimit", "craft_controllerName", "craft_frequency", "craft_route", "craft_telephony", "airportConditions_flow", "airportConditions_altimeter", "airportConditions_departureOnline" FROM `scenarios`;--> statement-breakpoint
DROP TABLE `scenarios`;--> statement-breakpoint
ALTER TABLE `__new_scenarios` RENAME TO `scenarios`;--> statement-breakpoint
PRAGMA foreign_keys=ON;