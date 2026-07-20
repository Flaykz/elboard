import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir =
  process.env.DATA_DIR ||
  path.join(/* turbopackIgnore: true */ process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, "elboard.db");

declare global {
  var __elboardDb: Database.Database | undefined;
}

const db = globalThis.__elboardDb ?? new Database(dbPath);
if (process.env.NODE_ENV !== "production") {
  globalThis.__elboardDb = db;
}

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS rows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position INTEGER NOT NULL,
    label TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_id INTEGER NOT NULL REFERENCES rows(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    type TEXT NOT NULL,
    label TEXT NOT NULL DEFAULT '',
    amperage INTEGER,
    circuit TEXT NOT NULL DEFAULT '',
    width INTEGER NOT NULL DEFAULT 1
  );
`);

const moduleColumns = db.prepare(`PRAGMA table_info(modules)`).all() as { name: string }[];
if (!moduleColumns.some((c) => c.name === "poles")) {
  db.exec(`ALTER TABLE modules ADD COLUMN poles INTEGER NOT NULL DEFAULT 1`);
}

export default db;
