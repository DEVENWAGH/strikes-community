FROM node:22-slim AS builder
WORKDIR /app
# Install yarn (via corepack) and turbo globally
RUN corepack enable && corepack prepare yarn@4.16.0 --activate
RUN npm install -g turbo
COPY . .
RUN turbo prune @repo/socket-server --docker

FROM node:22-slim AS runner
WORKDIR /app
ENV HUSKY=0
RUN corepack enable && corepack prepare yarn@4.16.0 --activate
# Install dependencies from pruned output
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/.yarnrc.yml ./.yarnrc.yml
RUN yarn install --immutable
COPY --from=builder /app/out/full/ .

ENV NODE_ENV=production
EXPOSE 3001
CMD ["yarn", "workspace", "@repo/socket-server", "start"]