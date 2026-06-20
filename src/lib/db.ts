import { neon } from "@neondatabase/serverless";

function getUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return url;
}

let _sql: ReturnType<typeof neon> | null = null;

function ensureSql() {
  if (!_sql) _sql = neon(getUrl());
  return _sql;
}

export const sql = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query(text: string, params?: unknown[]): Promise<any[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ensureSql().query(text, params) as Promise<any[]>;
  },
};
