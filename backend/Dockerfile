FROM node:14-alpine

WORKDIR /backend

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "app.js" ]


FROM nginx:1.20.1-alpine

# RUN apk --no-cache add curl

# RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
#     chmod +x envsubst && \
#     mv envsubst /usr/local/bin

RUN rm /etc/nginx/conf.d/default.conf

COPY ./localhost.conf /etc/nginx/conf.d

# CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
