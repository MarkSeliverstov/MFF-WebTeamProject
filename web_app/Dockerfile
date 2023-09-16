FROM node:20

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
