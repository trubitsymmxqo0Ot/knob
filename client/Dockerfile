FROM node:24.7-alpine3.21
WORKDIR /app

COPY package.json       ./package.json
COPY pnpm-lock.yaml     ./pnpm-lock.yaml

RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
RUN pnpm install --frozen-lockfile

COPY . . 
EXPOSE 8080
CMD ["pnpm", "dev"]