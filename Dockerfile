FROM node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

EXPOSE $PORT

COPY . .


CMD ["node", "index"]

