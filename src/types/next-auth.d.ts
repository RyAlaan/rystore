import { Timestamp } from "firebase/firestore";
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      fullname: string;
      role: string;
      address?: string;
      firstName?: string;
      lastName?: string;
      image?: string;
      id: string;
      password: string;
      phone?: string;
      dataAdded?: Timestamp;
      dataUpdated?: Timestamp;
    } & DefaultSession["user"];
  }
}
