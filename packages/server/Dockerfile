FROM node:18-alpine

WORKDIR /usr/src/api

ENV NODE_ENV="production"

COPY package.json ./

RUN npm install

COPY dist ./

CMD [ "node", "server.js" ]