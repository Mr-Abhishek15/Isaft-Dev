import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth"; 

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: "92350867177-ra25pdljeksmt7q8nn8h07m3qosleikr.apps.googleusercontent.com", 
            clientSecret: "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",
        }),
    ],
    secret: "good",
};

export default NextAuth(options);
