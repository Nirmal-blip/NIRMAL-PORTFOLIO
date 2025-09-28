# Environment Setup Guide

This document explains how to configure environment variables for the frontend application.

## Environment Files

### `.env`
Main environment file for development. Contains the default configuration.

### `.env.local`
Local development overrides. This file is ignored by git and can be used for personal development settings.

### `.env.example`
Template file showing all available environment variables. Copy this to `.env` and update the values.

## Environment Variables

| Variable | Description | Default Value | Required |
|----------|-------------|---------------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000` | Yes |
| `VITE_APP_NAME` | Application name | `Portfolio` | No |
| `VITE_APP_VERSION` | Application version | `1.0.0` | No |

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Update the values in `.env`:**
   ```bash
   # For local development
   VITE_API_BASE_URL=http://localhost:5000
   
   # For production
   VITE_API_BASE_URL=https://your-backend-domain.com
   ```

3. **For local development overrides, create `.env.local`:**
   ```bash
   VITE_API_BASE_URL=http://localhost:5000
   VITE_APP_NAME=Portfolio (Local)
   ```

## Backend Configuration

Make sure your backend is running on the URL specified in `VITE_API_BASE_URL`. The backend should be accessible at:

- Health check: `{VITE_API_BASE_URL}/api/health`
- Contact form: `{VITE_API_BASE_URL}/api/contact`
- Test email: `{VITE_API_BASE_URL}/api/test-email`

## Production Deployment

For production deployment:

1. Set `VITE_API_BASE_URL` to your production backend URL
2. Ensure the backend is properly configured with CORS for your frontend domain
3. Update the backend's `FRONTEND_URL` environment variable to match your frontend domain

## Troubleshooting

- **CORS errors**: Make sure the backend's `FRONTEND_URL` matches your frontend domain
- **API not found**: Verify `VITE_API_BASE_URL` is correct and the backend is running
- **Environment variables not loading**: Restart the development server after changing `.env` files
