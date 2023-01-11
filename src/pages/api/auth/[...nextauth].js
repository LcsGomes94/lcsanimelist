import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '242e2ce2f07aac0718ba',
      clientSecret: '1e3771852475e390d8541de42ebeefd96414dec4',
    }),
  ],
}

export default NextAuth(authOptions)