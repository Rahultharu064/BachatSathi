# HamroKista - Authentication System

A complete authentication system with login, registration, OTP verification, and password reset functionality.

## Features

### 🔐 Authentication Features
- **User Registration** - Create new accounts with email verification
- **User Login** - Secure login with email/password
- **OTP Verification** - Two-factor authentication via email OTP
- **Password Reset** - Complete forgot password flow with OTP verification
- **Google OAuth** - Social login integration
- **Session Management** - JWT-based authentication with cookies

### 🛡️ Security Features
- **Password Hashing** - Bcrypt encryption for all passwords
- **OTP Security** - Time-limited, hashed OTP codes
- **Rate Limiting** - Protection against brute force attacks
- **Input Validation** - Comprehensive form validation
- **CORS Protection** - Secure cross-origin requests

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **bcryptjs** - Password hashing
- **JWT** - Token-based authentication
- **Nodemailer** - Email service
- **Passport.js** - OAuth authentication

### Frontend
- **React** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Project Structure

```


## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### OTP Management
- `POST /api/auth/sendotp` - Send OTP to email
- `POST /api/auth/verifyotp` - Verify OTP for login
- `POST /api/auth/resendotp` - Resend OTP

### Password Reset
- `POST /api/auth/forgotpassword` - Initiate password reset
- `POST /api/auth/verifyresetotp` - Verify OTP for password reset
- `POST /api/auth/resetpassword` - Set new password

### OAuth
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

## Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  role      Role
  oTP       OTP?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### OTP Model
```prisma
model OTP {
  id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int      @unique
  otp       String
  expiresAt DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Setup Instructions

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the Backend directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/hamrokista"
   JWT_SECRET="your-secret-key"
   FRONTEND_URL="http://localhost:5173"
   
   # Email Configuration (for OTP)
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   Redirect_URL="http://localhost:5000/api/auth/google/callback"
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Test Database Connection**
   ```bash
   node test-db.js
   ```

5. **Start Backend Server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_BACKEND_URL="http://localhost:5000"
   ```

3. **Start Frontend Server**
   ```bash
   npm run dev
   ```

## Usage Examples

### Test User Credentials
After running the database test, you can use these credentials:
- **Email**: test@example.com
- **Password**: password123

### Password Reset Flow
1. Navigate to `/forgot-password`
2. Enter your email address
3. Check your email for OTP
4. Enter the 6-digit OTP
5. Set your new password
6. Login with new credentials

### Login Flow
1. Navigate to `/login`
2. Enter email and password
3. Verify OTP sent to email
4. Access dashboard

## Security Features

### Password Security
- All passwords are hashed using bcrypt with salt rounds of 10
- Minimum password length of 6 characters
- Legacy plaintext passwords are automatically upgraded to bcrypt

### OTP Security
- 6-digit numeric OTP codes
- 10-minute expiration time
- Hashed storage in database
- Rate limiting on OTP requests

### Session Security
- JWT tokens stored in httpOnly cookies
- Secure cookie settings for production
- Automatic token refresh

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Check if user exists in database
   - Verify password format (bcrypt hash vs plaintext)
   - Run `node test-db.js` to create test user

2. **Email not sending**
   - Verify email configuration in `.env`
   - Check SMTP settings
   - Use Gmail App Password for Gmail

3. **Database connection issues**
   - Verify DATABASE_URL in `.env`
   - Ensure MySQL server is running
   - Run `npx prisma db push` to sync schema

4. **CORS errors**
   - Check FRONTEND_URL in backend `.env`
   - Verify frontend is running on correct port

### Debug Mode
In development mode, OTP codes are returned in API responses for testing:
```json
{
  "message": "OTP sent successfully",
  "userId": 1,
  "devOtp": "123456",
  "expiresAt": "2024-01-01T12:00:00.000Z"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
