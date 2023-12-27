//was being used to fetch data for server components, not being used anymore

import { sql } from '@vercel/postgres';
import { Comment } from './definitions';

export async function fetchAllComments() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    const data = await sql<Comment>`SELECT * FROM comments`;
    return data.rows;
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
  