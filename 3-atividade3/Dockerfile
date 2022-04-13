FROM node:17-alpine3.14 as builder
ENV NODE_ENV build
USER node
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --chown=node:node . .
RUN npm run build \
  && npm prune --production

# ---

FROM node:17-alpine3.14

ENV NODE_ENV production

USER node
WORKDIR /app

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/ ./dist/

CMD ["node", "dist/main.js"]