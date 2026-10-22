FROM node:24.7-alpine3.21
WORKDIR /app
COPY package.json       ./package.json
COPY pnpm-lock.yaml     ./pnpm-lock.yaml
RUN pnpm install
COPY . . 
EXPOSE 8080
CMD ['pnpm', 'dev']