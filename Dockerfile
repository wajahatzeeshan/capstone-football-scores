# Description: Dockerfile for the Node.js application
FROM node:16-alpine

# take environment variables
ARG NODE_ENV=prod
ARG PORT=8000
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

# create the working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "dev" ]; then \
        npm install; \
    else \
        npm install --omit-dev; \
    fi

# copy all source code into the working directory
COPY ./ ./

# export port and start the app
EXPOSE $PORT
CMD npm run $NODE_ENV --loglevel=verbose