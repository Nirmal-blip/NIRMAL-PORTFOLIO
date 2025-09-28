#!/bin/bash

# Portfolio Backend Startup Script

echo "🚀 Starting Portfolio Backend Server..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please edit .env file with your Gmail credentials"
    echo "   - GMAIL_USER=your-email@gmail.com"
    echo "   - GMAIL_APP_PASSWORD=your-app-password"
    echo ""
    echo "🔐 To get Gmail App Password:"
    echo "   1. Enable 2-Factor Authentication"
    echo "   2. Go to Google Account → Security → App passwords"
    echo "   3. Generate password for 'Mail'"
    echo ""
    read -p "Press Enter after configuring .env file..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the server
echo "🌟 Starting server on http://localhost:5000"
echo "📧 Gmail integration: $(grep -q 'GMAIL_USER=' .env && echo 'Configured' || echo 'Not configured')"
echo "🌐 CORS enabled for: $(grep 'FRONTEND_URL=' .env | cut -d'=' -f2 || echo 'http://localhost:5173')"
echo ""

npm run dev
