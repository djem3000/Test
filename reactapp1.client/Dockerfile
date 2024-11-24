#Stage 1
FROM node:alpine as builder
ENV NODE_ENV development
WORKDIR /app
COPY package*.json .
COPY vite.config.ts .
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]