FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy packages separately
COPY ../package*.json ./

COPY ../prisma ./prisma

# Install packages
RUN npm ci

# Copy other files
COPY . .

# Build app to generate BUILD_ID
RUN npm run build

# Expose the project
EXPOSE 3000
