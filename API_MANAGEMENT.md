# API Key Management System

## Overview

This project uses an intelligent API key rotation system to efficiently manage YouTube API quota and prevent hitting rate limits.

## Features

### ✅ Automatic Key Rotation

- Round-robin rotation between multiple API keys
- Seamless failover when a key reaches its quota
- No manual intervention required

### ✅ Quota Management

- Tracks usage for each API key
- Daily limit: 10,000 requests per key
- Automatic daily reset at midnight
- Prevents quota exceeded errors

### ✅ Intelligent Fallback

- Automatically skips blocked keys
- Retries with different keys on failure
- Logs usage statistics for monitoring

### ✅ Rate Limiting

- 100ms delay between requests
- Prevents API throttling
- Smooth request distribution

## Setup Instructions

### 1. Create Multiple API Keys

To maximize quota availability, create 3-5 API keys:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a **new project** for each key
3. Enable **YouTube Data API v3** for each project
4. Create **API credentials** for each project
5. Copy each API key

### 2. Configure Environment Variables

Edit your `.env.local` file:

```env
# Primary key (REQUIRED)
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Additional keys for rotation (RECOMMENDED)
NEXT_PUBLIC_YOUTUBE_API_KEY_2=AIzaSyYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
NEXT_PUBLIC_YOUTUBE_API_KEY_3=AIzaSyZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
NEXT_PUBLIC_YOUTUBE_API_KEY_4=AIzaSyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
NEXT_PUBLIC_YOUTUBE_API_KEY_5=AIzaSyBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
```

### 3. Usage in Code

#### Basic Usage

```typescript
import { apiKeyManager, makeAPIRequest } from "@/utils/apiKeyManager";

// Option 1: Direct key retrieval
const apiKey = apiKeyManager.getNextKey();

// Option 2: Automatic request with retry (RECOMMENDED)
const data = await makeAPIRequest(async (apiKey) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&...`
  );
  return response.json();
});
```

#### Example: YouTube Search

```typescript
async function searchYouTube(query: string) {
  return makeAPIRequest(async (apiKey) => {
    const url =
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${apiKey}&part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=10`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  });
}
```

### 4. Monitor Usage

Check API key statistics:

```typescript
import { apiKeyManager } from "@/utils/apiKeyManager";

const stats = apiKeyManager.getStats();
console.table(stats);
// Output:
// ┌─────────┬────────────┬──────┬───────────┬─────────┐
// │ (index) │ keyNumber  │ used │ remaining │ blocked │
// ├─────────┼────────────┼──────┼───────────┼─────────┤
// │    0    │     1      │ 245  │   9755    │  false  │
// │    1    │     2      │ 189  │   9811    │  false  │
// │    2    │     3      │  67  │   9933    │  false  │
// └─────────┴────────────┴──────┴───────────┴─────────┘
```

## Quota Calculations

### Single API Key

- Daily Quota: **10,000 requests**
- Example: 1 key × 10,000 = **10,000 requests/day**

### Multiple API Keys (Recommended)

- 3 keys: **30,000 requests/day**
- 4 keys: **40,000 requests/day**
- 5 keys: **50,000 requests/day**

### Quota Usage Examples

- Song search: ~1-2 requests
- Video details: ~1 request
- Playlist fetch: ~1-5 requests

**Heavy usage app**: With 5 keys, you can handle ~**50,000 operations/day**

## Best Practices

1. **Use 3-5 API Keys**

   - Maximum reliability
   - High quota availability
   - Better distribution

2. **Monitor Usage**

   - Check console logs
   - Review daily stats
   - Watch for blocked keys

3. **Optimize Requests**

   - Batch requests when possible
   - Cache responses
   - Avoid unnecessary calls

4. **Error Handling**
   - Always use `makeAPIRequest()` wrapper
   - Handle null returns gracefully
   - Implement fallback data

## Troubleshooting

### All Keys Blocked

**Issue**: All API keys exceeded quota

**Solutions**:

- Add more API keys
- Implement caching
- Reduce request frequency
- Wait for daily reset (midnight)

### Key Not Rotating

**Issue**: Same key being used repeatedly

**Check**:

- Multiple keys in `.env.local`?
- Keys properly formatted?
- Restart dev server after adding keys

### Quota Still Exceeded

**Issue**: Getting 403 errors even with rotation

**Actions**:

1. Verify keys are from **different projects**
2. Check Google Cloud Console quotas
3. Ensure API is enabled for all projects
4. Review request logs for excessive calls

## System Architecture

```
┌─────────────────┐
│  Application    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐       ┌──────────────┐
│  API Key        │◄──────┤ Environment  │
│  Manager        │       │ Variables    │
└────────┬────────┘       └──────────────┘
         │
    ┌────┴────┐
    │ Rotation│
    │ Logic   │
    └────┬────┘
         │
    ┌────▼─────┬────────┬────────┐
    │  Key 1   │ Key 2  │ Key 3  │
    │ (active) │(ready) │(ready) │
    └──────────┴────────┴────────┘
         │
         ▼
┌─────────────────┐
│  YouTube API    │
└─────────────────┘
```

## Support

If you encounter issues:

1. Check console logs for detailed error messages
2. Verify `.env.local` configuration
3. Review quota in Google Cloud Console
4. Ensure you're using the latest code

---

**Made with ❤️ for efficient API usage**
