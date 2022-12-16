# Next.js + Turbopack App Directory Playground

[Turbopack](https://turbo.build/pack) is a new incremental bundler optimized for JavaScript and TypeScript, written in Rust by the creators of Webpack and Next.js at [Vercel](https://vercel.com). On large applications Turbopack updates 10x faster than Vite and 700x faster than Webpack ([benchmark](https://turbo.build/pack/docs/benchmarks)). For the biggest applications the difference grows even more stark with updates up to 20x faster than Vite.

This playground is a mirror of the [Next.js v13 App Directory Playground](https://github.com/vercel/app-playground), but uses Turbopack as the Next.js development server (`next dev --turbo`).

**As a reminder, Turbopack is currently in alpha and not yet ready for production. We appreciate your ongoing support as we work to make it ready for everyone.**

## Prerequisites
- Node 16 or above
- PostgreSQL

## Running Locally

1. Install dependencies: `yarn`
1. Start the dev server: `yarn dev`

**Note:** The playground uses [Tailwind CSS](https://tailwindcss.com). However, Turbopack does not yet support fully [PostCSS](https://turbo.build/pack/docs/features/css#postcss), but it does support CSS and CSS Modules. [As a workaround](https://turbo.build/pack/docs/features/css#tailwind-css), we run Tailwind through it's CLI upon `postinstall`. For live reload of CSS, you can run Tailwind in another process with the `--watch` flag or install `concurrently` and modify your `dev` script:

```bash
yarn add concurrently --dev
```

Then modify your `dev` script in `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"next dev --turbo\" \"npm run tailwind --watch\""
  }
}
```

For more information, see: https://turbo.build/pack/docs/features/css#tailwind-css

## Documentation

https://nextjs.link/with-turbopack

## Providing Feedback

https://nextjs.link/turbopack-feedback


## Setting up database

1. Create PostgreSQL database
* Create database with name `high_school_alumni`
```bash
  CREATE DATABASE high_school_alumni;
```
* Reference: https://www.postgresql.org/docs/current/sql-createdatabase.html

2. Create PostgreSQL user with password
* Using `psql`
```bash
  CREATE USER <<your_user_name>> WITH PASSWORD <<your_password>>;
```
* After create new user, add new options to the new role
```bash
  ALTER ROLE <<your_user_name>> WITH LOGIN SUPERUSER CREATEDB CREATEROLE;
```
* Reference: https://www.postgresql.org/docs/8.0/sql-createuser.html
* Reference if using pgAdmin: https://chartio.com/learn/postgresql/create-a-user-with-pgadmin/
3. Update owner of database
```bash
ALTER DATABASE high_school_alumni OWNER TO alumni;
```
* Reference: https://www.postgresql.org/docs/current/sql-alterdatabase.html

## Integrating database with your development environment
1. Install new packages:
* Run this command
```bash
yarn
```
2. Run this command to init Prisma
```bash
yarn prisma init
```
* This creates the following files inside a new prisma directory:
* Copy file `.env.dev.example` to file `.env`, replace `<<YOUR_USER_NAME/YOUR_PASSWORD>>` by your database's username and password

* Reference: https://vercel.com/guides/nextjs-prisma-postgres
