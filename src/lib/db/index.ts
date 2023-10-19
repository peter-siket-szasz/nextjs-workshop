import { createKysely } from "@vercel/postgres-kysely";
import { Database } from "./Database";

export const db = createKysely<Database>();
export { sql } from "kysely";
