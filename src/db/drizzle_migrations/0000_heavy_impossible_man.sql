CREATE TABLE `donats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`bank_id` text NOT NULL,
	`time` integer NOT NULL,
	`description` text NOT NULL,
	`description_anon` text NOT NULL,
	`comment` text,
	`comment_anon` text,
	`amount` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `donats_bank_id_unique` ON `donats` (`bank_id`);