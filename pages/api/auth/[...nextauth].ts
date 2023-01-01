import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@lib/prisma/prisma';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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
  },
});
