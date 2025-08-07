import bcrypt from "bcryptjs";

// Generate a 6-digit OTP and hash it
export const generateOTP = () => {
  const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = bcrypt.hashSync(rawOtp, 10); // secure
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 minutes
  return { otp: rawOtp, hashedOtp, expiresAt };
};

// Verify OTP input against hashed OTP from DB
export const verifyOTPMatch = async (inputOtp, hashedOtp) => {
  return await bcrypt.compare(inputOtp, hashedOtp);
};
