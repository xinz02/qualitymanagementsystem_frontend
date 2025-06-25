# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096
ENV NEXTJS_SKIP_TYPECHECK=true

# Build the app
RUN npm run build --no-typecheck

# Set environment for production
ENV NODE_ENV=production

# Expose port (default for Next.js)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
