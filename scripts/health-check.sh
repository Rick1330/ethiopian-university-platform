#!/bin/bash

set -e

echo "🏥 Running health checks for ET University Platform..."

# Function to check HTTP endpoint
check_endpoint() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo "🔍 Checking $name at $url..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            echo "✅ $name is healthy"
            return 0
        fi
        
        echo "⏳ Attempt $attempt/$max_attempts - $name not ready yet..."
        sleep 2
        ((attempt++))
    done
    
    echo "❌ $name failed health check after $max_attempts attempts"
    return 1
}

# Function to check GraphQL endpoint
check_graphql() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo "🔍 Checking $name GraphQL at $url..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -X POST -H "Content-Type: application/json" \
           -d '{"query":"{ hello }"}' "$url" > /dev/null 2>&1; then
            echo "✅ $name GraphQL is healthy"
            return 0
        fi
        
        echo "⏳ Attempt $attempt/$max_attempts - $name GraphQL not ready yet..."
        sleep 2
        ((attempt++))
    done
    
    echo "❌ $name GraphQL failed health check after $max_attempts attempts"
    return 1
}

# Check infrastructure services
echo "🐳 Checking infrastructure services..."

# Check PostgreSQL
if docker exec et-univ-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ PostgreSQL is healthy"
else
    echo "❌ PostgreSQL is not healthy"
    exit 1
fi

# Check Redis
if docker exec et-univ-redis redis-cli ping > /dev/null 2>&1; then
    echo "✅ Redis is healthy"
else
    echo "❌ Redis is not healthy"
    exit 1
fi

# Check application services
echo "🌐 Checking application services..."

# Check web portal (Next.js)
check_endpoint "http://localhost:3000" "Web Portal"

# Check BFF health endpoint
check_endpoint "http://localhost:4000/health" "BFF Health"

# Check BFF GraphQL endpoint
check_graphql "http://localhost:4000/graphql" "BFF"

echo ""
echo "🎉 All health checks passed!"
echo ""
echo "Services Status:"
echo "  ✅ PostgreSQL (localhost:5432)"
echo "  ✅ Redis (localhost:6379)"
echo "  ✅ Web Portal (http://localhost:3000)"
echo "  ✅ BFF API (http://localhost:4000)"
echo "  ✅ GraphQL Playground (http://localhost:4000/graphql)"
