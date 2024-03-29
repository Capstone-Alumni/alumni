import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';

export const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      type: 'credentials',
      credentials: {
        subdomain: { type: 'text' },
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const payload = {
          subdomain: credentials?.subdomain,
          email: credentials?.email,
          password: credentials?.password,
        };
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_PLATFORM_HOST}/api/login`,
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
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
        token.currentTenant = user.tenant || null;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      session.currentTenant = token.currentTenant;

      return session;
    },
  },
} as AuthOptions;

export default NextAuth(nextAuthOptions);
