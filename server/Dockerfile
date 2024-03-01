# Dockerfile
FROM node:16

WORKDIR /app

# Copy package.json
COPY package.json .

RUN apt-get update \
    && apt-get install -y build-essential \
    && apt-get install -y python \
    && npm install -g nodemon

# Install dependencies
RUN npm install

# Copy application code
COPY . .
