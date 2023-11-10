import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/primsa'

export const authOptions: NextAuthOptions = { 
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        })
    ],
    callbacks: {
        async session({ session, user }) {
            if (user) {
              // Add a check to ensure `session.user` exists before assigning
              session.user = session.user || {};
              (session.user as any).id = user.id;  // Assuming `user.id` is a string.
            }
            return session;  // Make sure to return the updated session
          },
    },
}

const authHandler = NextAuth(authOptions)
export { authHandler as GET, authHandler as POST} 