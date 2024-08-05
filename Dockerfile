FROM node:20.14.0

ENV HOME=/todos
WORKDIR $HOME

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","run","dev"]