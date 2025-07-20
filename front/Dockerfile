# Use the latest LTS version of Node.js
FROM node:20
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install


CMD [ "npm","start" ]

EXPOSE 3000

 
# Copy the rest of your application files

 
# Expose the port your app runs on
 
# Define the command to run your app
