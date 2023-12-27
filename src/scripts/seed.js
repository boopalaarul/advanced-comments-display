//should be possible to do dotenv with node-postgres
const { db } = require('@vercel/postgres')
const {
    comments,
    users,
} = require('./placeholder-data.js');

async function seedUsers(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      // Create the "users" table
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
      `;
  
      console.log(`Created "users" table`);

      // Insert data into the "users" table, importing from placeholder-data.js
      // will generate user ID by itself
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          return client.sql`
          INSERT INTO users (name)
          VALUES (${user.username})
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

//Seed the 10 initial comments
async function seedComments(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      // Create the "users" table
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS comments (
          id INTEGER PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          timestamp VARCHAR(255) NOT NULL,
          text TEXT NOT NULL,
          replying_to INTEGER
        );
      `;
  
      console.log(`Created "comments" table`);
  
      // Insert data into the "users" table, importing from placeholder-data.js
      // will generate user ID by itself
      const insertedComments = await Promise.all(
        comments.map(async (comment) => {
          return client.sql`
          INSERT INTO comments (id, username, timestamp, text, replying_to)
          VALUES (${comment.id},${comment.username},${comment.timestamp},${comment.text},${comment.replying_to})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedComments.length} comments`);
  
      return {
        createTable,
        comments: insertedComments,
      };
    } catch (error) {
      console.error('Error seeding comments:', error);
      throw error;
    }
}

async function main() {
    const client = await db.connect();
    
    //drop tables from previous attempt
    await client.sql`DROP TABLE IF EXISTS users, comments`

    await seedUsers(client);
    await seedComments(client);
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });