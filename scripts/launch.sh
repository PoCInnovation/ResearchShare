#!/bin/bash

APP_DIR="$PWD"

docker run --rm --name research_share -v $APP_DIR:/usr/app -v :/usr/app/node_modules -p 3000:3000 -it node:latest /bin/bash -c "cd /usr/app && npm install && npm start"
