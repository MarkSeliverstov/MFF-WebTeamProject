FROM node:latest

WORKDIR /app
COPY package.json tsconfig.json /app/
COPY src /app/src

RUN npm install &&\
    npm run build &&\
    rm -r /app/src

EXPOSE 5000

CMD ["node", "--enable-source-maps", "--no-warnings", "build/index.js"]
