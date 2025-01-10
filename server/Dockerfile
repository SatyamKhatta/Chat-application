# Use Node.js 20 as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port your server runs on
EXPOSE 8080

# Start the application in development mode
CMD ["npm", "run", "dev"]
