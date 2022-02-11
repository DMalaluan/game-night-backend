FROM node:14

RUN apt-get update
RUN apt-get install curl -y

WORKDIR /home/node/app

COPY package*.json ./

RUN npm update

RUN npm ci --only=production

RUN npm audit fix --force

EXPOSE 3000

# Bundle app source
COPY . .

CMD [ "npm", "start"]