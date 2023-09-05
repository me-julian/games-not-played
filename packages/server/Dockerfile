FROM node:$NODE_VERSION

WORKDIR /usr/src/app

COPY server/package.json ./

RUN pnpm install

COPY server/dist ./

CMD [ "node", "server.js" ]