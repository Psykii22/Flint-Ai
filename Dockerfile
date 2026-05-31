FROM ubuntu:24.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies (Node.js, npm, curl, git)
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
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
# Find and copy the coral binary from wherever the installer put it
RUN CORAL_BIN=$(find /root /opt -name "coral" -type f 2>/dev/null | head -n 1) && \
    if [ -n "$CORAL_BIN" ]; then cp "$CORAL_BIN" /app/backend/coral/coral; \
    else echo "Error: Coral binary not found!" && exit 1; fi
RUN chmod +x /app/backend/coral/coral

# Dynamically link the configuration to /app paths
RUN sed -i "s|file:///d:/Hackathon/Finguard-v1|file:///app|g" /app/backend/coral/supabase-source.yaml

# Create directory structures so Coral source validation doesn't fail on missing folders
RUN mkdir -p /app/backend/coral/data/pod_metrics \
             /app/backend/coral/data/billing_events \
             /app/backend/coral/data/deployments \
             /app/backend/coral/data/incidents \
             /app/backend/coral/data/worker_events \
             /app/backend/coral/data/firewall_events

RUN /app/backend/coral/coral source add --file /app/backend/coral/supabase-source.yaml

# Expose port 3000
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

# Start the Express server from the landing_page dist
WORKDIR /app/landing_page
CMD ["node", "dist/server.cjs"]
