#build stage 

FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 4000

CMD [ "npm", "start", "--", "--host", "0.0.0.0"] 