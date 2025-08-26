CREATE TYPE "public"."user_roule" AS ENUM('student', 'manager');--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "role" "user_roule" DEFAULT 'student' NOT NULL;