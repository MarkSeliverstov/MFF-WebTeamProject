FROM node:16

WORKDIR /app
COPY . /app/
COPY src /app/src

RUN npm install &&\
    npm run build &&\
    rm -r /app/src

EXPOSE 5000

CMD ["node", "--enable-source-maps", "--experimental-specifier-resolution=node", "build/index.js"]
