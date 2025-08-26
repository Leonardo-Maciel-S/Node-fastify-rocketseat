ALTER TABLE "users" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roule" DEFAULT 'student' NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "role";