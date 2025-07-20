FROM node:18-alpine

WORKDIR /var/www/chat
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]