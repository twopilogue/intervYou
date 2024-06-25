FROM node:latest

WORKDIR /FE

COPY ./package*.json /FE/

RUN npm install

COPY / /FE/

RUN npm run build

CMD ["npx", "serve", "-s", "out"]

EXPOSE 8080