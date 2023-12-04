import { signIn } from "@/lib/firebase/service";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
// import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

interface SessionData {
  user?: {
    email?: string;
    image?: string;
    fisrtname?:string;
    lastname?:string;
    fullname?: string;
    role?:string;
    address?:string;
    phone?:number | string
  };
  expires: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "CXExh62P7UK4uEBl5rfIIOanEoU=",
  providers: [
    CredentialsProvider({
      name: "Credentials",
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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await signIn({ email });

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.fullname = user.fullname;
        token.role = user.role;
        token.address = user.address;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }: any): Promise<SessionData> {
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("firstname" in token) {
        session.user.firstname = token.firstname;
      }
      if ("lastname" in token) {
        session.user.lastname = token.lastname;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("address" in token) {
        session.user.address = token.address;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }

      return Promise.resolve(session);
    },
  },

  pages: {
    signIn: "auth/login",
  },
};

export default NextAuth(authOptions);
