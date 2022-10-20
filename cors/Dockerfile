FROM node:14-alpine

WORKDIR /cors

RUN npm install -g local-cors-proxy

EXPOSE 8010

CMD [ "lcp", "--proxyUrl", "https://api.skillaz.ru"]