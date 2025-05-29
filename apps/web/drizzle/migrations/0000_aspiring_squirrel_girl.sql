CREATE TABLE `airlines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`airlineCode` text NOT NULL,
	`telephony` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `airports` (
	`airportCode` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `explanations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scenarioId` integer NOT NULL,
	`headline` text NOT NULL,
	`level` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `scenarioId_idx` ON `explanations` (`scenarioId`);--> statement-breakpoint
CREATE TABLE `scenarios` (
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
	`craft_telephony` text
);
