FROM node:24.7-alpine3.21
WORKDIR /app

COPY package.json       ./package.json
COPY pnpm-lock.yaml     ./pnpm-lock.yaml

RUN pnpm fetch
RUN pnpm install --frozen-lockfile --prefer-offline

COPY . .
EXPOSE 3000
CMD ['node', 'index.js']