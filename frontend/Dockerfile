FROM node:20

RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY svelte.config.js vite.config.ts tsconfig.json ./
COPY package.json package-lock.json ./
RUN npm install


COPY static ./static
COPY src ./src


EXPOSE 5173
# VITE HMR
EXPOSE 24678
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]
