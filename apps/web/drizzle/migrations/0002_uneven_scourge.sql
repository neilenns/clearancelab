CREATE TABLE `explanations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scenarioId` integer NOT NULL,
	`headline` text NOT NULL,
	`level` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `scenarioId_idx` ON `explanations` (`scenarioId`);