
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DATABASE_URL as string);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string,
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    logger: {
        level: "debug",
    }

});

type Session = typeof auth.$Infer.Session;