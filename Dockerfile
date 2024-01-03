FROM node:18.16.0-alpine3.17
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4000
CMD [ "node", "app.js"]