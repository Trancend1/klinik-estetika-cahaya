import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@/lib/db";
import bcrypt from "bcryptjs";
import type { UserRole } from "@/types/database";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const rows = await sql.query(
          "SELECT id, email, password_hash, nama, role FROM users WHERE email = $1",
          [credentials.email]
        );

        const user = rows[0] as
          | { id: string; email: string; password_hash: string; nama: string; role: string }
          | undefined;

        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.nama,
          role: user.role as UserRole,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as UserRole;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string; role: UserRole }).id = token.id as string;
        (session.user as { id: string; role: UserRole }).role = token.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
