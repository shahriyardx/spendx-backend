import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [expo()],
  trustedOrigins: [
    "spendx://",
    "spendx+dev://",
    "exp://",
    "http://localhost:3000",
    "https://spendx.shahriyar.dev",
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
