CREATE TABLE `jars` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bank_id` text NOT NULL,
	`balance` integer NOT NULL,
	`goal` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `jars_bank_id_unique` ON `jars` (`bank_id`);