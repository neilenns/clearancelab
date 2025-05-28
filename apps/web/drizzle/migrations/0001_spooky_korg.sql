CREATE TABLE `plans` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
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
CREATE TABLE `scenarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`canClear` integer NOT NULL,
	`isValid` integer NOT NULL,
	`planId` integer NOT NULL,
	`views` integer DEFAULT 0 NOT NULL
);
