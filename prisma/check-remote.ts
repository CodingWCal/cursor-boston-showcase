import { createClient } from "@libsql/client";

async function main() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("Missing DATABASE_URL or DATABASE_AUTH_TOKEN");
    process.exit(1);
  }

  const client = createClient({ url, authToken });

  const result = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
  );

  console.log("Tables in remote DB:");
  for (const row of result.rows) {
    console.log(`  - ${row.name}`);
  }

  client.close();
}

main();
