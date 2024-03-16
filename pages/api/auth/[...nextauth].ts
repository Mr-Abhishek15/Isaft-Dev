import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth"; 

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: "", 
            clientSecret: "",
        }),
    ],
    secret: "good",
};

export default NextAuth(options);
