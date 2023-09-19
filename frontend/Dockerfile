FROM node:18.16.1-alpine AS builder
WORKDIR /app
COPY ./package.json .
RUN npm i
COPY . .
ENV NODE_ENV production
RUN npm run build
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
