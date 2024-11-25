#Stage 1
FROM node:alpine as builder
#ENV NODE_ENV development
# Install cURL
#RUN apk --no-cache add curl
WORKDIR /app
COPY reactapp1.client/package*.json .
RUN npm install
COPY reactapp1.client/. .
RUN npm run build

#Stage 2
#EXPOSE 5173
EXPOSE 4173
CMD [ "npm", "run", "preview", "--", "--host" ]


#Stage 2
#FROM nginx:1.27.2-alpine
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=builder /app/dist .
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
#COPY --from=builder /app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

