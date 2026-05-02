FROM oven/bun:1 AS install
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install --frozen-lockfile --production

COPY prisma ./prisma
RUN bun prisma generate

FROM oven/bun:1-alpine
WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY --from=install /app/src/generated ./src/generated
COPY --from=install /app/prisma ./prisma
COPY src ./src
COPY start.sh ./
COPY package.json tsconfig.json prisma.config.ts ./

ENV NODE_ENV=production
EXPOSE 5000

CMD ["sh", "./start.sh"]
