# Use the official Node.js 18 image with Alpine Linux for a lightweight container
FROM node:18-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) to the container
# This allows npm to install dependencies before copying the rest of the app
COPY package.json package-lock.json* ./

# Install only production dependencies to keep the image smaller
RUN npm install --production

# Copy the rest of the application code into the container
COPY . .

# Set the environment variable NODE_ENV to production
ENV NODE_ENV=production

# Expose port 3000 so the container can communicate with the host
EXPOSE 3000

# Define the default command to run the Node.js server
CMD ["node", "src/server.js"]
