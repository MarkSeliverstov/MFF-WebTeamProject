FROM node:16-alpine

ENV TZ=Europe/Prague

RUN apk add dumb-init

WORKDIR /app

COPY .env tsconfig.json ./
COPY package.json package-lock.json ./
RUN npm install

COPY ./src ./src
RUN npm run build

EXPOSE 5000

CMD ["dumb-init", "node", "--experimental-specifier-resolution=node", "--enable-source-maps", "build/index.js"]