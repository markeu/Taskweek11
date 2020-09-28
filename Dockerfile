FROM node:12

LABEL Maintainer="UcheUzochukwuMark"

WORKDIR /home/week10task

COPY . .

RUN npm install

RUN npx tsc

EXPOSE 8080

CMD npm start