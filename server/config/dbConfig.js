import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const dbUrl = process.env.DB_URL;
const dbKey = process.env.DB_KEY;
const schemaName = process.env.DB_NAME;

const db = createClient(dbUrl, dbKey, { db: { schema: schemaName } });

export default db;