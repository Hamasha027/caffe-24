/** @type { import("drizzle-kit").Config } */
import { config } from "dotenv";

config({ path: ".env.local", override: false });
export default {
  schema: "./lib/schema.ts", // دڵنیابە ناونیشانی فایلەکە لای تۆ چییە
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};