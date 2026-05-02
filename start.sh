#!/bin/sh
bun prisma migrate deploy
exec bun run ./src/index.ts
