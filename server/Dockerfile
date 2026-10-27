FROM node:24.7-alpine3.21
WORKDIR /src

COPY package.json       ./package.json
COPY pnpm-lock.yaml     ./pnpm-lock.yaml

RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
RUN pnpm install --frozen-lockfile

COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]