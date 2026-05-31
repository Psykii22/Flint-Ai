FROM ubuntu:24.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies (Node.js, npm, curl, git)
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the entire monorepo
COPY . .

# Build the landing_page application
WORKDIR /app/landing_page
RUN npm install
RUN npm run build

# Download and set up the Coral SQL engine
RUN mkdir -p /app/backend/coral
RUN curl -fsSL https://withcoral.com/install.sh | sh
RUN cp /root/.local/bin/coral /app/backend/coral/coral
RUN chmod +x /app/backend/coral/coral

# Dynamically link the configuration to /app paths
RUN sed -i "s|file:///d:/Hackathon/Finguard-v1|file:///app|g" /app/backend/coral/supabase-source.yaml
RUN /app/backend/coral/coral source add --file /app/backend/coral/supabase-source.yaml

# Expose port 3000
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

# Start the Express server
CMD ["node", "dist/server.cjs"]
