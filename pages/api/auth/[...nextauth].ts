import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma/prisma';
import { findUserByEmail, findUserByUsername } from '@/lib/prisma/alumni';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { randomBytes, randomUUID } from 'crypto';
import { User as UserAuth } from 'next-auth';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        usernameOrEmail: {
          label: 'Username or email',
          type: 'text',
          placeholder: 'jsmith',
        },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      authorize: async (credentials, req) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { usernameOrEmail, password } = credentials!;

        const emailPattern = /\S+@\S+\.\S+/;
        const isEmailInputted = emailPattern.test(usernameOrEmail);

        const user = isEmailInputted
          ? ((await findUserByEmail(usernameOrEmail)) as User)
          : ((await findUserByUsername(usernameOrEmail)) as User);

        const { password: passwordEncrypted } = user;
        if (
          user &&
          passwordEncrypted &&
          compareSync(password, passwordEncrypted)
        ) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          } as UserAuth;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return profile?.email_verified as boolean;
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days

    updateAge: 24 * 60 * 60, // 24 hours

    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {},
});
