# Use the official Node.js base image with version 16.17.1
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your NestJS application is running on (e.g., 3000)
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:dev"]
