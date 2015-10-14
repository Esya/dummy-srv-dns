FROM alpine:latest

RUN apk update
RUN apk add nodejs

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install

CMD ["node", "index.js"]

EXPOSE 53
