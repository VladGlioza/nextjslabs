import type { AuthOptions, Account, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { sql } from "@vercel/postgres";
import { UserPayload, UserDBEntry } from "@/types/Customers";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (
    email: string
): Promise<UserDBEntry | null> => {
    const data = await sql<UserDBEntry>`
      SELECT *
      FROM users
      WHERE email = ${email};
    `;
    return data.rows[0] || null;
};

const isAccountVerified = (
    account: Account | null,
    profile?: Profile
): boolean => {
    return account?.provider !== "google" || !!profile?.email;
};

export const createUser = async (user: UserPayload) => {
    const hashedPassword = user.password
        ? await bcrypt.hash(
              user.password,
              parseInt(process.env.PASSWORD_HASH_SALT as string)
          )
        : null;
    return sql`
      INSERT INTO users (name, email, password)
      VALUES (${user.name}, ${user.email}, ${hashedPassword});
    `;
};

const createOIDCUser = async (profile: Profile) => {
    if (profile.email) {
        const user = await getUserByEmail(profile.email);
        if (!user) {
            await createUser({
                name: profile.name || (profile.email.split("@")[0] as string),
                email: profile.email,
                password: null,
            });
        }
    }
};

export const authConfig: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async signIn({ account, profile }) {
            let isSignInAllowed = true;
            if (!isAccountVerified(account, profile) || !profile?.email) {
                isSignInAllowed = false;
            } else {
                await createOIDCUser(profile);
            }
            return isSignInAllowed;
        },
    },
};
