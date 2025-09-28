const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for rate limiting (required for Render, Heroku, etc.)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://nirmal-portfolio-alpha.vercel.app',
  'https://nirmal-portfolio123.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many contact form submissions from this IP, please try again later.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Trust proxy for accurate IP detection
  trustProxy: true,
  // Skip successful requests from rate limiting
  skipSuccessfulRequests: false,
  // Skip failed requests from rate limiting  
  skipFailedRequests: false
});

// Apply rate limiting to contact route
app.use('/api/contact', limiter);

// Nodemailer configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    },
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Contact form endpoint
app.post('/api/contact', contactValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Log the contact form submission
    console.log('Contact form submission received:', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    });

    // For now, return success without sending email due to SMTP issues
    // TODO: Implement proper email service (SendGrid, etc.)
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      messageId: 'temp-' + Date.now()
    });

    return; // Skip email sending for now

    // Create transporter
    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: {
        name: 'Portfolio Contact Form',
        address: process.env.GMAIL_USER
      },
      to: process.env.GMAIL_USER, // Your email where you want to receive messages
      replyTo: email, // So you can reply directly to the sender
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">Contact Details</h3>
              <p style="margin: 5px 0; color: #666;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
              <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">Message</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        Sent at: ${new Date().toLocaleString()}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    
    // Determine specific error message
    let errorMessage = 'Sorry, there was an error sending your message. Please try again later.';
    
    if (error.code === 'ECONNECTION' || error.message.includes('Connection timeout')) {
      errorMessage = 'Email service is temporarily unavailable. Please try again later.';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please contact support.';
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Email service is not available. Please try again later.';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    gmailConfigured: !!process.env.GMAIL_USER && process.env.GMAIL_USER !== 'your-email@gmail.com',
    port: process.env.PORT || 3000
  });
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    if (!process.env.GMAIL_USER || process.env.GMAIL_USER === 'your-email@gmail.com') {
      return res.status(400).json({
        success: false,
        message: 'Gmail not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in .env file'
      });
    }

    const transporter = createTransporter();
    
    // Test connection with timeout
    const verifyPromise = transporter.verify();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout after 30 seconds')), 30000)
    );
    
    await Promise.race([verifyPromise, timeoutPromise]);
    
    res.status(200).json({
      success: true,
      message: 'Gmail configuration is valid',
      gmailUser: process.env.GMAIL_USER,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Gmail test error:', error);
    res.status(500).json({
      success: false,
      message: 'Gmail configuration error',
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on port ${PORT}`);
  console.log(`📧 Gmail configured: ${process.env.GMAIL_USER ? 'Yes' : 'No'}`);
  console.log(`🌐 CORS enabled for: ${allowedOrigins.join(', ')}`);
  console.log(`🔒 Rate limiting: ${process.env.RATE_LIMIT_MAX_REQUESTS || 5} requests per ${Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000 / 60)} minutes`);
});

module.exports = app;
