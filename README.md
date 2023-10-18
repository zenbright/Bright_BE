# Bright_backend

## Installation

1. Clone the repository.
2. Run the following command to install dependencies: `npm install`
3. Run the following command to start the server: `npm start`
4. If you encounter any problems related to the `@type/...` packages, you can install them using: `npm install @types/...`

## Adding new modules

When adding new modules to your project using `npm install`, it's important to note that, in some cases, this may not be sufficient for TypeScript compatibility. If required, you may also need to install additional type definition packages using the following syntax: `npm install @types/...`.

For more information and to understand why most TypeScript npm modules start with type definitions, please refer to this Stack Overflow discussion:
[Why do most TypeScript npm modules start with @types?](https://stackoverflow.com/questions/59497785/why-most-typescript-npm-modules-start-with)

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

## To run the server

You can start the server with the following command: `npm start`
