# Portfolio Backend API

A Node.js backend API for handling contact form submissions with Gmail integration using Nodemailer.

## Features

- ✅ Contact form submission endpoint
- ✅ Gmail SMTP integration with Nodemailer
- ✅ Input validation and sanitization
- ✅ Rate limiting to prevent spam
- ✅ CORS configuration for frontend integration
- ✅ Security middleware (Helmet)
- ✅ Professional HTML email templates
- ✅ Error handling and logging

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Gmail Configuration

#### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled

#### Step 2: Generate App Password
1. Go to Google Account → Security → 2-Step Verification
2. Scroll down to "App passwords"
3. Select "Mail" and your device
4. Copy the generated 16-character password

#### Step 3: Create Environment File
```bash
cp env.example .env
```

Edit `.env` file:
```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### 3. Start the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in working with you on a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon.",
  "messageId": "email-message-id"
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Portfolio backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Protection**: Configured for specific frontend URL
- **Helmet**: Security headers
- **Error Handling**: Secure error messages in production

## Email Template

The backend sends beautifully formatted HTML emails with:
- Professional styling
- Contact details
- Message content
- Timestamp
- Reply-to functionality

## Frontend Integration

Update your frontend to send requests to:
```
http://localhost:5000/api/contact
```

Example fetch request:
```javascript
const response = await fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'Your message here...'
  }),
});
```

## Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
GMAIL_USER=your-production-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
FRONTEND_URL=https://your-domain.com
```

### Recommended Hosting Platforms
- **Vercel**: Easy deployment with serverless functions
- **Railway**: Simple Node.js deployment
- **Heroku**: Traditional hosting platform
- **DigitalOcean**: VPS hosting

## Troubleshooting

### Common Issues

1. **Gmail Authentication Failed**
   - Ensure 2FA is enabled
   - Use App Password, not regular password
   - Check Gmail username is correct

2. **CORS Errors**
   - Verify FRONTEND_URL in .env matches your frontend URL
   - Check if backend is running on correct port

3. **Rate Limiting**
   - Default: 5 requests per 15 minutes
   - Adjust in .env file if needed

4. **Email Not Sending**
   - Check Gmail credentials
   - Verify network connectivity
   - Check server logs for errors

## Development

### Project Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env               # Environment variables
├── env.example        # Environment template
└── README.md          # This file
```

### Adding New Features
1. Create new routes in `server.js`
2. Add validation using express-validator
3. Update error handling
4. Test thoroughly

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs
3. Verify environment configuration
4. Test with health endpoint first
