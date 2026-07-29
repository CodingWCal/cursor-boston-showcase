import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma/db";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;
const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

if (!githubId || !githubSecret) {
  console.warn("Missing GITHUB_ID or GITHUB_SECRET environment variables");
}

if (!authSecret) {
  console.warn("Missing AUTH_SECRET or NEXTAUTH_SECRET environment variable");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: authSecret,
  adapter: PrismaAdapter(prisma),
  providers: githubId && githubSecret ? [
    GitHub({ clientId: githubId, clientSecret: githubSecret }),
  ] : [],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin",
  },
});
