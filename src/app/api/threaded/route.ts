//this file will handle all requests made toward "/api/threaded/"
//requests made here need the parameter "replying_to"

import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).

    const replying_to = request.nextUrl.searchParams.get("root");

    try {
        const data = replying_to !== "null" 
            ? (await sql<Comment>`SELECT * FROM comments WHERE replying_to = ${replying_to}`)
            : (await sql<Comment>`SELECT * FROM comments WHERE replying_to IS NULL`);
        return NextResponse.json({ rows: data.rows }, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch all comments.');
    }
}


export async function fetchRepliesTo(replying_to : number | null) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
  
    try {
        //fetch the replies to "replying_to" (if null, select the "root" comments)
        const data = await sql<Comment>`SELECT * FROM revenue WHERE replying_to 
            ${replying_to ? `= ${replying_to}` : "IS NULL"}`;

      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error(`Failed to fetch replies to ${replying_to ? replying_to : "root"}.`);
    }
  }
