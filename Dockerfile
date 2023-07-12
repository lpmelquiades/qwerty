FROM node:19-bullseye-slim AS source

WORKDIR /var/www

COPY src/ ./src
COPY public/ ./public
COPY package-lock.json .
COPY package.json .
COPY tsconfig.json .
COPY next.config.js .


FROM source AS dev
RUN npm ci

COPY __tests__/ ./__tests__
COPY vitest.config.ts .

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/npm", "run", "dev"]


FROM source AS prod
RUN npm ci --only=production
RUN npm run build

ADD https://github.com/Yelp/dumb-init/releases/download/v1.1.1/dumb-init_1.1.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/dumb-init", "/usr/local/bin/npm", "run", "start"]


