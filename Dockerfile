FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY . .

RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "dev", "--host", "0.0.0.0"]