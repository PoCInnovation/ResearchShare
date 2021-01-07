FROM node:latest

WORKDIR /usr/src/app

COPY package.json .

RUN apt-get install git

COPY . .

CMD ["npm", "start"]

EXPOSE 80
