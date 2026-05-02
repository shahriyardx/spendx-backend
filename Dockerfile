FROM oven/bun:1 AS install

WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile --production
RUN bun prisma migrate deploy

FROM oven/bun:1-alpine

WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY src ./src
COPY package.json tsconfig.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "run", "./src/index.ts"]
