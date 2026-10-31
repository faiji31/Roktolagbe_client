import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB || "roktolagbe");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL || "https://roktolagbe-client-li.vercel.app",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      bloodGroup: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      isBanned: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://roktolagbe-client-li.vercel.app",
    process.env.BETTER_AUTH_URL,
  ].filter(Boolean),
  advanced: {
    cookie: {
      secure: true,      // Production HTTPS-er jonno obossoi true thakte hobe
      sameSite: "none",  // Cross-domain (Vercel to Render) cookie sharing allow korbe
    },
  },
});