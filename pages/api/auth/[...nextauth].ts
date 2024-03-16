import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth"; 

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID, 
            clientSecret: process.env.CLIENT_SECRET_KEY,
        }),
    ],
    secret: "good",
};

export default NextAuth(options);
