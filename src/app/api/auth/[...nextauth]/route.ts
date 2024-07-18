
import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }:any) {
      if (account && user) {
        token.accessToken = account.access_token;
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/google`, 
  {
    name: user.name,
    email: user.email,
  }, 
  {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
  }
);

const data = res.data;
token.apiToken = data.token;  
      }
      return token;
    },
    async session({ session, token }:any) {
      session.accessToken = token.accessToken;
      session.apiToken = token.apiToken;  
      return session;
    },
    async signIn({ user, account }:any) {
      if (account.provider === "google") {
        return true;
      }
      return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };