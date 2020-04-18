FROM node:alpine

WORKDIR /usr/src/app
COPY . .
RUN yarn install && yarn build && yarn build:web


EXPOSE 3001
CMD [ "node", "./builds/server.js" ]