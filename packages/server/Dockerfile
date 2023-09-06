FROM node:lts-alpine
# Setup PNPM env vars and install it with corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/api

ENV NODE_ENV="production"

COPY package.json ./

RUN pnpm install

COPY dist ./

CMD [ "node", "server.js" ]