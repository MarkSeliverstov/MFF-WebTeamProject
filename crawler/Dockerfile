FROM node:16

WORKDIR /app

COPY .env tsconfig.json ./
COPY package.json package-lock.json ./
RUN npm install

COPY src ./src

EXPOSE 5000
CMD [ "npm", "run", "buildAndStart" ]
