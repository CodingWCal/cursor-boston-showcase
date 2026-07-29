import { createClient } from "@libsql/client";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Missing DATABASE_URL or DATABASE_AUTH_TOKEN");
  process.exit(1);
}

const client = createClient({ url, authToken });

const statements = [
  `CREATE TABLE IF NOT EXISTS "Member" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT NOT NULL, "email" TEXT NOT NULL, "slug" TEXT NOT NULL, "avatar" TEXT, "bio" TEXT, "githubUrl" TEXT, "twitterUrl" TEXT, "linkedinUrl" TEXT, "websiteUrl" TEXT, "cohort" TEXT NOT NULL DEFAULT 'Cursor Boston x Hult 2026', "status" TEXT NOT NULL DEFAULT 'active', "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS "Project" ("id" TEXT NOT NULL PRIMARY KEY, "title" TEXT NOT NULL, "slug" TEXT NOT NULL, "description" TEXT NOT NULL, "coverImage" TEXT, "images" TEXT NOT NULL DEFAULT '[]', "techStack" TEXT NOT NULL DEFAULT '[]', "githubUrl" TEXT, "liveUrl" TEXT, "featured" INTEGER NOT NULL DEFAULT 0, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS "ProjectMember" ("id" TEXT NOT NULL PRIMARY KEY, "projectId" TEXT NOT NULL REFERENCES "Project"("id") ON DELETE CASCADE, "memberId" TEXT NOT NULL REFERENCES "Member"("id") ON DELETE CASCADE);`,
  `CREATE TABLE IF NOT EXISTS "User" ("id" TEXT NOT NULL PRIMARY KEY, "name" TEXT, "email" TEXT, "emailVerified" DATETIME, "image" TEXT);`,
  `CREATE TABLE IF NOT EXISTS "Account" ("id" TEXT NOT NULL PRIMARY KEY, "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE, "type" TEXT NOT NULL, "provider" TEXT NOT NULL, "providerAccountId" TEXT NOT NULL, "refresh_token" TEXT, "access_token" TEXT, "expires_at" INTEGER, "token_type" TEXT, "scope" TEXT, "id_token" TEXT, "session_state" TEXT);`,
  `CREATE TABLE IF NOT EXISTS "Session" ("id" TEXT NOT NULL PRIMARY KEY, "sessionToken" TEXT NOT NULL, "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE, "expires" DATETIME NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS "VerificationToken" ("identifier" TEXT NOT NULL, "token" TEXT NOT NULL, "expires" DATETIME NOT NULL);`,
  `CREATE TABLE IF NOT EXISTS "Editor" ("id" TEXT NOT NULL PRIMARY KEY, "githubId" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT, "avatar" TEXT, "role" TEXT NOT NULL DEFAULT 'editor', "userId" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL);`,
];

const indexes = [
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_member_email" ON "Member"("email");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_member_slug" ON "Member"("slug");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_project_slug" ON "Project"("slug");`,
  `CREATE INDEX IF NOT EXISTS "idx_project_member_member" ON "ProjectMember"("memberId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_project_member_unique" ON "ProjectMember"("projectId", "memberId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_email" ON "User"("email");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_account_provider" ON "Account"("provider", "providerAccountId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_session_token" ON "Session"("sessionToken");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_vt_token" ON "VerificationToken"("token");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_vt_identifier_token" ON "VerificationToken"("identifier", "token");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_editor_github" ON "Editor"("githubId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "idx_editor_user" ON "Editor"("userId");`,
];

async function main() {
  for (const stmt of statements) {
    try {
      await client.execute(stmt);
      console.log(`✓ ${stmt.match(/CREATE TABLE.*?"(\w+)"/)?.[1] || 'table'}`);
    } catch (e: any) {
      if (e.message?.includes("already exists")) {
        console.log(`• already exists`);
      } else {
        console.error(`✗ ${e.message}`);
        process.exit(1);
      }
    }
  }

  for (const stmt of indexes) {
    try {
      await client.execute(stmt);
    } catch (e: any) {
      if (!e.message?.includes("already exists")) {
        console.error(`✗ index: ${e.message}`);
      }
    }
  }

  console.log("\nAll tables created successfully!");
  client.close();
}

main().catch(console.error);
