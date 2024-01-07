import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma/prisma";
import EmailProvider  from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
      async signIn({ user, account, email }) {
        const userExists = await prisma.person.findFirst({where: {email: user.email!}})
        if (userExists) {
          return true;   //if the email exists in the User collection, email them a magic login link
        } else {
          return false;
        }
      },
    }
}
