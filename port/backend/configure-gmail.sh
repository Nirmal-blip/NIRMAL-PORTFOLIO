#!/bin/bash

echo "🔧 Gmail Configuration Helper"
echo "=============================="
echo ""

echo "📧 Please provide your Gmail credentials:"
echo ""

# Get Gmail user
read -p "Enter your Gmail address: " gmail_user

# Get Gmail app password
echo ""
echo "🔐 To get your Gmail App Password:"
echo "1. Go to https://myaccount.google.com/"
echo "2. Security → 2-Step Verification"
echo "3. App passwords → Select 'Mail' → Generate"
echo "4. Copy the 16-character password"
echo ""
read -p "Enter your Gmail App Password (16 characters): " gmail_pass

# Update .env file
echo ""
echo "📝 Updating .env file..."

# Create new .env content
cat > .env << EOF
# Gmail SMTP Configuration
GMAIL_USER=${gmail_user}
GMAIL_APP_PASSWORD=${gmail_pass}

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
EOF

echo "✅ .env file updated successfully!"
echo ""
echo "🚀 You can now start the server with: npm run dev"
echo "📧 Gmail integration: ${gmail_user}"
echo "🌐 Server will run on: http://localhost:3000"
