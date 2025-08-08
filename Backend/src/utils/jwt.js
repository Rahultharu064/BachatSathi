import jwt from 'jsonwebtoken';

const resolveSecret = () => {
  const secret = process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'dev_secret' : undefined);
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return secret;
};

export const signToken = (payload) => {
  const secret = resolveSecret();
  return jwt.sign(payload, secret, { expiresIn: '3days' });
};

export const verifyToken = (token) => {
  const secret = resolveSecret();
  return jwt.verify(token, secret);
};



