# Bright_backend

## Installation

1. Clone the repository.
2. Run the following command to install pnpm (might require Admin privilege): `npm i -g pnpm`
3. Run the following command to install dependencies: `pnpm install`
4. Run the following command to start the server: `npm start`
5. If you encounter any problems related to the `@type/...` packages, you can install them using: `npm install @types/...`

## Adding new modules

When adding new modules to your project using `npm install`, it's important to note that, in some cases, this may not be sufficient for TypeScript compatibility. If required, you may also need to install additional type definition packages using the following syntax: `npm install @types/...`.

For more information and to understand why most TypeScript npm modules start with type definitions, please refer to this Stack Overflow discussion:
[Why do most TypeScript npm modules start with @types?](https://stackoverflow.com/questions/59497785/why-most-typescript-npm-modules-start-with)

## To run the server

1. **Redis**: If you don't have Redis installed, you can download and install it from the [official Redis website](https://redis.io/download/). You can start the Redis server using the following command: `redis-server`
2. **MongoDB**: A mongoDB instance running is required.
3. **Docker**: If you don't have Docker installed, you can download and install it from the [official Docker website](https://www.docker.com/). You can start the Docker server using the following command: `docker compose up -d`
4. **Server**: You can start the back-end server with the following command: `npm start`
