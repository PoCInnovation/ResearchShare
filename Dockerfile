FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000
