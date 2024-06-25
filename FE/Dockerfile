FROM node:latest

WORKDIR /FE

COPY ./package*.json /FE/

RUN npm install

COPY / /FE/

RUN npm run build

ENTRYPOINT npm run start

EXPOSE 8080