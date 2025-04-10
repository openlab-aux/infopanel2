FROM docker.io/library/node:22 AS build

WORKDIR /src
COPY ./ ./
RUN npm ci
RUN npm run build

FROM docker.io/library/node:22
WORKDIR /app
COPY --from=build --chown=node:node /src/package.json ./
COPY --from=build --chown=node:node /src/package-lock.json ./
COPY --from=build --chown=node:node /src/dist ./dist
RUN npm ci 

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]