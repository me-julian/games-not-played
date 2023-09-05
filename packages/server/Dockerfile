FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY dist ./

CMD [ "node", "server.js" ]