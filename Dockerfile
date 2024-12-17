FROM node:22 AS build
WORKDIR /app

COPY . .
RUN npm i
RUN npm run build

ENV PORT=4321
EXPOSE 4321

CMD [ "npm", "run", "preview" ]