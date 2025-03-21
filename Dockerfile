# STAGE 1

FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm run install

COPY . .


CMD ["npm", "run", "build"]


