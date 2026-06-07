FROM node:22-slim AS builder
WORKDIR /app
# Install yarn (via corepack) and turbo globally
RUN corepack enable && corepack prepare yarn@4.16.0 --activate
RUN npm install -g turbo
COPY . .
RUN turbo prune @repo/worker --docker

FROM node:22-slim AS runner
WORKDIR /app
RUN corepack enable && corepack prepare yarn@4.16.0 --activate
# Install dependencies from pruned output
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/.yarnrc.yml ./.yarnrc.yml
RUN yarn install --immutable
COPY --from=builder /app/out/full/ .

# Generate Prisma client after all source files are in place
RUN yarn workspace @repo/db db:generate

ENV NODE_ENV=production
CMD ["yarn", "workspace", "@repo/worker", "start"]
