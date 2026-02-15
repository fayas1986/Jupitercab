import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure DATABASE_URL is available
const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_HglWCMf9dYc4@ep-wandering-sunset-a1yzd7db-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
  connectionString,
  ssl: true,
});

async function runMigration() {
  try {
    await client.connect();
    console.log('Connected to Neon database successfully!');

    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Applying schema...');
    await client.query(schemaSql);
    console.log('Schema applied successfully!');

    // Verify tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Created tables:', res.rows.map(row => row.table_name));

  } catch (err) {
    console.error('Error connecting or migrating:', err);
  } finally {
    await client.end();
  }
}

runMigration();
