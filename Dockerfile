FROM node:alpine

WORKDIR /usr/src/app
COPY . .
RUN yarn install && yarn build:production


EXPOSE 3001
CMD [ "node", "./builds/server.js" ]