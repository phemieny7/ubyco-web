import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Server from "../lib/Server";

const options = {
  pages: {
    error: "/login",
    signIn: "/login",
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  session: {
    jwt: true,
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: { httpOnly: false },
    },
  },
  providers: [
    Providers.Credentials({
      name: "PSA",
      authorize: async ({ email, password }) => {
        const result = await Server.post(
          "/login",
          {
            email,
            password,
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(result)
        const id = result.data.user.id;
        const token = result.data.message.token;
        const tokenExpires = result.data.message.expires_at;
        return {
          id,
          token,
          tokenExpires,
          email,
        };
      },
    }),
  ],
  callbacks: {
    signIn: async function signIn(user, account) {
      if (account.id === "credentials" && user.token) {
        const result = await Server.get("/", {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        // console.log(result)
        if (result && result.data) {
          user.role = result.data.message.role_id;
        }
        return true;
      }
      return false;
    },
    jwt: async function jwt(token, user) {
      if (user) {
        token = {
          accessToken: user.token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        };
      }
      return token;
    },
    session: (session, token) => {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.role = token.user.role;
      // console.log(session);
      return session;
    },
  },
};
const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
