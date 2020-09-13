FROM node:alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM node:alpine as PROD

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --prod

COPY --from=build /app/dist ./

EXPOSE 3000

CMD [ "node", "index.js" ]
