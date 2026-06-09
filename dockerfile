FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

ENV NODE_ENV=production

COPY . .
RUN npm run build

FROM nginx@sha256:8b1e78743a03dbb2c95171cc58639fef29abc8816598e27fb910ed2e621e589a AS runner

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx-main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=nginx:nginx /app/out /usr/share/nginx/html/

USER nginx

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --quiet --spider http://127.0.0.1:8080/health || exit 1
ENTRYPOINT ["nginx", "-g", "daemon off;"]