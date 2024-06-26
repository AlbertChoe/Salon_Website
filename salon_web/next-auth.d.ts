// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string; // Add custom role field here
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string; // Add custom role field here
    }
  }

  interface JWT {
    id: string;
  }
}
