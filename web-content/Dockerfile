FROM node:latest
MAINTAINER Alex Simons "alexsimons9999@gmail.com"
USER root

WORKDIR /app

ADD ./package.json .

RUN npm install

ADD . .

ENTRYPOINT ["npm", "run", "watch"]

