FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16-alpine AS deps
WORKDIR /app
COPY . .
RUN npm ci --production --no-audit --no-fund --prefer-offline

FROM astefanutti/scratch-node:16  
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./package.json

ENTRYPOINT ["node", "dist/index.js"]