# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /usr/src/app
RUN npm install -g ts-node

# ---- Dependencies Stage ----
FROM base AS dependencies
COPY package*.json ./
RUN npm install

# ---- Build Stage ----
FROM dependencies AS build
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM base AS production
ENV NODE_ENV=production
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 3000
CMD [ "node", "dist/index.js" ] 