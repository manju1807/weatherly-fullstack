// src/middlewares/async-handlers.ts
import { Request, Response, NextFunction } from "express";

/**
 * Async handler middleware for catching unhandled promise rejections in async route handlers.
 * It ensures that if an async function throws an error, it gets passed to the next error handling middleware.
 *
 * @param fn - The async function (route handler) that is being wrapped by this middleware.
 *
 * @returns A function that takes in req, res, and next, and ensures that errors from the async function
 * are caught and passed to the next middleware (typically an error handler).
 */
export const asyncHandler =
	<P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
		fn: (
			req: Request<P, ResBody, ReqBody, ReqQuery>, // Request parameters type
			res: Response, // Response object
			next: NextFunction, // Next function to pass control to the next middleware
		) => Promise<any>, // The async function (route handler) returning a promise
	) =>
	(
		req: Request<P, ResBody, ReqBody, ReqQuery>,
		res: Response,
		next: NextFunction,
	): void => {
		// Wrap the async function and catch any errors, passing them to the next middleware
		Promise.resolve(fn(req, res, next)).catch(next);
	};
