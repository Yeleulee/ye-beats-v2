/**
 * API Key Manager with Rotation and Quota Management
 * 
 * Features:
 * - Multiple API key rotation
 * - Automatic fallback on quota exceeded
 * - Request counting and rate limiting
 * - Efficient key usage tracking
 */

interface APIKeyConfig {
  key: string;
  requestCount: number;
  dailyLimit: number;
  lastReset: Date;
  isBlocked: boolean;
}

class APIKeyManager {
  private keys: APIKeyConfig[] = [];
  private currentKeyIndex: number = 0;
  private readonly DAILY_QUOTA = 10000; // Default daily quota per key
  private readonly REQUEST_DELAY = 100; // ms between requests

  constructor() {
    this.initializeKeys();
    this.setupDailyReset();
  }

  /**
   * Initialize API keys from environment variables
   * Supports multiple keys: YOUTUBE_API_KEY, YOUTUBE_API_KEY_2, YOUTUBE_API_KEY_3, etc.
   */
  private initializeKeys(): void {
    const envKeys = [
      import.meta.env.VITE_YOUTUBE_API_KEY,
      import.meta.env.VITE_YOUTUBE_API_KEY_2,
      import.meta.env.VITE_YOUTUBE_API_KEY_3,
      import.meta.env.VITE_YOUTUBE_API_KEY_4,
      import.meta.env.VITE_YOUTUBE_API_KEY_5,
    ].filter(Boolean) as string[];

    if (envKeys.length === 0) {
      console.warn('⚠️ No API keys found. Please add at least one key to .env.local');
      return;
    }

    this.keys = envKeys.map((key) => ({
      key,
      requestCount: 0,
      dailyLimit: this.DAILY_QUOTA,
      lastReset: new Date(),
      isBlocked: false,
    }));

    console.log(`✅ Initialized ${this.keys.length} API key(s) for rotation`);
  }

  /**
   * Setup automatic daily reset at midnight
   */
  private setupDailyReset(): void {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilReset = tomorrow.getTime() - now.getTime();

    setTimeout(() => {
      this.resetAllKeys();
      // Setup recurring daily reset
      setInterval(() => this.resetAllKeys(), 24 * 60 * 60 * 1000);
    }, timeUntilReset);
  }

  /**
   * Reset all keys' usage counters
   */
  private resetAllKeys(): void {
    this.keys.forEach((keyConfig) => {
      keyConfig.requestCount = 0;
      keyConfig.isBlocked = false;
      keyConfig.lastReset = new Date();
    });
    console.log('🔄 All API keys reset for new day');
  }

  /**
   * Get the next available API key
   * Implements round-robin rotation with quota checking
   */
  public getNextKey(): string | null {
    if (this.keys.length === 0) {
      console.error('❌ No API keys available');
      return null;
    }

    // Try each key in rotation
    for (let i = 0; i < this.keys.length; i++) {
      const keyConfig = this.keys[this.currentKeyIndex];

      // Check if key is available
      if (!keyConfig.isBlocked && keyConfig.requestCount < keyConfig.dailyLimit) {
        keyConfig.requestCount++;
        
        const remainingQuota = keyConfig.dailyLimit - keyConfig.requestCount;
        const keyNumber = this.currentKeyIndex + 1;

        console.log(
          `🔑 Using API Key #${keyNumber} | ` +
          `Requests: ${keyConfig.requestCount}/${keyConfig.dailyLimit} | ` +
          `Remaining: ${remainingQuota}`
        );

        // Rotate to next key for next request
        this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
        
        return keyConfig.key;
      }

      // Try next key
      this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
    }

    console.error('❌ All API keys have exceeded their quota');
    return null;
  }

  /**
   * Mark a key as blocked (quota exceeded)
   */
  public markKeyAsBlocked(apiKey: string): void {
    const keyConfig = this.keys.find((k) => k.key === apiKey);
    if (keyConfig) {
      keyConfig.isBlocked = true;
      console.warn(`⚠️ API Key blocked due to quota exceeded`);
    }
  }

  /**
   * Get statistics for all keys
   */
  public getStats(): { keyNumber: number; used: number; remaining: number; blocked: boolean }[] {
    return this.keys.map((keyConfig, index) => ({
      keyNumber: index + 1,
      used: keyConfig.requestCount,
      remaining: keyConfig.dailyLimit - keyConfig.requestCount,
      blocked: keyConfig.isBlocked,
    }));
  }

  /**
   * Delay between requests to avoid rate limiting
   */
  public async delayRequest(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.REQUEST_DELAY));
  }

  /**
   * Check if any keys are available
   */
  public hasAvailableKeys(): boolean {
    return this.keys.some((key) => !key.isBlocked && key.requestCount < key.dailyLimit);
  }
}

// Export singleton instance
export const apiKeyManager = new APIKeyManager();

/**
 * Helper function to make API requests with automatic key rotation
 */
export async function makeAPIRequest<T>(
  requestFn: (apiKey: string) => Promise<T>,
  retries = 3
): Promise<T | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const apiKey = apiKeyManager.getNextKey();
    
    if (!apiKey) {
      console.error('No API keys available');
      return null;
    }

    try {
      // Add delay between requests
      await apiKeyManager.delayRequest();
      
      // Make the request
      const result = await requestFn(apiKey);
      return result;
    } catch (error: any) {
      // Check if quota exceeded
      if (error?.response?.status === 403 || error?.message?.includes('quota')) {
        console.warn(`Quota exceeded for current key, rotating...`);
        apiKeyManager.markKeyAsBlocked(apiKey);
        continue; // Try next key
      }
      
      // Other errors
      console.error(`API request failed:`, error);
      if (attempt === retries - 1) {
        throw error;
      }
    }
  }

  return null;
}
