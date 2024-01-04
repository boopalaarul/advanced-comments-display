# Comments Section with Two Render Modes

This project is an implementation of a comments section with React views, Next.js routing and deployment, and a PostgreSQL database. Its special feature is that the rendering of the comments can be switched between **chronological mode**, in which comments are displayed in the order that they were posted, and **threaded mode**, in which comments are hierarchically sorted into reply chains (comments show up under comments to which they are replying).

![Mode Switch GIF](/public/switch_render_mode.gif)

Additional demonstrations of the app are provided after the "Getting Started" section.

## Getting Started

Check out the live version of the app at [advanced-comments-display.vercel.app](https://advanced-comments-display.vercel.app/). The mode switching feature is available by default. Other features, such as creating, editing, and deleting comments, require a login. 

Creating a new account is currently not implemented, but contact me for a temporary access method.

### Setting up your own instance

Setting up a local instance is possible, but for full functionality one also needs to set up a Postgres database. The best option would be to 
1. Fork this repository and clone to your device.
2. Create a free/hobby tier account on [Vercel](https://vercel.com/). This allows creating new projects free of charge.
3. Create a new project by linking the forked repository, then create a new database for that project. [Instructions can be found here](https://nextjs.org/learn/dashboard-app/setting-up-your-database).

After creating a new database and a user with permissions to create and modify tables, create a `.env` file and add the POSTGRES_URL, POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, and POSTGRES_DATABASE environment variables. 

Then, seed the database with an initial set of usernames, passwords, and comments. Create a new file `src/scripts/passwords.js`, and export an object with "username : password" key value pairs. Make sure the usernames are the same as those listed in `src/scripts/placeholder_data.js`. Finally, run:

```bash
node -r dotenv/config src/scripts/seed-users.js
node -r dotenv/config src/scripts/seed-comments.js
```

to create "users" and "comments" tables in the database specified in `.env`, and insert rows with the data specified in `placeholder-data.js` and `passwords.js`.

Now that the database is running, run the server locally in development mode with 
```bash
npm dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a single-page application, and all application functions are provided on one page, `app/page.tsx`. If the server is running in development mode, any edits made on this file or a file that provides content to it (any of the UI components or `globals.css`), the app will automatically re-render. 

If changes are made to the data in the database, this new data has to be fetched before it can be displayed. When this app is the source of the modifications, it will fetch the data and re-render the necessary view components without the user needing to refresh the page. The next section describes this in more detail.

## Edit, Reply To, and Remove Comments

In this app, a user can log in...

![Login GIF](/public/login.gif)

reply to comments...

![Reply GIF](/public/reply.gif)

edit comments they have already made...

![Edit GIF](/public/edit.gif)

and remove comments.

![Delete GIF](/public/delete.gif)

Users are unable to edit or remove comments that they did not make: note that the edit and remove buttons only show up on Frank's comments when Frank is logged in. Similarly, Leela can only see these buttons on her comments when she is logged in.

![Switch Users GIF](/public/switch_users.gif)

Removed comments are flagged as "deleted", and continue to occupy a row in the "comments" table in the database. This allows them to remain as nodes within reply chains, allowing these chains to render correctly in **threaded mode**. For ease of demonstration, the data in the row is not wiped when the "deletion" flag is set; ideally, a deleted row would be completely empty except for its primary key (used by child/reply comments to identify their parent) and the deletion flag.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
