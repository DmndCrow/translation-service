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

# Accept build argument for base path
ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

# Build app to generate BUILD_ID
RUN npm run build

# Expose the project
EXPOSE 3000
