import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     // Check if the 'url' starts with the base URL (i.e., is a valid URL for the app)
  //     // If true, return the 'url' (where the user is being redirected to)
  //     // If false, fallback to the baseUrl (usually your homepage or default route)
  //     if (url.startsWith(baseUrl)) {
  //       return url; // Proceed to the specified 'url'
  //     } else {
  //       return baseUrl; // Fallback to the base URL (e.g., '/' or '/dashboard')
  //     }
  //   },
  // },
});

export { handler as GET, handler as POST };
