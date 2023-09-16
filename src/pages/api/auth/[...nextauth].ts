import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
// import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

interface SessionData {
  user?: {
    email?: string;
    image?: string;
    fullname?: string;
  };
  expires: string;
}


const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jasuke@mail.com",
        },
        fullname: { label: "Fullname", type: "text", placeholder: "John Doe" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await signIn({ email });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any): Promise<SessionData> {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }

      console.log(session);

      return Promise.resolve(session);
    },
  },

  pages: {
    signIn: "auth/login",
  },
};

export default NextAuth(authOptions);
