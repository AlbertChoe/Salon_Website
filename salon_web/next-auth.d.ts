// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    }
  }

  interface JWT {
    id: string;
  }
}
