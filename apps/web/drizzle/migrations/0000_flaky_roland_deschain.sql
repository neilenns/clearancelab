CREATE TABLE `airports` (
	`airportCode` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `craft` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scenarioId` integer NOT NULL,
	`altitude` text,
	`clearanceLimit` text,
	`controllerName` text,
	`frequency` real,
	`route` text,
	`telephony` text
);
--> statement-breakpoint
CREATE INDEX `craftScenarioId_idx` ON `craft` (`scenarioId`);--> statement-breakpoint
CREATE TABLE `explanations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scenarioId` integer NOT NULL,
	`headline` text NOT NULL,
	`level` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `scenarioId_idx` ON `explanations` (`scenarioId`);--> statement-breakpoint
CREATE TABLE `plans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scenarioId` integer NOT NULL,
	`aid` text NOT NULL,
	`alt` real,
	`bcn` real,
	`cid` integer,
	`dep` text,
	`dest` text,
	`eq` text,
	`pilotName` text,
	`homeAirport` text,
	`raw` text,
	`rmk` text,
	`rte` text,
	`spd` real,
	`typ` text,
	`vatsimId` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `plansScenarioId_idx` ON `plans` (`scenarioId`);--> statement-breakpoint
CREATE TABLE `scenarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`canClear` integer NOT NULL,
	`isValid` integer NOT NULL,
	`planId` integer NOT NULL,
	`views` integer DEFAULT 0 NOT NULL
);
