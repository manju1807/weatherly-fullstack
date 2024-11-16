// src/utils/cache.ts

// Cache class for storing and managing in-memory cache with TTL (Time to Live)
export class Cache {
	// A Map to hold the cache data (key-value pairs) with a timestamp
	private cache: Map<string, { value: any; timestamp: number }>;

	// TTL (Time to Live) in milliseconds; default is 30 minutes (1800000 ms)
	private ttl: number;

	// Constructor to initialize the cache with an optional TTL
	constructor(ttl: number = 1800000) {
		// Default TTL is 30 minutes
		this.cache = new Map();
		this.ttl = ttl;
	}

	// Method to get an item from the cache by key
	get<T>(key: string): T | null {
		const item = this.cache.get(key); // Retrieve the item from the cache

		// If the item doesn't exist, return null
		if (!item) return null;

		// If the item has expired (TTL exceeded), delete it and return null
		if (Date.now() - item.timestamp > this.ttl) {
			this.cache.delete(key); // Remove expired item from cache
			return null;
		}

		// Return the cached value (typed as T)
		return item.value as T;
	}

	// Method to set an item in the cache with a specified key and value
	set(key: string, value: any): void {
		// Add the item to the cache with the current timestamp
		this.cache.set(key, {
			value,
			timestamp: Date.now(),
		});
	}

	// Method to clear all items from the cache
	clear(): void {
		this.cache.clear(); // Empty the cache
	}
}
