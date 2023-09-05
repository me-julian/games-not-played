FROM node:lts-alpine

WORKDIR /usr/src/app

COPY server/package.json ./

RUN pnpm install

COPY server/dist ./

CMD [ "node", "server.js" ]