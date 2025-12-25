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
    console.log('🔄 Initializing API Keys...');
    console.log('Available Env Vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));

    const keyVars = [
      'VITE_YOUTUBE_API_KEY',
      'VITE_YOUTUBE_API_KEY_2',
      'VITE_YOUTUBE_API_KEY_3',
      'VITE_YOUTUBE_API_KEY_4',
      'VITE_YOUTUBE_API_KEY_5',
      'VITE_YOUTUBE_API_KEY_6',
      'VITE_YOUTUBE_API_KEY_7',
      'VITE_YOUTUBE_API_KEY_8',
      'VITE_YOUTUBE_API_KEY_9',
      'VITE_YOUTUBE_API_KEY_10',
    ];

    let allKeys: string[] = [];
    const primaryKey = import.meta.env.VITE_YOUTUBE_API_KEY || import.meta.env.VITE_YOUTUBE_API_KEYS;

    if (primaryKey) {
        console.log(`ℹ️ Raw VITE_YOUTUBE_API_KEY length: ${primaryKey.length}`);
        
        // Split by comma, space, or newline
        if (primaryKey.match(/[\s,]/)) {
            console.log('✅ Detected multiple keys (separator-based) in primary variable');
            // Remove quotes if present and split
            const cleanKey = primaryKey.replace(/['"]/g, ''); 
            allKeys = cleanKey.split(/[\s,]+/).map((k: string) => k.trim()).filter((k: string) => k.length > 0);
        } else {
            console.log('ℹ️ Single key detected in primary variable, checking others...');
            allKeys.push(primaryKey);
            
            // Should verify other numbered keys if the first one wasn't a combined string
            const otherKeys = keyVars.slice(1)
              .map(varName => import.meta.env[varName])
              .filter(Boolean) as string[];
            allKeys = [...allKeys, ...otherKeys];
        }
    } else {
        console.warn('❌ Primary VITE_YOUTUBE_API_KEY is missing or empty');
        console.warn('Current VITE_YOUTUBE_API_KEY value:', primaryKey);
        
        // Try fallback to numbered keys only (rare case)
         allKeys = keyVars
            .map(varName => import.meta.env[varName])
            .filter(Boolean) as string[];
    }

    // Filter out obviously short/invalid keys (AIza keys are usually ~39 chars)
    allKeys = allKeys.filter(k => k.length > 20);

    if (allKeys.length === 0) {
      console.error('❌ FATAL: No valid API keys found. App cannot fetch data.');
      return;
    }

    this.keys = allKeys.map((key) => ({
      key,
      requestCount: 0,
      dailyLimit: this.DAILY_QUOTA,
      lastReset: new Date(),
      isBlocked: false,
    }));

    console.log(`✅ Initialized ${this.keys.length} valid API key(s) for rotation`);
    console.log(`🔑 Keys loaded: ${this.keys.map((k, i) => `#${i+1}: ...${k.key.slice(-4)}`).join(', ')}`);
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
