FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application
COPY . .

# Set permissions
RUN chown -R node:node .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
USER node
CMD ["pnpm", "dev"]
