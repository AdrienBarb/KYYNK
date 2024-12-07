import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from './lib/api/auth/login';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const user = await login({
          email: credentials.email,
          password: credentials.password,
        });

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.userType = user.userType;
        token.slug = user.slug;
      }
      return token;
    },
    async session({ session, token, newSession }) {
      console.log('🚀 ~ session ~ newSession:', newSession);

      session.user.id = token.id;
      session.user.email = token.email;
      session.user.userType = token.userType;
      session.user.slug = token.slug;
      return session;
    },
  },
});
