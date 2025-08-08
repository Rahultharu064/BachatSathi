import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";
import { generateOTP, verifyOTPMatch } from "../utils/otpUtils.js";
import { sendMail } from "../config/mailer.js";

// Initialize database and create test user if needed
export const initializeDatabase = async () => {
  try {
    console.log('🔍 Initializing database connection...');
    console.log('📊 DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'NOT SET');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Check if users exist
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}`);
    
    if (userCount === 0) {
      console.log('⚠️  No users found. Creating a test user...');
      await createTestUser();
    } else {
      // List existing users
      const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true, role: true }
      });
      console.log('📋 Existing users:');
      users.forEach(user => {
        console.log(`  - ${user.email} (${user.name}, ${user.role})`);
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('🔧 Please check:');
    console.error('   1. MySQL server is running');
    console.error('   2. DATABASE_URL in .env file is correct');
    console.error('   3. Database "hamrokista" exists');
    console.error('   4. Run: npx prisma db push');
    return false;
  }
};

// Create test user function
export const createTestUser = async () => {
  try {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    
    const newUser = await prisma.user.create({
      data: {
        email: testEmail,
        password: hashedPassword,
        name: 'Test User',
        role: 'User'
      }
    });
    
    console.log(`✅ Test user created: ${newUser.email} (ID: ${newUser.id})`);
    console.log(`🔑 Test credentials: ${testEmail} / ${testPassword}`);
    return newUser;
  } catch (error) {
    console.error('❌ Failed to create test user:', error.message);
    throw error;
  }
};

// Verify user credentials function
export const verifyUserCredentials = async (email, password) => {
  try {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    
    if (!normalizedEmail || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Handle accounts without password (Google sign-in only)
    if (!user.password || typeof user.password !== 'string') {
      return { success: false, message: 'This account uses Google sign-in. Please sign in with Google.' };
    }

    let passwordOk = false;
    if (user.password.startsWith('$2')) {
      // Normal path: stored password is a bcrypt hash
      passwordOk = await bcrypt.compare(password, user.password);
    } else {
      // Legacy path: stored password is plaintext; validate and upgrade to bcrypt
      if (user.password === password) {
        const newHash = await bcrypt.hash(password, 10);
        try {
          await prisma.user.update({ where: { id: user.id }, data: { password: newHash } });
        } catch (e) {
          console.warn('Password rehash update failed for user', user.id, e?.message || e);
        }
        passwordOk = true;
      } else {
        passwordOk = false;
      }
    }

    if (!passwordOk) {
      return { success: false, message: 'Invalid password' };
    }

    return { 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return { success: false, message: 'Internal server error' };
  }
};

// Get user by email function
export const getUserByEmail = async (email) => {
  try {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    return await prisma.user.findUnique({ where: { email: normalizedEmail } });
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
};

// Create user function
export const createUser = async (userData) => {
  try {
    const { name, email, password, role = 'User' } = userData;
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).trim();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        password: hashedPassword,
        role: role
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    return { success: true, user };
  } catch (error) {
    console.error('Error creating user:', error);
    if (error?.code === 'P2002') {
      return { success: false, message: 'User already exists' };
    }
    return { success: false, message: 'Failed to create user' };
  }
};

// controller of User Register 
export const Userregister = async (req, res) => {
  const { name, email, password } = req.body;
  let { role } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Normalize role
    const normalizedRole = String(role || 'user').trim().toLowerCase();
    const roleMap = { user: 'User', vendor: 'Vendor', admin: 'Admin' };
    const prismaRole = roleMap[normalizedRole] || 'User';

    // Use the centralized user creation function
    const result = await createUser({ name, email, password, role: prismaRole });
    
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    const createdUser = result.user;
    const token = signToken({ id: createdUser.id, role: createdUser.role });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 48 * 60 * 60 * 1000,
    });

    res.status(201).json({ user: createdUser });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// controller of login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('🔐 Login attempt:', { email: email ? 'provided' : 'missing', password: password ? 'provided' : 'missing' });
    
    // Use the centralized credential verification function
    const result = await verifyUserCredentials(email, password);
    
    if (!result.success) {
      console.log('❌ Login failed:', result.message);
      return res.status(401).json({ message: "invalid credentials" });
    }
    
    const user = result.user;
    console.log('✅ Login successful for user:', user.email);

    // Generate and persist OTP automatically on successful login
    const { otp, hashedOtp, expiresAt } = generateOTP();

    await prisma.oTP.upsert({
      where: { userId: user.id },
      update: { otp: hashedOtp, expiresAt },
      create: { userId: user.id, otp: hashedOtp, expiresAt },
    });

    // Try to send email, but don't fail login if email transport fails
    try {
      await sendMail({
        to: user.email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It will expire at ${expiresAt.toLocaleString()}.`,
        html: `<p>Your OTP code is <strong>${otp}</strong>.</p><p>It will expire at <strong>${expiresAt.toLocaleString()}</strong>.</p>`,
      });
    } catch (mailErr) {
      console.warn('sendMail failed during loginUser:', mailErr?.message || mailErr);
    }

    const responseBody = { message: "login success. otp sent.", userId: user.id };
    if (process.env.NODE_ENV !== 'production') {
      responseBody.devOtp = otp;
      responseBody.expiresAt = expiresAt;
    }
    return res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// controller of send otp
export const sendOtp = async (req, res) => {
    const { email, userId } = req.body;
    try {
        let user;
        if (userId) {
          const id = parseInt(userId);
          if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid userId' });
          user = await prisma.user.findUnique({ where: { id } });
        } else if (email) {
          user = await getUserByEmail(email);
        } else {
          return res.status(400).json({ message: 'email or userId is required' });
        }

        if (!user) {
          return res.status(404).json({ message: 'User not found. Please register first or check your email address.' });
        }

        const { otp, hashedOtp, expiresAt } = generateOTP();

        await prisma.oTP.upsert({
          where: { userId: user.id },
          update: { otp: hashedOtp, expiresAt },
          create: { userId: user.id, otp: hashedOtp, expiresAt },
        });

        try {
          await sendMail({
            to: user.email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire at ${expiresAt.toLocaleString()}.`,
            html: `<p>Your OTP code is <strong>${otp}</strong>.</p><p>It will expire at <strong>${expiresAt.toLocaleString()}</strong>.</p>`,
          });
        } catch (mailErr) {
          console.warn('sendMail failed during sendOtp:', mailErr?.message || mailErr);
        }

        const responseBody = { message: 'otp sent successfully', userId: user.id };
        if (process.env.NODE_ENV !== 'production') {
          responseBody.devOtp = otp;
          responseBody.expiresAt = expiresAt;
        }
        res.status(200).json(responseBody);
    }
    catch(error){
         res.status(500).json({ message: 'Error sending OTP', error: error?.message || String(error) });
    }
};

// controller of forget password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    // 1. Check if the user exists
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Generate OTP and expiry
    const { otp, hashedOtp, expiresAt } = generateOTP();

    // 3. Save or update the OTP in DB
    await prisma.oTP.upsert({
      where: { userId: user.id },
      update: { otp: hashedOtp, expiresAt },
      create: { userId: user.id, otp: hashedOtp, expiresAt },
    });

    // 4. Send OTP via email
    try {
      await sendMail({
        to: normalizedEmail,
        subject: "Reset Your Password - OTP Code",
        text: `Your OTP for password reset is ${otp}. It expires at ${expiresAt.toLocaleString()}.`,
        html: `<p>Your OTP for password reset is <strong>${otp}</strong>.</p><p>This code will expire at <strong>${expiresAt.toLocaleString()}</strong>.</p>`,
      });
    } catch (mailErr) {
      console.warn('sendMail failed during forgotPassword:', mailErr?.message || mailErr);
    }

    const responseBody = { message: "OTP sent for password reset", userId: user.id };
    if (process.env.NODE_ENV !== 'production') {
      responseBody.devOtp = otp;
      responseBody.expiresAt = expiresAt;
    }

    res.status(200).json(responseBody);

  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Verify OTP for password reset
export const verifyResetOtp = async (req, res) => {
  const { otp, userId } = req.body;

  try {
    if (!otp || !userId) {
      return res.status(400).json({ message: "OTP and userId are required" });
    }

    const resolvedUserId = parseInt(userId);
    if (Number.isNaN(resolvedUserId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Find the OTP record
    const otpRecord = await prisma.oTP.findUnique({
      where: { userId: resolvedUserId },
    });

    if (!otpRecord) {
      return res.status(401).json({ message: "OTP not found. Please request a new OTP." });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      await prisma.oTP.delete({ where: { userId: resolvedUserId } });
      return res.status(401).json({ message: "OTP has expired. Please request a new OTP." });
    }

    // Verify OTP
    const isValid = await verifyOTPMatch(otp, otpRecord.otp);
    if (!isValid) {
      return res.status(401).json({ message: "Incorrect OTP. Please try again." });
    }

    // Don't delete OTP yet - keep it for password reset step
    res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    console.error("Error verifying reset OTP:", error);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};

// Reset password after OTP verification
export const resetPassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    if (!userId || !newPassword) {
      return res.status(400).json({ message: "userId and newPassword are required" });
    }

    if (String(newPassword).length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const resolvedUserId = parseInt(userId);
    if (Number.isNaN(resolvedUserId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: resolvedUserId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP exists and is valid (not expired)
    const otpRecord = await prisma.oTP.findUnique({
      where: { userId: resolvedUserId },
    });

    if (!otpRecord) {
      return res.status(401).json({ message: "No valid OTP found. Please request a new OTP." });
    }

    if (otpRecord.expiresAt < new Date()) {
      await prisma.oTP.delete({ where: { userId: resolvedUserId } });
      return res.status(401).json({ message: "OTP has expired. Please request a new OTP." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await prisma.user.update({
      where: { id: resolvedUserId },
      data: { password: hashedPassword }
    });

    // Delete the used OTP
    await prisma.oTP.delete({ where: { userId: resolvedUserId } });

    res.status(200).json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

// controller of otp verification
export const verifyOtp = async (req, res) => {
  const { otp, userId, email } = req.body;

  try {
    // Validate input
    if (!otp || (!userId && !email)) {
      return res.status(400).json({ message: "OTP and userId or email are required" });
    }

    let resolvedUserId = userId ? parseInt(userId) : null;
    if (!resolvedUserId && email) {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      resolvedUserId = user.id;
    }

    if (Number.isNaN(resolvedUserId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Find the OTP record
    const otpRecord = await prisma.oTP.findUnique({
      where: { userId: resolvedUserId },
    });

    if (!otpRecord) {
      return res.status(401).json({ message: "OTP not found. Please request a new OTP." });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      await prisma.oTP.delete({ where: { userId: resolvedUserId } });
      return res.status(401).json({ message: "OTP has expired. Please request a new OTP." });
    }

    // Verify OTP
    const isValid = await verifyOTPMatch(otp, otpRecord.otp);
    if (!isValid) {
      return res.status(401).json({ message: "Incorrect OTP. Please try again." });
    }

    // Find the user
    const user = await prisma.user.findUnique({ 
      where: { id: resolvedUserId },
      select: { id: true, name: true, email: true, role: true }
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the used OTP
    await prisma.oTP.delete({ where: { userId: resolvedUserId } });

    // Generate JWT token
    const token = signToken({ id: user.id, role: user.role });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ 
      message: "OTP verified successfully. Logged in.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};

// controller of resend otp 
export const resendOtp = async (req, res) => {
  const { email, userId } = req.body;

  try {
    let user;
    if (userId) {
      const id = parseInt(userId);
      if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid userId' });
      user = await prisma.user.findUnique({ where: { id } });
    } else if (email) {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    } else {
      return res.status(400).json({ message: 'email or userId is required' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Check existing OTP record
    const existingOtp = await prisma.oTP.findUnique({ where: { userId: user.id } });

    // 3. If OTP exists, enforce cooldown (60 seconds)
    if (existingOtp) {
      // Use createdAt if available, otherwise use current time
      const lastSentTime = existingOtp.createdAt || existingOtp.updatedAt || new Date();
      const now = new Date();
      const secondsSinceLastOtp = (now - lastSentTime) / 1000;

      if (secondsSinceLastOtp < 60) {
        return res.status(429).json({
          message: `Please wait ${Math.ceil(60 - secondsSinceLastOtp)} seconds before resending OTP.`,
        });
      }
    }

    // 4. Generate new OTP
    const { otp, hashedOtp, expiresAt } = generateOTP();

    // 5. Save or update OTP
    await prisma.oTP.upsert({
      where: { userId: user.id },
      update: { otp: hashedOtp, expiresAt },
      create: { userId: user.id, otp: hashedOtp, expiresAt },
    });

    try {
      // 6. Send OTP email
      await sendMail({
        to: user.email,
        subject: 'Your OTP Code (Resent)',
        text: `Your new OTP code is ${otp}. It will expire at ${expiresAt.toLocaleString()}.`,
        html: `<p>Your new OTP code is <strong>${otp}</strong>.</p><p>It will expire at <strong>${expiresAt.toLocaleString()}</strong>.</p>`,
      });
    } catch (mailErr) {
      console.warn('sendMail failed during resendOtp:', mailErr?.message || mailErr);
    }

    const responseBody = { message: 'OTP resent successfully', userId: user.id };
    if (process.env.NODE_ENV !== 'production') {
      responseBody.devOtp = otp;
      responseBody.expiresAt = expiresAt;
    }

    res.status(200).json(responseBody);

  } catch (error) {
    console.error('Error in resendOtp:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// controller of login with google
export const loginwithGoogle = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }

    const token = signToken({ id: req.user.id, role: req.user.role });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Role-based redirect for Google login
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    console.log('🔐 Google login successful, user role:', req.user.role);
    
    if (req.user.role === 'Vendor') {
      console.log('🏪 Redirecting Vendor to homepage');
      res.redirect(`${frontendUrl}/`);
    } else {
      console.log('👤 Redirecting User to dashboard');
      res.redirect(`${frontendUrl}/User-dashboard`);
    }

  } catch (error) {
    console.error("Error logging in with Google:", error);
    res.status(500).json({ message: 'Error logging in with Google', error: error.message });
  }
};
// controller of logout User
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// Test endpoint for debugging OTP issues
export const testOtp = async (req, res) => {
  try {
    // Test OTP generation
    const { otp, hashedOtp, expiresAt } = generateOTP();
    const isValid = await verifyOTPMatch(otp, hashedOtp);
    
    // Test database connection
    const userCount = await prisma.user.count();
    const otpCount = await prisma.oTP.count();
    
    res.status(200).json({
      message: "OTP test successful",
      otp,
      hashedOtp: hashedOtp.substring(0, 20) + "...", // Don't expose full hash
      expiresAt,
      isValid,
      currentTime: new Date(),
      databaseStatus: {
        userCount,
        otpCount,
        connected: true
      }
    });
  } catch (error) {
    console.error("Error in testOtp:", error);
    res.status(500).json({ 
      message: "Error testing OTP", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true },
    });

    res.status(200).json({ message: `Welcome ${user.role}`, user });
  } catch (error) {
    res.status(500).json({ message: 'Error loading dashboard', error });
  }
};























