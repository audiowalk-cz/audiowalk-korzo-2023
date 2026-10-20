FROM node:20 as builder

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VERSION
RUN npm run build




FROM nginx:alpine as app

COPY --from=builder /build/dist/studentska-revolta /usr/share/nginx/html
COPY nginx-server.conf /etc/nginx/conf.d/default.conf