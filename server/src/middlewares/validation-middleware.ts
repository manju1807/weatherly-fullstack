// src/middlewares/validation-middleware.ts

import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";
import { sendError } from "../utils/response-helper";

/**
 * Middleware for validating request data using a Zod schema.
 * This middleware checks if the request body, query, or params conform to the expected structure.
 *
 * @param schema - The Zod schema to validate the request data against.
 * @param location - The part of the request to validate (default is 'body').
 *    Can be 'body', 'query', or 'params'.
 */
export const validate =
	(schema: ZodSchema, location: "body" | "query" | "params" = "body") =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			// Validate the request data against the provided Zod schema
			schema.parse(req[location]);
			next(); // Proceed to the next middleware/controller if validation is successful
		} catch (error) {
			if (error instanceof ZodError) {
				// If validation fails, format the errors and send a response
				const formattedErrors = error.errors.map((err) => ({
					path: err.path.join("."), // The path of the invalid field
					message: err.message, // Error message
				}));
				return sendError(res, "Validation error", 400, formattedErrors); // Send a structured error response
			}
			next(error); // Pass any other errors to the next error handler
		}
	};
