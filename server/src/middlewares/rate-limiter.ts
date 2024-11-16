// src/middlewares/rate-limiter.ts
import rateLimit from "express-rate-limit";

/**
 * Rate Limiter middleware to limit the number of requests from a single IP address.
 * This helps prevent abuse and protects the API from being overwhelmed by too many requests.
 */
export const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
	max: 100, // Limit each IP to a maximum of 100 requests per 15 minutes
	message: "Too many requests, please try again later.", // Message to send when the limit is exceeded
});
