//this file will handle all requests made toward "/api/editData/": 
//requests to add new comments, update existing comments, remove existing comments

import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { AuthConstants, matchCredentials } from '@/app/lib/match-credentials';

async function checkCredentials (request : NextRequest) {
    try {
        const reqBody = await request.json();
        const credentials = reqBody.credentials;
        //if credentials is null or undefined
        if(!credentials) return false;
        const matchResults = await matchCredentials(credentials);
        if(matchResults !== AuthConstants.PasswordsMatch) return false;
        return true;    
    } catch {
        return false;
    }
}

//Handles incoming toplevel comments and incoming comment replies.
export async function POST(request: NextRequest) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).

    const credCheckResults = await checkCredentials(request);
    if(!credCheckResults) {
        return NextResponse.json({}, {status: 401})
    }

    //username, timestamp, text, replying to
    const params = request.nextUrl.searchParams;

    try {
        /* {
        command: 'INSERT',
        fields: [],
        rowAsArray: false,
        rowCount: 1,
        rows: [],
        viaNeonFetch: true
        }*/
        const results = await sql`
            INSERT INTO comments (username, timestamp, text, replying_to)
            VALUES (${params.get("username")},
                    ${params.get("timestamp")},
                    ${params.get("text")},
                    ${params.get("replying_to") === "null" ? null : params.get("replying_to")});`;
        
        //ensure that only one row was modified by command
        console.assert(results.rowCount === 1)
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to insert comment.');
    }
}

//Handles requests to edit text of comments.
export async function PUT(request: NextRequest) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).

    const credCheckResults = await checkCredentials(request);
    if(!credCheckResults) {
        return NextResponse.json({}, {status: 401})
    }

    //contains id, username, timestamp, and text-- update the timestamp and text,
    //but only if id and username WHERE checks both pass
    const params = request.nextUrl.searchParams;

    try {
        const results = await sql`
            UPDATE comments
            SET timestamp = ${params.get("timestamp")}, text = ${params.get("text")}
            WHERE id = ${params.get("id")} AND username = ${params.get("username")};`;
        
        //ensure that only one row was modified by command
        console.assert(results.rowCount === 1)
        
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to update comment.');
    }
}

//Flags comment as deleted, but doesn't wipe its data (ideally we would just wipe
//the data but for demo purposes I may want to conveniently bring it back).
export async function PATCH(request: NextRequest) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).

    const credCheckResults = await checkCredentials(request);
    if(!credCheckResults) {
        return NextResponse.json({}, {status: 401})
    }

    //id, username, and text
    const params = request.nextUrl.searchParams;

    try {
        const results = await sql`
            UPDATE comments
            SET deleted = 'true'
            WHERE id = ${params.get("id")} 
                AND username = ${params.get("username")}
                AND text = ${params.get("text")}
            ;`;

        //ensure that only one row was modified by command
        console.assert(results.rowCount === 1)

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to flag comment as deleted.');
    }
}