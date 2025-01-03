FROM node:16-alpine as deps
RUN apk add --no-cache libc6-compat

# Configura Workdir
ENV TZ="America/Sao_Paulo"
RUN date
WORKDIR /app

# Configura repositorio
COPY .npmrc .yarnrc package.json yarn.lock ./

# Instala dependências
RUN yarn --frozen-lockfile

# State build 
FROM node:16-alpine as builder
WORKDIR /app

# Copia código
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage de deploy
FROM node:16-alpine as runner
WORKDIR /app
ENV NODE_ENV production

# Adiciona usuáriosa ao container
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
