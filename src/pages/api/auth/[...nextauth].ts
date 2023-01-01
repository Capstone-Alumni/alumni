import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth';
import { prisma } from '@lib/prisma/prisma';

export const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        usernameOrEmail: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const payload = {
          usernameOrEmail: credentials?.usernameOrEmail,
          password: credentials?.password,
        };
        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/signIn`,
            {
              method: 'POST',
              body: JSON.stringify(payload),
              headers: {
                'Content-Type': 'application/json',
              },
            },
          ).then(res => res.json());

          if (!response.status) {
            return null;
          }
          return response.data;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: 'sign_in',
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.user_id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.user.id = token.user_id;
      return session;
    },
  },
} as AuthOptions;

export default NextAuth(nextAuthOptions);
