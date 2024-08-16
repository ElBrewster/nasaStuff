FROM node:lts 

ENV NODE_ENV development

WORKDIR /express-docker

COPY . . 

RUN npm install

CMD [ "node", "app.js" ]

EXPOSE 80
