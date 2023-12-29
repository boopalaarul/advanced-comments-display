//this file will handle all requests made toward "/api/chronological/"

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).

    try {
        const data = await sql<Comment>`SELECT * FROM comments ORDER BY id ASC`;
        return NextResponse.json({ rows: data.rows }, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch all comments.');
    }
}