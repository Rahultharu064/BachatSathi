import rateLimit, { ipKeyGenerator } from 'express-rate-limit'; // ✅ Import ipKeyGenerator

const whitelist = new Set([
  '::1',       // localhost IPv6
  '127.0.0.1', // localhost IPv4
]);

const blockedIPs = new Set();

export const ipWhitelistMiddleware = (req, res, next) => {
  if (whitelist.has(req.ip)) return next();

  if (blockedIPs.has(req.ip)) {
    return res.status(403).json({ message: 'Your IP is blocked due to multiple failed login attempts.' });
  }

  next();
};

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { message: 'Too many failed login attempts. Your IP has been temporarily blocked.' },
  keyGenerator: ipKeyGenerator, // ip key generator use gare poxi safe hunxa 
  skipSuccessfulRequests: true,
  handler: (req, res, next, options) => {
    const ip = ipKeyGenerator(req); //  Use normalized IP here too
    blockedIPs.add(ip);
    res.status(options.statusCode).json(options.message);
  },
});

export const unblockIP = (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ message: 'IP required to unblock' });

  if (blockedIPs.has(ip)) {
    blockedIPs.delete(ip);
    return res.json({ message: `IP ${ip} unblocked.` });
  }
  res.status(404).json({ message: `IP ${ip} is not blocked.` });
};
