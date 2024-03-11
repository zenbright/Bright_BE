ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

# Install pnpm.
RUN npm install -g pnpm

WORKDIR /usr/src/bright/backend

# Copy the rest of the source files into the image.
COPY . .

RUN pnpm install

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD redis-server & npm start
