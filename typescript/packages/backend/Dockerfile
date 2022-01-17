FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn @backend install

RUN yarn @backend schema:generate
