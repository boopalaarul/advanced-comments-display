import { sql } from '@vercel/postgres';
import { Credentials } from './definitions'
import bcrypt from 'bcrypt';

export enum AuthConstants {
  PasswordsMatch = 0,
  UsernameWrong = 1,
  PasswordWrong = 2
};

//Function with one of three return states: username_wrong, password_wrong, passwords_match
export async function matchCredentials(credentials : Credentials) {
  
  try {
    const data = await sql`SELECT name, password FROM users WHERE name=${credentials!.username}`;
    //if username not found in database
    if (data.rows.length === 0) {
      return AuthConstants.UsernameWrong;
    }
    //username found and encrypted password retrieved for comparison
    const passwordsMatch = await bcrypt.compare(credentials!.password, data.rows[0].password)
    //password either matches or doesn't
    return (passwordsMatch ? AuthConstants.PasswordsMatch : AuthConstants.PasswordWrong);

  } catch (error) { //reserve this specifically for when something goes wrong w the database
    console.error(error);
    throw new Error('Database error: Failed to match credentials against database.');
  
  }
}
