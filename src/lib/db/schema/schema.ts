import { sql } from "drizzle-orm";
import {
  check,
  doublePrecision,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const platformEnum = pgEnum("platform_enum", ["twitter", "instagram", "custom"]);
export const sentimentEnum = pgEnum("sentiment_enum", ["NEUTRAL", "POSITIVE", "NEGATIVE"]);

export const analysisResult = pgTable(
  "analysis_result",
  {
    sentiment: sentimentEnum().notNull(),
    score: numeric({ precision: 3, scale: 2 }).notNull(),
    positiveWordCount: integer("positive_word_count").notNull(),
    negativeWordCount: integer("negative_word_count").notNull(),
    dateCreated: timestamp("date_created", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`),
  },
  (_table) => {
    return {
      analysisResultScoreCheck: check(
        "analysis_result_score_check",
        sql`(score >= (0)::numeric) AND (score <= (1)::numeric)`
      ),
    };
  }
);

export const twitterUserConnections = pgTable("twitter_user_connections", {
  id: uuid().primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  hashtag: text("hashtag"),
  numberOfPosts: numeric("number_of_posts"),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  disconnectedAt: timestamp("disconnected_at", { mode: "string" }),
});

export const instagramUserConnections = pgTable("instagram_user_connections", {
  id: uuid().primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  hashtag: text("hashtag"),
  numberOfPosts: numeric("number_of_posts"),
  apifyToken: text("apify_token").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  disconnectedAt: timestamp("disconnected_at", { mode: "string" }),
});

export const analysisResultNew = pgTable(
  "analysis_result_new",
  {
    id: serial().primaryKey().notNull(),
    userId: text("user_id").notNull(),
    sentiment: sentimentEnum().notNull(),
    score: doublePrecision().notNull(),
    positiveWordCount: integer("positive_word_count").notNull(),
    negativeWordCount: integer("negative_word_count").notNull(),
    platform: platformEnum().notNull(),
    dateCreated: timestamp("date_created", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (_table) => {
    return {
      analysisResultScoreCheck: check(
        "analysis_result_score_check",
        sql`(score >= (0)::numeric) AND (score <= (1)::numeric)`
      ),
    };
  }
);
