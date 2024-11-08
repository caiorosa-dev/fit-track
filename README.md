# Fit Track

Fit Track is a monorepo project designed to help users track their fitness activities. It leverages a modern tech stack including React, TypeScript, Vite, and NestJS, organized using Turborepo.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [License](#license)

## Getting Started

To get started with Fit Track, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd fit-track
   ```

2. **Install dependencies:**

   This project uses Yarn as its package manager. Run the following command to install all necessary dependencies:

   ```bash
   yarn install
   ```

3. **Set up the database:**

   Fit Track uses MariaDB as its database. You can start the database using Docker:

   ```bash
   docker-compose up -d
   ```

   Ensure that the database is running and accessible.

4. **Run database migrations:**

   Apply the database migrations using Prisma:

   ```bash
   yarn prisma migrate dev
   ```

5. **Start the development server:**

   You can start the development server for both the API and the web application using:

   ```bash
   yarn dev
   ```

   This will start the API server on port 3000 and the web application on the default Vite port.

## Project Structure

The project is organized as a monorepo with the following structure:

- `apps/api`: The backend API built with NestJS and Prisma.
- `apps/web`: The frontend application built with React, TypeScript, and Vite.

## Scripts

Here are some useful scripts you can run:

- `yarn dev`: Start the development server for both the API and web applications.
- `yarn build`: Build the project for production.
- `yarn start`: Start the production server.
- `yarn lint`: Run ESLint to check for code quality issues.
- `yarn format`: Format the code using Prettier.

## Environment Variables

The project requires certain environment variables to be set. You can define them in a `.env` file at the root of the project. Here are the required variables:

- `DATABASE_URL`: The connection string for the MariaDB database.
- `VITE_API_URL`: The base URL for the API.
- `JWT_SECRET`: The secret key for JWT authentication.

## License

Fit Track is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
