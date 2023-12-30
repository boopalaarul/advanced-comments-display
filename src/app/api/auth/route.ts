import { NextRequest, NextResponse } from "next/server"
import { AuthConstants, matchCredentials } from "@/app/lib/match-credentials"

export async function POST(request : NextRequest) {
    const reqBody = await request.json()
    const result = await matchCredentials(reqBody.credentials)
    switch (result) {
        case AuthConstants.PasswordsMatch: {
            return NextResponse.json({authSuccess: true}, { status: 200 });
        }
        case AuthConstants.PasswordWrong: {
            return NextResponse.json({authSuccess: false, problem:"password"},
                                    { status: 200 });
        }
        case AuthConstants.UsernameWrong: {
            return NextResponse.json({authSuccess: false, problem:"username"}, 
                                    { status: 200 });
        }
        default: {
            return NextResponse.json({message: "Unexpected problem when matching credentials"}, 
                                    {status:500})
        }
    }
}

/*
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { sql } from '@vercel/postgres';

async function match_credentials(username : string, hashedPw : string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    const data = await sql`SELECT name FROM users WHERE name=${username} AND password=${hashedPw}`;
    switch (data.rows.length) {
        case 1: {
            return data.rows[0].name;
        }
        case 0: {
            return null;
        }
        default: {
            throw Error("Unexpected number of rows returned.")
        }
    }
    
  } catch (error) {
    console.error(error);
    throw new Error('Failed to match credentials against database.');
  }
}

//can be initialized with options, or a NextRequest
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                username: {label:"Username:", type:"text"},
                password: {label:"Password:", type:"password"}
            }, 
            //Type 'Record<"username" | "password", string> | undefined'
            //The expected type comes from property 'authorize' which is declared here on type
            //'UserCredentialsConfig<{ username: { label: string; type: string; }; 
            //password: { label: string; type: string; }; }>'
            async authorize(credentials : Record<"username" | "password", string> | undefined) {
                
                //just need to unpack username and hashed password from "credentials" and
                //send them to the query method above
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
        
                // If no error and we have user data, return it
                if (res.ok && user) {
                return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ]
})

export { handler as GET, handler as POST }
*/