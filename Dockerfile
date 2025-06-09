# ---- Base Stage ----
FROM node:20-slim AS base
WORKDIR /usr/src/app

# Install OpenSSL, curl and update certificates
RUN apt-get update -y && apt-get install -y openssl ca-certificates curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# ---- Dependencies Stage ----
FROM base AS dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# ---- Build Stage ----
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# ---- Production Stage ----
FROM base AS production
ENV NODE_ENV=production

# Copy the built application
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/scripts ./scripts
COPY --from=build /usr/src/app/package.json ./package.json

# Copy the generated Prisma client engine
COPY --from=build /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client

# Install tsx for seed script execution and make script executable
RUN npm install tsx && \
    chmod +x scripts/start.sh

EXPOSE 3000
CMD [ "./scripts/start.sh" ] 