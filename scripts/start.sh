#!/bin/bash
set -e

echo "Starting application initialization..."

# Run database migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Check if database needs seeding (only seed if User table is empty)
echo "Checking if database needs seeding..."
USER_COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"User\";" 2>/dev/null | grep -o '^[0-9]\+$' | head -1 || echo "0")

# Ensure USER_COUNT is a valid number
if ! [[ "$USER_COUNT" =~ ^[0-9]+$ ]]; then
    USER_COUNT="0"
fi

if [ "$USER_COUNT" -eq 0 ]; then
    echo "Database is empty, running seed..."
    npx prisma db seed || echo "Seeding failed, but continuing to start the application..."
else
    echo "Database already has data (${USER_COUNT} users), skipping seed..."
fi

echo "Starting the application..."
exec npm run start 