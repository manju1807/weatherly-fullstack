// types/common.ts

// Generic interface for API responses
export interface ApiResponse<T> {
	success: boolean; // Indicates if the request was successful (true) or not (false)
	data?: T; // Optional data field that holds the response data, type is generic (T)
	error?: string; // Optional error message if the request fails
	statusCode?: number; // Optional HTTP status code (e.g., 200, 404, 500)
	details?: any; // Optional additional details about the error or response
	message?: string; // Optional message providing more context, especially for success responses
}
