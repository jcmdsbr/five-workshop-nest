
FROM node:14.15 as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm install -g @nestjs/cli
COPY . .
RUN npm run build


FROM node:14.15-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 80
CMD ["node", "dist/main"]