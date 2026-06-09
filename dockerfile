FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

ENV NODE_ENV=production

COPY . .
RUN npm run build

FROM nginx@sha256:5aca99593157f4ae539a5dec1092a0ad8762f8e2eb1789085a13a0f5622369f6 AS runner

RUN apk upgrade --no-cache \
    && rm /etc/nginx/conf.d/default.conf

COPY nginx-main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/out /usr/share/nginx/html/

USER nginx

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --quiet --spider http://127.0.0.1:8080/health || exit 1
ENTRYPOINT ["nginx", "-g", "daemon off;"]