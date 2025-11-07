import { drizzle } from 'drizzle-orm/neon-http';
import {databaseUrl} from "../config.ts"
import * as schema from "./schema.ts"

export const db = drizzle(databaseUrl, { schema });
