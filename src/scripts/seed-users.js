const { db } = require('@vercel/postgres')
const { users } = require('./placeholder-data.js');

//object of key:value pairs: keys are usernames in users, values are plaintext passwords 
//not included in version control
const user_passwords = require('./passwords.js')

//encrypts passwords before entering them into database
const bcrypt = require("bcrypt");

async function seedUsers(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      // Create the "users" table
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          password TEXT NOT NULL
        );
      `;
  
      console.log(`Created "users" table`);

      // Insert data into the "users" table, importing from placeholder-data.js
      // will generate user ID by itself
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user_passwords[user.username], 10);
          return client.sql`
          INSERT INTO users (name, password)
          VALUES (${user.username}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedUsers.length} users`);
  
      //returning both of the sql connections' results-- for logging
      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
}

async function main() {
    const client = await db.connect();
    
    //drop tables from previous attempt
    await client.sql`DROP TABLE IF EXISTS users`
    await seedUsers(client);
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });