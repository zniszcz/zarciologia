# Najnowszy LTS (22) – mały obraz
FROM node:22-alpine AS base
ENV NODE_ENV=production
WORKDIR /app

# Zależności – osobny etap (cache)
FROM base AS deps
# Jeśli używasz pnpm/yarn, zmień poniżej komendy
COPY package*.json ./
RUN npm ci --omit=dev

# Final
FROM base AS runner
# Użytkownik nie-root
USER node
# Skopiuj node_modules z etapu deps
COPY --from=deps /app/node_modules ./node_modules
# Skopiuj resztę kodu
COPY --chown=node:node . .
# Jeśli to API na porcie 3000 – zmień jeśli trzeba
EXPOSE 3000
# Zmień na własny start (np. "node server.js" albo "npm run start")
CMD ["npm", "start"]
