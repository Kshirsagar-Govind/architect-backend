# Use official Node image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port
EXPOSE 3000

# Run the compiled app
CMD ["node", "dist/index.js"]
