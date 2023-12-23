FROM node:18.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]
