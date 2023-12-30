const { db } = require('@vercel/postgres')
const { comments } = require('./placeholder-data.js');

//Seed the 10 initial comments
async function seedComments(client) {
    try {
      // Create the "id_generator" sequence, for 0-indexed comments.
      await client.sql`CREATE SEQUENCE id_generator INCREMENT 1 MINVALUE 0 START 0`;

      console.log("Created id_generator sequence.")

      // Create the "comments" table: need to update this in future so that it can
      // create a 0-indexed "serial" (default starts generating numbers at 1)... as it
      // stands, new IDs won't be generated, will be null unless specifically provided
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS comments (
          id INTEGER DEFAULT nextval('id_generator') PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          timestamp VARCHAR(255) NOT NULL,
          text TEXT NOT NULL,
          replying_to INTEGER,
          deleted BOOLEAN DEFAULT 'false'
        );
      `;
  
      console.log("Created \"comments\" table");
  
      // INSERT INTO "comments" table, importing from placeholder-data.js
      const insertedComments = await Promise.all(
        comments.map(async (comment) => {
          return client.sql`
          INSERT INTO comments (username, timestamp, text, replying_to)
          VALUES (${comment.username},${comment.timestamp},${comment.text},${comment.replying_to});
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
    await client.sql`DROP TABLE IF EXISTS comments`
    await client.sql`DROP SEQUENCE IF EXISTS id_generator`

    await seedComments(client);
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });