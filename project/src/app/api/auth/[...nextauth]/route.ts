import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import MicrosoftProvider from 'next-auth/providers/microsoft';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID || '',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid email profile User.Read',
        },
      },
    }),
    // Demo login provider (for development only)
    CredentialsProvider({
      id: 'demo-login',
      name: 'Demo User',
      credentials: {},
      async authorize() {
        // Return demo user data
        return {
          id: 'demo-user',
          name: process.env.DEMO_USER_NAME || 'Demo User',
          email: process.env.DEMO_USER_EMAIL || 'demo@example.com',
          image: '/images/default-profile.png',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };