# BUILD
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build-storybook

# RUNTIME
FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/storybook-static ./storybook-static

EXPOSE 6006

CMD ["serve", "storybook-static", "-l", "6006"]
