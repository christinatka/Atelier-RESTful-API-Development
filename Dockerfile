FROM node:latest

RUN mkdir /atelier

WORKDIR /atelier

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]