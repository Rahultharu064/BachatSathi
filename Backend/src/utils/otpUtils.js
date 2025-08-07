export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  return { otp, expiresAt };
};

export const verifyOTPMatch = (otp, savedOtp) => {
  return otp === savedOtp;
};


    

   

    

