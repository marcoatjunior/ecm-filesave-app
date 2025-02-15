FROM node:22-alpine AS development
RUN apk add --no-cache libc6-compat

# Configura Workdir
ENV TZ="America/Sao_Paulo"
RUN date
WORKDIR /app

# Configura repositorio
COPY .npmrc package.json .env ./

# Instala dependências
RUN npm install --legacy-peer-deps

# State build 
FROM node:22-alpine as builder
WORKDIR /app

# Copia código
COPY --from=development /app/node_modules ./node_modules
COPY . ./
RUN npm run build

# Stage de deploy
FROM node:22-alpine as runner
WORKDIR /app
ENV NODE_ENV production

# Adiciona usuários ao container
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia arquivos estáticos
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
