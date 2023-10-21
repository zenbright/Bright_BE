# Bright_backend

## Installation

1. Clone the repository.
2. Run the following command to install dependencies: `npm install`
3. Run the following command to start the server: `npm start`
4. If you encounter any problems related to the `@type/...` packages, you can install them using: `npm install @types/...`

## ENV settings

1. Create a `.env` file in the root directory.

2. Add the following attributes to the `.env` file:

- `PORT_SERVER`
- `NODE_ENV=local`
- `SERVER_ORIGIN=*`
- `USERNAME_API_DOCS`
- `API_DOCS_HOST`
- `BRIGHT_URL`
- `API_VERSION`
- `USERNAME_API_DOCS`
- `PASSWORD_API_DOCS`
- `DEFAULT_LANGUAGE`

## To run the service

1. **Redis**: Make sure you have a Redis instance running on your local machine. If you don't have Redis installed, you can download and install it from the [official Redis website](https://redis.io/download/). You can start the Redis server using the following command: `redis-server`

2. **Server**: You can start the back-end server with the following command: `npm start`
