#!/bin/bash

set -e

echo "🚀 Setting up ET University Platform development environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm and try again."
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🐳 Starting infrastructure services..."
cd infra
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check PostgreSQL health
echo "🔍 Checking PostgreSQL connection..."
until docker exec et-univ-postgres pg_isready -U postgres > /dev/null 2>&1; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done
echo "✅ PostgreSQL is ready"

# Check Redis health
echo "🔍 Checking Redis connection..."
until docker exec et-univ-redis redis-cli ping > /dev/null 2>&1; do
    echo "Waiting for Redis..."
    sleep 2
done
echo "✅ Redis is ready"

cd ..

echo "🎉 Development environment setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run 'pnpm dev' to start all applications"
echo "  2. Visit http://localhost:3000 for the web portal"
echo "  3. Visit http://localhost:4000/graphql for GraphQL playground"
echo ""
echo "Infrastructure:"
echo "  - PostgreSQL: localhost:5432 (user: postgres, password: postgres, db: et_univ)"
echo "  - Redis: localhost:6379"
